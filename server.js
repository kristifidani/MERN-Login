const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const passport = require("passport");
const session = require("express-session");

const config = require("./config/database");

//Init app and routes
const app = express();

//DB
mongoose.connect(config.database);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
//Check connection
db.once("open", () => {
  console.log("Connected to MongoDB");
});
//Check for DB errors
db.on("error", err => {
  console.log(err);
});

//BodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Express Session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

//Express validator middleware
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

//Setting CORS
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  //and remove cacheing so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//Passport config
require("./config/passport")(passport);
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("*", function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//Route files
let users = require("./routes/users");
app.use("/", users);

//Server init
const port = 5000;
app.listen(port, () => console.log("You are at port " + port));
