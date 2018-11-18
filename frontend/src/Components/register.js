import React, { Component } from "react";
import "../App.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", username: "", password: "", password2: "" };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePassword2Change = this.handlePassword2Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handlePassword2Change(e) {
    this.setState({ password2: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name;
    let username = this.state.username;
    let password = this.state.password;
    let password2 = this.state.password2;
    /*if (!name || !username || !password || !password2) {
      return(alert("Fill all requirements"));
    }*/
    this.props.onUserSubmit({
      name: name,
      username: username,
      password: password,
      password2: password2
    });
    this.setState({ name: "", username: "", password: "", password2: "" });
  }

  render() {
    const err = this.props.errors.map(error => {
      return (
        <div key={error.param} className="errors">
          <p>{error.msg}</p>
        </div>
      );
    });
    return (
      <div>
        {err}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              className="input"
              type="text"
              placeholder="Your name..."
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
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
          <div>
            <input
              className="input"
              type="password"
              placeholder="Confirm password..."
              value={this.state.password2}
              onChange={this.handlePassword2Change}
            />
          </div>
          <input type="submit" value="Register" className="input" />
        </form>
        <p className="login">
          Click <a href="/login">here</a> to login.
        </p>
      </div>
    );
  }
}

export default Register;
