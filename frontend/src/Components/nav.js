import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

class AppNavbar extends Component {
  onClick() {
    this.props.onLogout();
  }

  render() {
    const err = this.props.errors.map(error => {
      if (error.user) {
        return (
          <ul key={error.param}>
            <li className="auth" onClick={this.onClick.bind(this)}>
              <a href="/login">Logout</a>
            </li>
            <li>
              <a>Welcome {error.user.name}</a>
            </li>
          </ul>
        );
      } else {
        return null;
      }
    });
    return (
      <div>
        <ul>
          <li>
            <Link to="/login">Home</Link>
          </li>
          {err}
        </ul>
      </div>
    );
  }
}

export default AppNavbar;

/* tek if siper 
 else {
        return (
          <ul  key={error.param}>
            <li className="auth">
              <a href="/register">Register</a>
            </li>
            <li className="auth">
              <a href="/login">Login</a>
            </li>
          </ul>
        );
      }
 */
