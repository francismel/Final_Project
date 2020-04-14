import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./pages/SignUpPage/SignUpForm";
import userService from "./utils/userService";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";

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
        <Switch>
          <Route
            exact
            path="/login"
            render={() => (
              <div>
                <NavBar
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
                <LoginPage handleSignupOrLogin={this.handleSignupOrLogin} />
              </div>
            )}
          />

          <Route
            exact
            path="/home"
            render={() => (
              <div>
                <NavBar
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
                <HomePage />
              </div>
            )}
          />

          <Route
            exact
            path="/signup"
            render={(props) => (
              <div>
                <NavBar
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
                <SignUpForm handleSignupOrLogin={this.handleSignupOrLogin} />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
