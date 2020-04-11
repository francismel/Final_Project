import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./components/SignUpForm";
import userService from "./utils/userService";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./pages/LoginPage/LoginPage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
    };
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  render() {
    return (
      <div className="App">
        <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        <LoginPage handleSignupOrLogin={this.handleSignupOrLogin} />
        <SignUpForm handleSignupOrLogin={this.handleSignupOrLogin} />
      </div>
    );
  }
}

export default App;
