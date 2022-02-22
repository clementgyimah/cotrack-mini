// Calling all necessary packages and libraries
import React from "react";
import "../../assets/css/AboutPage.css";
import logo from "../../assets/images/logo/cotrack-logo.png";
import { checkUpdates, openWebsite, closeAboutWindow } from './functions';

export default function AboutPage() {

  return (
    <div className="about-container">
      <img
        alt="cotrack-logo"
        src={logo}
        className="cotrack-logo"
        width={150}
        height={150}
      ></img>
      <div className="cotrack-title">Cotrack Mini 1.0.0</div>
      <div className="cotrack-description">
        <p>Cotrack Mini is a mini version of Cotrack.</p>
        <p>Cotrack is a church management software.</p>
        <p>
          Sponsored by{" "}
          <span className="clemotec-link" onClick={() => openWebsite()}>
            {" "}
            Clemotec Inc.{" "}
          </span>
        </p>
        <p>Developed by Gyimah Clement</p>
      </div>
      <div className="buttons-main-div">
        <div className="buttons-div">
          <span className="check-update-button" onClick={() => checkUpdates()}>
            Check for updates
          </span>
        </div>
        <div className="buttons-div">
          <span
            className="close-about-button"
            onClick={() => closeAboutWindow()}
          >
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
