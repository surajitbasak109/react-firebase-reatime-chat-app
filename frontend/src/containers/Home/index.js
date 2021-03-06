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
        <div className="content-wrapper">
          <div className="content">
            <h2 className="content-head is-center">Features of Web Chat Application</h2>
            <div className="Appfeatures">
              <div className="contenthead">
                <h3 className="content-subhead">
                  <i className="fa fa-rocket"></i>
                  Get Started Quickly
                </h3>
                <p>
                  Just register yourself with this app and start chatting with your loved
                  ones
                </p>
              </div>
              <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                <h3 className="content-subhead">
                  <i className="fa fa-sign-in"></i>
                  Firebase Authentication
                </h3>
                <p>Firebase Authentication has been implemented in this app</p>
              </div>
              <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                <h3 className="content-subhead">
                  <i className="fa fa-th-large"></i>
                  Media
                </h3>
                <p>You can share images with your friends for better experience</p>
              </div>
              <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                <h3 className="content-subhead">
                  <i className="fa fa-refresh"></i>
                  Updates
                </h3>
                <p>
                  We will working with new features for this app for better experience in
                  future
                </p>
              </div>
            </div>

            <div className="AppfeaturesFounder">
              <div className="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
                <img
                  src={Images.surajit}
                  alt="File Icons"
                  className="pure-img-responsive"
                  width="300"
                />
              </div>
              <div className="pure-u-1 pure-u-1-2 pure-u-lg-3-5">
                <h2 className="content-head content-head-ribbon">Surajit Basak</h2>
                <p style={{color: "white"}}>The Founder of Techcet Blog.</p>
                <p style={{color: "white"}}>
                  Currently working at Techcet Blog and busy to explore new ideas with new
                  technologies being developed.
                </p>
              </div>
            </div>
            <div className="content">
              <h2 className="content-head is-center">Who We Are</h2>
              <div className="Appfeatures">
                <div className="l-box-lrg pure-u-1 pure-md-1-2 pure-lg-2-5">
                  <form className="pure-form pure-form-stacked">
                    <fieldset>
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        autoComplete="current-name"
                      />

                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        autoComplete="current-email"
                      />

                      <label htmlFor="password">Your Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Your Password"
                        autoComplete="current-password"
                      />
                      <button type="submit" className="pure-button">
                        Sign Up
                      </button>
                    </fieldset>
                  </form>
                </div>
                <div className="l-box-lrg pure-1 pure-u-1 pure-u-md-3-5">
                  <h4>Contact Us</h4>
                  <p>
                    For any question or suggestion you can directly contact us on our
                    Facebook page:
                  </p>
                  <a
                    href="https://web.facebook.com/surajitbasak109"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    https://web.facebook.com/surajitbasak109
                  </a>
                  <p>
                    Twitter:{" "}
                    <a
                      href="https://twitter.com/SurajitBasak109"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      https://twitter.com/SurajitBasak109
                    </a>
                  </p>
                  <p>
                    Instagram:{" "}
                    <a href="https://www.instagram.com/surajit4490">
                      https://www.instagram.com/surajit4490
                    </a>
                  </p>

                  <h4>More Information</h4>
                  <p>To whom it may concern</p>
                  <p>
                    This App is developed for learning purpose - Developed by - Surajit
                    Basak
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default Home;
