import React, {Component} from "react";
import PropTypes from "prop-types";
import "./index.css";
import ReactLoading from "react-loading";
import firebase from "../../services/firebase";
import images from "../../ProjectImages";
import LoginStrings from "../Login/LoginStrings";

class Profile extends Component {
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
  componentDidMount() {
    if (!localStorage.getItem(LoginStrings.ID)) {
      this.props.history.push("/");
    }
  }
  onChangeNickname = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onChangeAboutMe = (e) => {
    this.setState({
      aboutMe: e.target.value,
    });
  };
  onChangeAvatar = (e) => {
    if (e.target.files && e.target.files[0]) {
      const prefixFiletype = e.target.files[0].type.toString();
      if (prefixFiletype.indexOf(LoginStrings.PREFIX_IMAGE) != 0) {
        this.props.showToast(0, "This file is not an image");
        return;
      }
      this.newPhoto = e.target.files[0];
      this.setState({photoUrl: URL.createObjectURL(e.target.files[0])});
    } else {
      this.props.showToast(0, "Something wrong with input file");
    }
  };
  uploadAvatar = () => {
    this.setState({isLoading: false});
    if (this.newPhoto) {
      const uploadTask = firebase.storage().ref().child(this.state.id).put(this.newPhoto);
      uploadTask.on(
        LoginStrings.UPLOAD_CHANGED,
        null,
        (err) => {
          this.props.showToast(0, err.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.updateUserInfo(true, downloadURL);
          });
        }
      );
    } else {
      this.updateUserInfo(false, null);
    }
  };
  updateUserInfo = (isUpdatedPhotoURL, downloadURL) => {
    let newinfo;
    if (isUpdatedPhotoURL) {
      newinfo = {
        name: this.state.name,
        description: this.state.aboutMe,
        URL: downloadURL,
      };
    } else {
      newinfo = {
        name: this.state.name,
        description: this.state.aboutMe,
      };
    }
    firebase
      .firestore()
      .collection("users")
      .doc(this.state.documentKey)
      .update(newinfo)
      .then(() => {
        localStorage.setItem(LoginStrings.Name, this.state.name);
        localStorage.setItem(LoginStrings.Description, this.state.aboutMe);
        if (isUpdatedPhotoURL) {
          localStorage.setItem(LoginStrings.PhotoURL, downloadURL);
        }
        this.setState({isLoading: false});
        this.props.showToast(1, "Update info success");
      });
  };
  render() {
    return (
      <div className="profileroot">
        <div className="headerprofile">
          <span>PROFILE</span>
        </div>
        <img className="avatar" src={this.state.photoUrl} alt="" />
        <div className="viewWrapInputFile">
          <img
            className="imageInputFile"
            alt="icon gallery"
            src={images.chooseFile}
            onClick={() => {
              this.refInput.click();
            }}
          />
          <input
            ref={(el) => (this.refInput = el)}
            accept="image/*"
            className="viewInputFile"
            type="file"
            onChange={this.onChangeAvatar}
          />
        </div>
        <span className="textLabel">Name</span>
        <input
          className="textInput"
          value={this.state.name ? this.state.name : ""}
          placeholder="Your nickname"
          onChange={this.onChangeNickname}
        />
        <span className="textLabel">About Me</span>
        <input
          className="textInput"
          value={this.state.aboutMe ? this.state.aboutMe : ""}
          placeholder="Tell about yourself"
          onChange={this.onChangeAboutMe}
        />
        <div>
          <button className="btnUpdate" onClick={this.uploadAvatar}>
            SAVE
          </button>
          <button
            className="btnback"
            onClick={() => {
              this.props.history.push("/chat");
            }}
          >
            BACK
          </button>
        </div>
        {this.state.isLoading ? (
          <div>
            <ReactLoading type={"spin"} color={"#203152"} height={"3%"} width={"3%"} />
          </div>
        ) : null}
      </div>
    );
  }
}

Profile.propTypes = {
  showToast: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Profile;
