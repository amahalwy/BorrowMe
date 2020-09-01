// src/components/main/main_page.js

import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { useDispatch, useSelector } from 'react-redux';

class MainPage extends React.Component {
  render() {
    return (
      <div className="splash-page">
        <Link to="/home" className="looking-for">
          <div>
            <h2>What are you looking for?</h2>
            <p className="splash-ptag">
              We have the best renters ready to connect with you to enjoy their
              stuff
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
              Rent out your unused items, make some extra cash while you're not
              using them
            </p>
            <Link className="splash-start-renting-button">
              Click here to start renting!
            </Link>
          </div>
        </Link>
      </div>
    );
  }
}

export default MainPage;
