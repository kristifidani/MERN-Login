import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";
import Register from "./Components/register";
import Login from "./Components/login";
import AppNavbar from "./Components/nav";
import AfterLogin from "./Components/profile";
import Post from "./Components/singlePost";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorsL: [],
      errorsR: []
    };

    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleUserSubmit(user) {
    axios
      .post("/register", user)
      .then(res => {
        this.setState({ errorsR: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleLoginSubmit(userLog) {
    axios
      .post("/login", userLog)
      .then(res => this.setState({ errorsL: res.data }))
      .catch(err => {
        console.error(err);
      });
  }

  handleLogout() {
    axios.get("/logout").catch(err => {
      console.error(err);
    });
  }

  render() {
    console.log(this.state.errorsR);
    console.log(this.state.errorsL);
    const err = this.state.errorsL.map(error => {
      if (!error.user) {
        return (
          <div key={error.param}>
            <Route
              exact
              path="/profile"
              render={() => <AfterLogin errors={this.state.errorsL} />}
            />
            <Route path="/profile/:post_id" component={Post} />
          </div>
        );
      } else {
        return null;
      }
    });
    return (
      <BrowserRouter>
        <div className="App">
          <AppNavbar onLogout={this.handleLogout} errors={this.state.errorsL} />
          {err}

          <Route
            exact
            path="/login"
            render={() => (
              <Login
                errors={this.state.errorsL}
                onLoginSubmit={this.handleLoginSubmit}
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={() => (
              <Register
                errors={this.state.errorsR}
                onUserSubmit={this.handleUserSubmit}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
