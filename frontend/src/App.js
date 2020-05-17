import React, {Component} from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Chat from "./containers/Chat";
import Profile from "./containers/Profile";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  showToast = (type, message) => {
    switch (type) {
      case 0:
        toast.warning(message);
        break;
      case 1:
        toast.success(message);
        break;
      default:
        break;
    }
  };

  render() {
    const props = this.props;
    return (
      <Router>
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          position={toast.POSITION.TOP_CENTER}
        />

        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/login"
            render={(props) => <Login showToast={this.showToast} {...props} />}
          />
          <Route
            exact
            path="/profile"
            render={(props) => <Profile showToast={this.showToast} {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup showToast={this.showToast} {...props} />}
          />
          <Route
            exact
            path="/chat"
            render={(props) => <Chat showToast={this.showToast} {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
