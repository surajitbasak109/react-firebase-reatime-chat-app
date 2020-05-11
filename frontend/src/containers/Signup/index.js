import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import "./index.css";
import {Card, Button} from "react-bootstrap";
import firebase from "../../services/firebase";

import CSSBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import LoginStrings from "../Login/LoginStrings";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    email: "",
    password: "",
    name: "",
    error: "",
  };

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email.length) {
      this.setState((state) => {
        return {error: "Email field cannot be empty"};
      });
      return false;
    }
    if (!this.state.password.length) {
      this.setState((state) => {
        return {error: "Password field cannot be empty"};
      });
      return false;
    }
    if (!this.state.name.length) {
      this.setState((state) => {
        return {error: "Name field cannot be empty"};
      });
      return false;
    }
    const {email, password, name} = this.state;
    const signunpData = {email, password, name};
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
          firebase
            .firestore()
            .collection("users")
            .add({
              name,
              id: result.user.uid,
              email,
              password,
              description: "",
              url: "",
              messages: [{notificationId: "", number: 0}],
              created_at: Date.now(),
            })
            .then((docRef) => {
              localStorage.setItem(LoginStrings.ID, result.user.uid);
              localStorage.setItem(LoginStrings.Name, name);
              localStorage.setItem(LoginStrings.Email, email);
              localStorage.setItem(LoginStrings.Password, password);
              localStorage.setItem(LoginStrings.PhotoURL, "");
              localStorage.setItem(LoginStrings.UPLOAD_CHANGED, "state_changed");
              localStorage.setItem(LoginStrings.Description, "");
              localStorage.setItem(LoginStrings.FirebasedocumentId, docRef.id);

              this.setState({
                name: "",
                password: "",
                email: "",
              });

              this.props.history.push("/chat");
            })
            .catch((err) => {
              this.setState({error: "Error in signing up, please try again"});
            });
        });
    } catch (e) {
      this.setState({error: "Error in signing up, please try again"});
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    const Signinsee = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "white",
      backgroundColor: "#1ebea5",
      width: "100%",
      boxShadow: "0 5px 5px #888888",
      height: "11rem",
      paddingTop: "48px",
      // opacity: "0.5",
      borderBottom: "5px solid green",
    };
    return (
      <Fragment>
        <CSSBaseline />
        <Card style={Signinsee}>
          <div>
            <Typography component="h1" variant="h5">
              Sign Up To
            </Typography>
          </div>
          <div>
            <Link to="/">
              <Button variant="success">
                <i className="fa fa-home"></i> WebChat
              </Button>
            </Link>
          </div>
        </Card>
        <Card className="formacontroloutsite">
          <form noValidate onSubmit={this.handleSubmit} className="customform">
            <div>
              <TextField
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email address: example@gmail.com"
                name="email"
                autoComplete="current-email"
                autoFocus
                required
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <p style={{color: `grey`, fontSize: `15px`, marginLeft: `0`}}>
              Password: length Greater than 6(alhabet, number, special character)
            </p>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="Your Password"
              name="password"
              autoComplete="current-password"
              autoFocus
              required
              onChange={this.handleChange}
              value={this.state.password}
            />

            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoComplete="current-name"
              autoFocus
              required
              onChange={this.handleChange}
              value={this.state.name}
            />
            <p
              style={{
                color: "grey",
                fontSize: "15px",
              }}
            >
              Please fill all fields and password should be greater than 6
            </p>
            <div className="error">
              <p id="1" style={{color: "red"}}>
                {this.state.error}
              </p>
            </div>
            <div className="CenterAlignItems">
              <Button variant="primary" className="button1" type="submit">
                <span>Sign Up</span>
              </Button>
            </div>
            <div>
              <p style={{color: "grey"}}>Already have an account?</p>
              <Link to="/">Login</Link>
            </div>
            <div className="copyright">
              <Typography variant="body2" color="textSecondary" align="center">
                Copyright &copy;
                <a href="/">Techcet Blog</a> {new Date().getFullYear()}
              </Typography>
            </div>
          </form>
        </Card>
      </Fragment>
    );
  }
}

export default Signup;
