import React, { Component } from "react";
import axios from "axios";

class Post extends Component {
  state = {
    post: null
  };
  componentDidMount() {
    let id = this.props.match.params.post_id;
    axios.get("https://jsonplaceholder.typicode.com/posts/" + id).then(res =>
      this.setState({
        post: res.data
      })
    );
  }
  render() {
    console.log(this.state.post);
    const posts = this.state.post ? (
      <div>
        <h4>{this.state.post.title}</h4>
        <p>{this.state.post.body}</p>
      </div>
    ) : (
      <div>Loading post...</div>
    );

    return (
      <div>
        <h4>{posts}</h4>
      </div>
    );
  }
}

export default Post;
