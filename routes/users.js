const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
let User = require("../models/user");

//Routes to test login success
router.get("/fail", (req, res) => {
  res.json([{ param: "fail", msg: "User not found !" }]);
});
router.get("/success", (req, res) => {
  res.json([
    { user: req.user, param: "success", msg: "You are now logged in !" }
  ]);
});

//register
router.post("/register", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("username", "Username is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  req
    .checkBody("password2", "Passwords do not match")
    .equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.json(errors);
  } else {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) {
        console.log(err);
      } else if (user) {
        res.json([{ param: "error", msg: "User exists !" }]);
      } else {
        let newUser = new User({
          name: name,
          username: username,
          password: password
        });

        //Pjesa e passwordit qe e inkripton
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) {
              console.log(err);
            }
            newUser.password = hash;
            newUser.save(function(err) {
              if (err) {
                console.log(err);
                return;
              } else {
                res.json([
                  { param: "success", msg: "User successfully added!" }
                ]);
              }
            });
          });
        });
      }
    });
  }
});

//Login
router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/fail"
  })
);

//Logout
router.get("/logout", function(req, res) {
  req.logout();
});

module.exports = router;
