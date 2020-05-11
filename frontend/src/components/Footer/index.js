import React from "react";
import "./index.css";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer 1-box is-center">
          <h2 variant="body2" color="textSecondary" alignment="center">
            Copyright &copy; Techcet Blog {new Date().getFullYear()}
          </h2>
        </div>
      </footer>
    );
  }
}

export default Footer;
