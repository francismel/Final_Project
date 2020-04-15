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
import PieChart from "./components/PieChart/PieChart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      showFirstDonut: false,
      firstDonutHighlights: ["awesome place", "great service", "this sucked"],
      secondDonutHighlights: ["terrible place", "bad service", "was awesome"],
      showSecondDonut: false,
      test: 1,
    };
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  showPie = () => {
    this.setState({ showFirstDonut: true, showSecondDonut: true });
  };

  hidePie = () => {
    this.setState({ showFirstDonut: false, showSecondDonut: false });
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

                <div className="flexMe centerMe">
                  <PieChart
                    title="Chart 1"
                    data={[20, 50, 50]}
                    shouldShow={this.state.showFirstDonut}
                    highlights={this.state.firstDonutHighlights}
                  />

                  <PieChart
                    title="Chart 2"
                    data={[30, 10, 50]}
                    shouldShow={this.state.showSecondDonut}
                    highlights={this.state.secondDonutHighlights}
                  />
                </div>
                <br></br>
                <button onClick={this.showPie} type="button">
                  Compare!
                </button>
                <button onClick={this.hidePie} type="button">
                  Close
                </button>
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
