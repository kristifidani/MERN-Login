import React, { Component } from "react";
import { Redirect } from "react-router";
import "../App.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let username = this.state.username;
    let password = this.state.password;

    this.props.onLoginSubmit({ username: username, password: password });
    this.setState({ username: "", password: "" });
  }
  render() {
    const err = this.props.errors.map(error => {
      if (!error.user) {
        return (
          <div key={error.param} className="errors">
            <p>{error.msg}</p>
          </div>
        );
      } else {
        return (
          <div key={error.param}>
            <Redirect to="/profile" />
          </div>
        );
      }
    });
    return (
      <div>
        {err}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              className="input"
              type="text"
              placeholder="Your username..."
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="password"
              placeholder="Your password..."
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button type="submit" className="input">
            Login
          </button>
        </form>
        <p className="login">
          Click <a href="/register">here</a> to register.
        </p>
      </div>
    );
  }
}

export default Login;
