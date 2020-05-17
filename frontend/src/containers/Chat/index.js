import React, {Component} from "react";
import PropTypes from "prop-types";
import LoginStrings from "../Login/LoginStrings";
import firebase from "../../services/firebase";
import "./index.css";
//import {ReactLoading} from "react-loading";
import {ReactSVG} from "react-svg";
import Link from "@material-ui/core/Link";
import nopic from "../../images/nopic.svg";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isOpenDialogConfirmLogout: false,
      currentPeerUser: null,
      displayedContactSwitchedNotification: [],
      displayedContacts: [],
    };
    this.currentUsername = localStorage.getItem(LoginStrings.Name);
    this.currentUserId = localStorage.getItem(LoginStrings.ID);
    this.currentUserPhoto = localStorage.getItem(LoginStrings.PhotoURL);
    this.currentUserDocumentId = localStorage.getItem(LoginStrings.FirebasedocumentId);

    this.currentUserMessages = [];
    this.notificationErase = [];
    this.searchUsers = [];
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.currentUserDocumentId)
      .get()
      .then(doc => {
        doc.data().messages.map(item => {
          this.currentUserMessages = [
            ...this.currentUserMessages,
            {
              notificationId: item.notificationId,
              number: item.number,
            },
          ];
        });
        this.setState({
          displayedContactSwitchedNotification: this.currentUserMessages,
        });
      });
    this.getListUser();
  }
  getListUser = async () => {
    const result = await firebase.firestore().collection("users").get();
    if (result.docs.length > 0) {
      let listUsers = [...result.docs];
      listUsers.forEach((item, index) => {
        this.searchUsers = [
          ...this.searchUsers,
          {
            key: index,
            documentKey: item.id,
            id: item.data().id,
            name: item.data().name,
            messages: item.data().messages,
            url: item.data().url,
            description: item.data().description,
          },
        ];
      });
      this.setState({
        isLoading: false,
      });
    }
    this.renderLisUser();
  };
  getClassNameForUserandNotification = itemId => {
    let number = 0;
    let className = "";
    let check = false;
    if (this.state.currentPeerUser && this.state.currentPeerUser.id === itemId) {
      className = "viewWrapItemFocused";
    } else {
      this.state.displayedContactSwitchedNotification.forEach(item => {
        if (item.notificationId.length > 0) {
          if (item.notificationId === itemId) {
            check = true;
            number = item.number;
          }
        }
      });
      className = check ? "viewWrapItemNotification" : "viewWrapItem";
    }
    return className;
  };
  notificationErase = itemId => {
    this.state.displayedContactSwitchedNotification.forEach(el => {
      if (el.notificationId > 0) {
        if (el.notificationId != itemId) {
          this.notificationErase = [
            ...this.notificationErase,
            {
              notificationId: el.notificationId,
              number: el.number,
            },
          ];
        }
      }
    });
    this.updaterenderList();
  };
  updaterenderList = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(this.currentUserDocumentId)
      .update({messages: this.notificationErase});
    this.setState({
      displayedContactSwitchedNotification: this.notificationErase,
    });
  };
  renderLisUser = () => {
    if (this.searchUsers.length > 0) {
      let viewListUser = [];
      let classname = "";
      this.searchUsers.map(item => {
        if (item.id != this.currentUserId) {
          classname = this.getClassNameForUserandNotification(item.id);
          viewListUser.push(
            <button
              key={item.key}
              id={item.key}
              className={classname}
              onClick={() => {
                this.notificationErase(item.id);
                this.setState({currentPeerUser: item});
                document.getElementById(item.key).style.backgroundColor = "#fff";
                document.getElementById(item.key).style.color = "#fff";
              }}
            >
              {item.url != "" ? (
                <img
                  src={item.url}
                  alt=""
                  className="viewAvatarItem"
                  onClick={this.onProfileClick}
                />
              ) : (
                <ReactSVG
                  src={nopic}
                  beforeInjection={svg => {
                    svg.setAttribute("style", "width: 40px; height: 40px;");
                  }}
                  wrapper="span"
                  className="default-image-wrapper"
                />
              )}
              <div className="viewWrapContentItem">
                <span className="textItem">{item.name}</span>
              </div>
              {classname === "viewWrapItemNotification" ? (
                <div className="notificationparagraph">
                  <p id={item.id} className="newMessages">
                    New messages
                  </p>
                </div>
              ) : null}
            </button>
          );
        }
      });
      this.setState({
        displayedContacts: viewListUser,
      });
    } else {
      this.props.showToast(0, "No user is present");
    }
  };
  logout = () => {
    firebase.auth().signOut();
    this.props.history.push("/");
    localStorage.clear();
  };
  onProfileClick = () => {
    this.props.history.push("/profile");
  };
  handleSearch = e => {
    let searchQuery = e.target.value.toLowerCase();
    let displayedContacts = this.searchUsers.filter(el => {
      let searchValue = el.name.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    this.displayedContacts = displayedContacts;
    this.displaySearchedContacts();
  };
  displaySearchedContacts = () => {
    if (this.displayedContacts.length > 0) {
      let viewListUser = [];
      let classname = "";
      this.displayedContacts.map(item => {
        if (item.id != this.currentUserId) {
          classname = this.getClassNameForUserandNotification(item.id);
          viewListUser.push(
            <button
              key={item.key}
              id={item.key}
              className={classname}
              onClick={() => {
                this.notificationErase(item.id);
                this.setState({currentPeerUser: item});
                document.getElementById(item.key).style.backgroundColor = "#fff";
                document.getElementById(item.key).style.color = "#fff";
              }}
            >
              {item.url != "" ? (
                <img
                  src={item.url}
                  alt=""
                  className="viewAvatarItem"
                  onClick={this.onProfileClick}
                />
              ) : (
                <ReactSVG
                  src={nopic}
                  beforeInjection={svg => {
                    svg.setAttribute("style", "width: 40px; height: 40px;");
                  }}
                  wrapper="span"
                  className="default-image-wrapper"
                />
              )}
              <div className="viewWrapContentItem">
                <span className="textItem">{item.name}</span>
              </div>
              {classname === "viewWrapItemNotification" ? (
                <div className="notificationparagraph">
                  <p id={item.id} className="newMessages">
                    New messages
                  </p>
                </div>
              ) : null}
            </button>
          );
        }
      });
      this.setState({
        displayedContacts: viewListUser,
      });
    } else {
      this.props.showToast(0, "No user is present");
    }
  };
  render() {
    return (
      <div className="root">
        <div className="body">
          <div className="viewListUser">
            <div className="profileviewleftside">
              <Link href="/profile">
                {this.currentUserPhoto != "" ? (
                  <img
                    src={this.currentUserPhoto}
                    alt=""
                    className="ProfilePicture"
                    onClick={this.onProfileClick}
                  />
                ) : (
                  <ReactSVG
                    src={nopic}
                    beforeInjection={svg => {
                      svg.setAttribute("style", "width: 40px; height: 40px;");
                    }}
                    wrapper="span"
                    className="default-image-wrapper"
                  />
                )}
              </Link>
              <button className="Logout" onClick={this.logout}>
                Logout
              </button>
            </div>
            <div className="rootsearchbar">
              <div className="input-container">
                <i className="fa fa-search icon"></i>
                <input
                  className="input-field"
                  type="text"
                  onChange={this.handleSearch}
                  placeholder="Search"
                />
              </div>
            </div>
            {this.state.displayedContacts}
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  history: PropTypes.object,
  showToast: PropTypes.func,
};

export default Chat;
