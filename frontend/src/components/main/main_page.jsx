// src/components/main/main_page.js

import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { useDispatch, useSelector } from 'react-redux';

class MainPage extends React.Component {
  render() {
    return (
      <div className="splash-page">
        <div className="looking-for">
            <h2>What are you looking for?</h2>
            <p>We have the best renters ready to connect with you to enjoy their stuff</p>
            <Link className="splash-start-looking-button">Start Looking</Link>
        </div>

        <div className="rent-out">
            <h2>What do you want to rent out?</h2>
            <p>Rent out your unused items, make some extra cash while you're not using them</p>
            <Link className="splash-start-renting-button" >Start Renting</Link>
        </div>
      </div>
    );
  }
}

export default MainPage;
