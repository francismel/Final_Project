import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./pages/SignUpPage/SignUpForm";
import userService from "./utils/userService";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import PieChart from "./components/PieChart/PieChart";

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
            render={() =>
              this.state.user ? (
                <Redirect to="/home"></Redirect>
              ) : (
                <div>
                  <NavBar
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                  />
                  <LoginPage handleSignupOrLogin={this.handleSignupOrLogin} />
                </div>
              )
            }
          />

          <Route
            exact
            path="/home"
            render={() =>
              this.state.user ? (
                <div>
                  <NavBar
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                  />
                  <HomePage />
                </div>
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route exact path="/" render={() => <Redirect to="/home" />} />

          <Route
            exact
            path="/signup"
            render={(props) =>
              this.state.user ? (
                <Redirect to="/home"></Redirect>
              ) : (
                <div>
                  <NavBar
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                  />
                  <SignUpForm handleSignupOrLogin={this.handleSignupOrLogin} />
                </div>
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
