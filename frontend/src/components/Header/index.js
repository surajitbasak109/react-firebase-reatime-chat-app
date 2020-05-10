import React, {Fragment} from "react";
import "./index.css";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <header className="header-login-signup">
        <div className="header-limiter">
          <h1>
            <a href="/">TechcetBlog</a>
          </h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/">About App</Link>
            <Link to="/">Contact Us</Link>
          </nav>

          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
