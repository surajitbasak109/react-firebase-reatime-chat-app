import React, {Component} from "react";
import LoginStrings from "../Login/LoginStrings";
import firebase from "../../services/firebase";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.currentUsername = localStorage.getItem(LoginStrings.Name);
  }
  componentDidMount() {}
  logout = () => {
    firebase.auth().signOut();
    this.props.history.push("/");
    localStorage.clear();
  };
  render() {
    return (
      <div>
        {this.currentUsername}
        <button className="btn btn-danger" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}

export default Chat;
