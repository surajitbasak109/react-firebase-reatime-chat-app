import React, {Component, Fragment} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./index.css";
import Images from "../../ProjectImages";
import {Link} from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="splash-container">
          <div className="splash">
            <h1 className="splash-head">Web Chat App</h1>
            <p className="splash-subhead">Let's talk with our loved ones</p>
            <div className="custom-button-wrapper">
              <Link to="/login" className="my-super-cool-btn">
                <div className="dots-container">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <span className="buttoncooltext">Get Started</span>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
