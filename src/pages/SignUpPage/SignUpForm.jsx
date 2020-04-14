import React, { Component } from "react";
import userService from "../../utils/userService";

class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  myChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userService.signup(this.state);
      this.props.handleSignupOrLogin();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.myChangeHandler}
          type="text"
          name="name"
          placeholder="name"
        ></input>
        <input
          onChange={this.myChangeHandler}
          type="email"
          name="email"
          placeholder="email"
        ></input>
        <input
          onChange={this.myChangeHandler}
          type="password"
          name="password"
          placeholder="password"
        ></input>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default SignUpForm;
