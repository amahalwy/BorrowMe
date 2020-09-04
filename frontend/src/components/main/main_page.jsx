// src/components/main/main_page.js

import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { useDispatch, useSelector } from 'react-redux';

class MainPage extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="splash-page">
          <Link to="/home" className="looking-for">
            <div>
              <h2>What are you looking for?</h2>
              <p className="splash-ptag">
                We have the best renters ready to connect with you to enjoy
                their stuff
              </p>
              <Link className="splash-start-looking-button">
                Click here to start looking!
              </Link>
            </div>
          </Link>

          <Link to="/home" className="rent-out">
            <div>
              <h2>What do you want to rent out?</h2>
              <p className="splash-ptag">
                Rent out your unused items, make some extra cash while you're
                not using them
              </p>
              <Link className="splash-start-renting-button">
                Click here to start renting!
              </Link>
            </div>
          </Link>
        </div>
        <div className="git-roles">
          <h3 className="main-git-role-ahmed">Project Lead / Backend</h3>
          <h3 className="main-git-role-ayce">Backend</h3>
          <h3 className="main-git-role-nate">Frontend</h3>
          <h3 className="main-git-role-sean">Frontend</h3>
        </div>
        <div className="main-meet-the-devs-bar">
          <h4>Connect on GitHub</h4>
        </div>
        <div className="main-footer">
          <a
            className="main-git-links"
            href="https://github.com/amahalwy/BorrowMe"
          >
            <div className="main-git-links-container">
              <img
                className="main-git-logo"
                src="https://www.iconsdb.com/icons/preview/white/github-9-xxl.png"
                alt="github-logo"
              />
              <h3>Project Repo</h3>
            </div>
          </a>
          <a
            className="main-git-links ahmed-git-link"
            href="https://github.com/amahalwy"
          >
            <div className="main-git-links-container">
              <img
                className="main-git-logo"
                src="https://www.iconsdb.com/icons/preview/white/github-9-xxl.png"
                alt="github-logo"
              />
              <h3>Ahmed El Mahallawy</h3>
            </div>
          </a>
          <a
            className="main-git-links ayce-git-link"
            href="https://github.com/aycelacap"
          >
            <div className="main-git-links-container">
              <img
                className="main-git-logo"
                src="https://www.iconsdb.com/icons/preview/white/github-9-xxl.png"
                alt="github-logo"
              />
              <h3>Ayce Lacap</h3>
            </div>
          </a>
          <a
            className="main-git-links nate-git-link"
            href="https://github.com/n8gallagher"
          >
            <div className="main-git-links-container">
              <img
                className="main-git-logo"
                src="https://www.iconsdb.com/icons/preview/white/github-9-xxl.png"
                alt="github-logo"
              />
              <h3>Nate Gallagher</h3>
            </div>
          </a>
          <a
            className="main-git-links sean-git-link"
            href="https://github.com/seanscott23"
          >
            <div className="main-git-links-container">
              <img
                className="main-git-logo"
                src="https://www.iconsdb.com/icons/preview/white/github-9-xxl.png"
                alt="github-logo"
              />
              <h3>Sean Scott</h3>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default MainPage;
