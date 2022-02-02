// Calling all necessary packages and libraries
import React from "react";
import "../Assets/css/AboutPage.css";
import logo from "../Assets/images/logo/cotrack-logo.png";
const { ipcRenderer } = window.require("electron");

export default function AboutPage() {
  // expression to open the Clemotec website
  const openClemotec = () => {
    ipcRenderer.send("open-clemotec");
  };

  // expression to open Clemotec apps and updates on the Clemotec webiste
  const openUpdates = () => {
    ipcRenderer.send("open-updates");
  };

  // expression to close the About window
  const closeAboutWindow = () => {
    ipcRenderer.send("close-about-window");
  };

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
          <span className="clemotec-link" onClick={() => openClemotec()}>
            {" "}
            Clemotec Inc.{" "}
          </span>
        </p>
        <p>Developed by Gyimah Clement</p>
      </div>
      <div className="buttons-main-div">
        <div className="buttons-div">
          <span className="check-update-button" onClick={() => openUpdates()}>
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
