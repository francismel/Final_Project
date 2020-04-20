import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./pages/SignUpPage/SignUpForm";
import userService from "./utils/userService";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import EditForm from "./components/EditName/EditName";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      newName: "",
    };
  }

  changeName = async (newName) => {
    this.setState({
      newName: newName,
    });
  };

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
                    name={this.state.name}
                    newName={this.state.newName}
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
                    newName={this.state.newName}
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
                    newName={this.state.newName}
                    handleLogout={this.handleLogout}
                  />
                  <SignUpForm handleSignupOrLogin={this.handleSignupOrLogin} />
                </div>
              )
            }
          />

          <Route
            exact
            path="/edit"
            render={(props) => (
              <div>
                <NavBar
                  user={this.state.user}
                  newName={this.state.newName}
                  handleLogout={this.handleLogout}
                />
                <EditForm
                  user={this.state.user}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                  changeName={this.changeName}
                />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
