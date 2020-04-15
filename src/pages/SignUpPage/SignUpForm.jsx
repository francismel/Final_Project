import React, { Component } from "react";
import userService from "../../utils/userService";

class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  handleChange = (event) => {
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
      <div className="LoginPage">
        <div className="verticalLine">hey</div>
        <header className="bigBlue">Sign Up</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="buttonBlue">Submit</button>
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </form>
      </div>

      // <form onSubmit={this.handleSubmit}>
      //   Name:
      //   <input onChange={this.myChangeHandler} type="text" name="name"></input>
      //   <br></br>
      //   Email:
      //   <input
      //     onChange={this.myChangeHandler}
      //     type="email"
      //     name="email"
      //   ></input>
      //   <br></br>
      //   Password:
      //   <input
      //     onChange={this.myChangeHandler}
      //     type="password"
      //     name="password"
      //   ></input>
      //   <br></br>
      //   <button className="buttonBlue" type="submit">
      //     Submit
      //   </button>
      // </form>
    );
  }
}

export default SignUpForm;
