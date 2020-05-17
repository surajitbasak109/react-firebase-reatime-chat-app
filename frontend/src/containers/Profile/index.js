import React, {Component} from "react";
import "./index.css";
import ReactLoading from "react-loading";
import firebase from "../../services/firebase";
import images from "../../ProjectImages";
import LoginStrings from "../Login/LoginStrings";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      documentKey: localStorage.getItem(LoginStrings.FirebasedocumentId),
      id: localStorage.getItem(LoginStrings.ID),
      name: localStorage.getItem(LoginStrings.Name),
      aboutMe: localStorage.getItem(LoginStrings.Description),
      photoUrl: localStorage.getItem(LoginStrings.PhotoURL),
    };
    this.newPhoto = null;
    this.newPhotoUrl = "";
  }
  render() {
    return (
      <div className="profileroot">
        <div className="headerprofile">
          <span>PROFILE</span>
        </div>
      </div>
    );
  }
}

export default Profile;
