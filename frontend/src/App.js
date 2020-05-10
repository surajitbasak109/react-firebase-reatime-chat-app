import React, {Component} from "react";
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Chat from "./containers/Chat";
import Profile from "./containers/Profile";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import firebase from "./services/firebase";
import {toast, ToastContainer} from "react-toastify";

class App extends Component {
  showToast = (type, message) => {
    switch (type) {
      case 0:
        toast.warning(message);
        break;
      case 1:
        toast.success(message);
      default:
        break;
    }
  };

  state = {
    authenticated: false,
    loading: true,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    const props = this.props;
    return this.state.loading ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      <Router>
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          position={toast.POSITION.TOP_RIGHT}
        />

        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/login"
            render={(props) => <Login showToast={this.showToast} />}
            {...props}
          />
          <Route
            exact
            path="/profile"
            render={(props) => <Profile showToast={this.showToast} />}
            {...props}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup showToast={this.showToast} />}
            {...props}
          />
          <Route
            exact
            path="/chat"
            render={(props) => <Chat showToast={this.showToast} />}
            {...props}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
