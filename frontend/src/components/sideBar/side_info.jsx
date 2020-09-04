import React, { useState, useEffect } from "react";

class sideBar extends React.Component {
  render() {
    return (
      <div>
        <div className="side-info-container">
          <div>
            Meet the team!
            <div className="programmer-info">
              Ahmed Mahallawy
              <a href="https://github.com/amahalwy"></a>
            </div>
            <div className="programmer-info">
              Ayce Lacap
              <a href="https://github.com/aycelacap"></a>
            </div>
            <div className="programmer-info">
              Nate Gallegher
              <a href="https://github.com/n8gallagher"></a>
            </div>
            <div className="programmer-info">
              Sean Scott
              <a href="https://github.com/n8gallagher"></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}