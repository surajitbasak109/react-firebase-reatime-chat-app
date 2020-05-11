import React, {Component} from "react";
import {Link} from "react-router-dom";
import firebase from "../../services/firebase";
import LoginStrings from "./LoginStrings";
import "./index.css";

import {Card} from "react-bootstrap";

import {makeStyles} from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: "",
      email: "",
      password: "",
      rememeber: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem(LoginStrings.ID)) {
      this.setState({isLoading: false}, () => {
        this.setState({isLoading: false});
        this.props.showToast(1, "Login success");
        this.props.history.push("./chat");
      });
    } else {
      this.setState({isLoading: false});
    }
  }
  handleChange = (e) => {
    this.setState({...this.state, [e.target.name]: e.target.value});
  };
  handleChecked = (e) => {
    this.setState({...this.state, [e.target.name]: e.target.checked});
  };
  async handleSubmit(e) {
    const {email, password} = this.state;
    e.preventDefault();
    this.setState({error: ""});
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        let user = result.user;
        if (user) {
          await firebase
            .firestore()
            .collection("users")
            .where("id", "==", user.uid)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                const currentdata = doc.data();
                localStorage.setItem(LoginStrings.FirebasedocumentId, doc.id);
                localStorage.setItem(LoginStrings.ID, currentdata.id);
                localStorage.setItem(LoginStrings.Name, currentdata.name);
                localStorage.setItem(LoginStrings.Email, currentdata.email);
                localStorage.setItem(LoginStrings.Password, currentdata.password);
                localStorage.setItem(LoginStrings.PhotoURL, currentdata.url);
                localStorage.setItem(LoginStrings.Description, currentdata.description);
              });
            });
          this.props.history.push("/chat");
        }
      })
      .catch((err) => {
        this.setState({error: "Error while signing in, please try again."});
        console.log(err);
      });
  }
  render() {
    const paper = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: "10px",
      paddingRight: "10px",
    };
    const rightComponent = {
      boxShadow: "0 8px 80px #808888",
      backgroundColor: "smokegrey",
    };
    const root = {
      height: "100vh",
      background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
      marginBottom: "50px",
    };
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
    const form = {
      width: "100%",
      marginTop: "50px",
    };
    return (
      <Grid container component="main" style={root}>
        <CssBaseline />
        <Grid item xs={1} sm={4} md={7} className="image">
          <div className="image1"></div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          style={rightComponent}
          elevation={6}
          square="true"
        >
          <Card style={Signinsee}>
            <div>
              <Avatar className="avatar">
                <LockOutlinedIcon width="50px" heigh="50px" />
              </Avatar>
            </div>
            <div>
              <Typography component="h1" variant="h5">
                Sign in To
              </Typography>
            </div>
            <div>
              <Link to="/">
                <button className="btn">
                  <i className="fa fa-home"></i>
                  WebChat
                </button>
              </Link>
            </div>
          </Card>
          <div style={paper}>
            <form style={form} noValidate onSubmit={this.handleSubmit}>
              <TextField
                type="text"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="current-email"
                autoFocus
                required
                onChange={this.handleChange}
                value={this.state.email}
              />

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
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    onChange={this.handleChecked}
                    checked={this.state.rememeberMe}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Typography component="h6" variant="h5">
                {this.state.error ? (
                  <p className="text-danger">{this.state.error}</p>
                ) : null}
              </Typography>

              <div className="CenterAliningItems">
                <button type="submit" className="button1">
                  <span>Login</span>
                </button>
              </div>

              <div className="CenterAliningItems">
                <p>Don't have an account?</p>
                <Link to="/signun" variant="body2">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
