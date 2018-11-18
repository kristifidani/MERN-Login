import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

class AfterLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    console.log(this.state.posts);
    const loggedUser = this.props.errors.map(userlog => {
      return (
        <div key={userlog.param} className="errors">
          <p>{userlog.msg}</p>
        </div>
      );
    });

    const posts = this.state.posts ? (
      this.state.posts.map(post => {
        return (
          <div key={post.id}>
            <Link to={"/profile/" + post.id}>
              <span>{post.title}</span>
            </Link>
          </div>
        );
      })
    ) : (
      <div>Loading...</div>
    );

    return (
      <div>
        {loggedUser}
        {posts}
      </div>
    );
  }
}

export default AfterLogin;
