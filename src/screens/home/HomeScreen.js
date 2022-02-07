// Calling all necessary packages and libraries
import React, { useState, useEffect } from "react";
import "../../Assets/css/HomePage.css";
import {
  FaTools,
  FaBars,
  FaWindowMaximize,
  FaEdit,
  FaMedapps,
} from "react-icons/fa";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
const { ipcRenderer } = window.require("electron");

function HomePage() {
  // declaration of state variables
  const [takeCareOfService, setTakeCareOfService] = useState("");
  const [bigSidebar, setBigSidebar] = useState(false);
  const [sideBarType, setSidebarType] = useState("short-home-content");
  const [startServiceDiv, setStartServiceDiv] = useState(
    "short-start-service-div"
  );
  const [viewServiceDiv, setViewServiceDiv] = useState(
    "short-view-service-div"
  );
  const [serviceStartingTime, setServiceStartingTime] = useState("");
  const [serviceEndingTime, setServiceEndingTime] = useState("");
  const [currentServiceHover, setCurrentServiceHover] = useState(false);
  const [editHover, setEditHover] = useState(false);
  const [analyzerHover, setAnalyzerHover] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [settingsHover, setSettingsHover] = useState(false);
  const [invalidStart, setInvalidStart] = useState(false);
  const [invalidView, setInvalidView] = useState(false);
  const [serviceAlreadyStarted, setServiceAlreadyStarted] = useState(false);
  const [churchName, setChurchName] = useState("");
  const [verificationKey, setVerificationKey] = useState("");
  const [keyError, setKeyError] = useState(false);
  const [activatePassword, setActivatePassword] = useState(true);

  // react hook that starts first when component mounts
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      ipcRenderer.send("verify-unlocked");
      ipcRenderer.on("verify-unlocked-reply", async (event, arg) => {
        await setVerifiedUser(arg);
      });
      ipcRenderer.send("get-church-name");
      ipcRenderer.on("get-church-name-reply", async (event, arg) => {
        await setChurchName(arg);
      });
    }
    return () => (isSubscribed = false);
  });

  // expression to handle starting a new session by prompting the backend
  const startNewService = () => {
    if (serviceStartingTime.length === 0 || serviceEndingTime.length === 0) {
      setInvalidStart(true);
    } else {
      const properties = {
        startingTime: serviceStartingTime,
        endingTime: serviceEndingTime,
      };
      ipcRenderer.send("open-tabs", properties);
      ipcRenderer.on("open-tabs-reply", async (event, arg) => {
        await setServiceAlreadyStarted(arg);
      });
      setServiceStartingTime("");
      setServiceEndingTime("");
    }
  };

  // expression to handle viewing session information
  const handleViewService = () => {
    if (takeCareOfService.length === 0) setInvalidView(true);
    else {
      ipcRenderer.send("open-session", takeCareOfService);
    }
  };

  // expression to handle inputs for viewing session information
  const handleInputService = (e) => {
    setTakeCareOfService(e.target.value);
    if (invalidView) setInvalidView(false);
  };

  // expression to prompt backend to open the current session window
  const sidebarMenuCurrentService = () => {
    ipcRenderer.send("open-current-session");
  };

  // expression to prompt backend to open the edit attendee window
  const sidebarMenuEdit = () => {
    ipcRenderer.send("open-edit-window");
  };

  // expression to prompt backend to open the session analyzer window
  const sidebarMenuSessionAnalyzer = () => {
    ipcRenderer.send("open-analysis-window");
  };

  // expression to prompt backend to open the settings window
  const sidebarMenuSettings = () => {
    ipcRenderer.send("open-settings-window");
  };

  // expression to handle toggling of the sidebar when the icon is selected
  const toggleSidebar = () => {
    setBigSidebar(!bigSidebar);
    if (sideBarType === "short-home-content") {
      setSidebarType("long-home-content");
      setStartServiceDiv("long-start-service-div");
      setViewServiceDiv("long-view-service-div");
    } else if (sideBarType === "long-home-content") {
      setSidebarType("short-home-content");
      setStartServiceDiv("short-start-service-div");
      setViewServiceDiv("short-view-service-div");
    }
  };

  // expression to control session starting time input
  const serviceStartingTimeFunc = (e) => {
    setServiceStartingTime(e.target.value);
    if (invalidStart) setInvalidStart(false);
    if (serviceAlreadyStarted) setServiceAlreadyStarted(false);
  };

  // expression to control session ending time input
  const serviceEndingTimeFunc = (e) => {
    setServiceEndingTime(e.target.value);
    if (invalidStart) setInvalidStart(false);
    if (serviceAlreadyStarted) setServiceAlreadyStarted(false);
  };

  // expressions to handle hovering over any of the sidebar menu items
  const currentServiceHoverFunc = (cond) => {
    if (cond === "on") setCurrentServiceHover(true);
    else if (cond === "off") setCurrentServiceHover(false);
  };

  const editHoverFunc = (cond) => {
    if (cond === "on") setEditHover(true);
    else if (cond === "off") setEditHover(false);
  };

  const sessionAnalyzerHoverFunc = (cond) => {
    if (cond === "on") setAnalyzerHover(true);
    else if (cond === "off") setAnalyzerHover(false);
  };

  const settingsHoverFunc = (cond) => {
    if (cond === "on") setSettingsHover(true);
    else if (cond === "off") setSettingsHover(false);
  };

  // expression to control verify key input
  const verificationInputMonitor = (e) => {
    setVerificationKey(e.target.value);
    setKeyError(false);
  };

  // expression to send the verification key to the backend for verification
  const verifyKey = () => {
    if (verificationKey.length !== 0) {
      ipcRenderer.send("verify-account-key", verificationKey);
      ipcRenderer.on("verify-account-key-reply", async (event, arg) => {
        setKeyError(arg);
      });
      setVerificationKey("");
    } else setKeyError(true);
  };

  const activatePasswordFunc = () => {
    setActivatePassword(!activatePassword);
    setKeyError(false);
  };

  return (
    <div className="home-container">
      {verifiedUser ? (
        <div>
          {/** header of the homepage */}
          <header className="home-header">
            <div onClick={() => toggleSidebar()} className="open-sidebar-div">
              <FaBars color="white" size={30}></FaBars>
            </div>
            <div className="church-title-div">
              <div className="church-title">{churchName}</div>
            </div>
          </header>
          {
            /**
             * check if the big sidebar should be activated
             * or the small sidebar should be activated
             */
            bigSidebar ? (
              <div className="sidebar">
                <div
                  onMouseEnter={() => currentServiceHoverFunc("on")}
                  onMouseLeave={() => currentServiceHoverFunc("off")}
                  onClick={() => sidebarMenuCurrentService()}
                  className="sidebar-element-div"
                >
                  <FaWindowMaximize
                    id="sidebar-icons"
                    color={currentServiceHover ? "#6698FF" : "#387C44"}
                    size={currentServiceHover ? 25 : 20}
                  ></FaWindowMaximize>
                  <span
                    className={
                      currentServiceHover
                        ? "sidebar-element-div-text-active"
                        : "sidebar-element-div-text"
                    }
                  >
                    Current Service
                  </span>
                </div>
                <div
                  onMouseEnter={() => editHoverFunc("on")}
                  onMouseLeave={() => editHoverFunc("off")}
                  onClick={() => sidebarMenuEdit()}
                  className="sidebar-element-div"
                >
                  <FaEdit
                    id="sidebar-icons"
                    color={editHover ? "#6698FF" : "#387C44"}
                    size={editHover ? 25 : 20}
                  ></FaEdit>
                  <span
                    className={
                      editHover
                        ? "sidebar-element-div-text-active"
                        : "sidebar-element-div-text"
                    }
                  >
                    Edit
                  </span>
                </div>
                <div
                  onMouseEnter={() => sessionAnalyzerHoverFunc("on")}
                  onMouseLeave={() => sessionAnalyzerHoverFunc("off")}
                  onClick={() => sidebarMenuSessionAnalyzer()}
                  className="sidebar-element-div"
                >
                  <FaMedapps
                    id="sidebar-icons"
                    color={analyzerHover ? "#6698FF" : "#387C44"}
                    size={analyzerHover ? 25 : 20}
                  ></FaMedapps>
                  <span
                    className={
                      analyzerHover
                        ? "sidebar-element-div-text-active"
                        : "sidebar-element-div-text"
                    }
                  >
                    Analyze
                  </span>
                </div>
                <div
                  onMouseEnter={() => settingsHoverFunc("on")}
                  onMouseLeave={() => settingsHoverFunc("off")}
                  onClick={() => sidebarMenuSettings()}
                  className="sidebar-element-div"
                >
                  <FaTools
                    id="sidebar-icons"
                    color={settingsHover ? "#6698FF" : "#387C44"}
                    size={settingsHover ? 25 : 20}
                  ></FaTools>
                  <span
                    className={
                      settingsHover
                        ? "sidebar-element-div-text-active"
                        : "sidebar-element-div-text"
                    }
                  >
                    Settings
                  </span>
                </div>
              </div>
            ) : (
              <div className="short-sidebar">
                <div
                  onMouseEnter={() => currentServiceHoverFunc("on")}
                  onMouseLeave={() => currentServiceHoverFunc("off")}
                  onClick={() => sidebarMenuCurrentService()}
                  className="short-sidebar-element-div"
                >
                  <FaWindowMaximize
                    id="sidebar-icons"
                    color={currentServiceHover ? "#6698FF" : "#387C44"}
                    size={currentServiceHover ? 25 : 20}
                  ></FaWindowMaximize>
                </div>
                <div
                  onMouseEnter={() => editHoverFunc("on")}
                  onMouseLeave={() => editHoverFunc("off")}
                  onClick={() => sidebarMenuEdit()}
                  className="short-sidebar-element-div"
                >
                  <FaEdit
                    id="sidebar-icons"
                    color={editHover ? "#6698FF" : "#387C44"}
                    size={editHover ? 25 : 20}
                  ></FaEdit>
                </div>
                <div
                  onMouseEnter={() => sessionAnalyzerHoverFunc("on")}
                  onMouseLeave={() => sessionAnalyzerHoverFunc("off")}
                  onClick={() => sidebarMenuSessionAnalyzer()}
                  className="short-sidebar-element-div"
                >
                  <FaMedapps
                    id="sidebar-icons"
                    color={analyzerHover ? "#6698FF" : "#387C44"}
                    size={analyzerHover ? 25 : 20}
                  ></FaMedapps>
                </div>
                <div
                  onMouseEnter={() => settingsHoverFunc("on")}
                  onMouseLeave={() => settingsHoverFunc("off")}
                  onClick={() => sidebarMenuSettings()}
                  className="short-sidebar-element-div"
                >
                  <FaTools
                    id="sidebar-icons"
                    color={settingsHover ? "#6698FF" : "#387C44"}
                    size={settingsHover ? 25 : 20}
                  ></FaTools>
                </div>
              </div>
            )
          }
          {/**
           * the "sideBarType" variable will help identify
           * which CSS attribute should be used
           * for the homepage content considering
           * the type of sidebar being activated
           */}
          <div className={sideBarType}>
            <div className="home-content-background-decoration" />
            <div className={startServiceDiv}>
              <div className="start-service-text">Start Session</div>
              <div>
                <div className="start-service-elements-div">
                  <label
                    htmlFor="service-start-label"
                    className="service-details-text"
                  >
                    Starting Time:{" "}
                  </label>
                  <input
                    id="service-start-label"
                    className="service-details-input"
                    onChange={serviceStartingTimeFunc}
                    value={serviceStartingTime}
                    placeholder="09:30:AM"
                    type="time"
                  />
                </div>
                <div className="start-service-elements-div">
                  <label
                    htmlFor="service-end-label"
                    className="service-details-text"
                  >
                    Ending Time:{" "}
                  </label>
                  <input
                    id="service-end-label"
                    className="service-details-input"
                    onChange={serviceEndingTimeFunc}
                    value={serviceEndingTime}
                    placeholder="12:30:PM"
                    type="time"
                  />
                </div>
                <div className="start-service-button-div">
                  <div
                    onClick={() => startNewService()}
                    className="start-service-button"
                  >
                    Start
                  </div>
                </div>
              </div>
              {
                /**
                 * check if service has already been started
                 * or input is incorrect and return the respective error
                 */
                serviceAlreadyStarted ? (
                  <div className="start-view-error">
                    Oops!{" "}
                    <span role="img" aria-label="Thinking">
                      🤔
                    </span>{" "}
                    Service already started
                  </div>
                ) : invalidStart ? (
                  <div className="start-view-error">
                    Oops!{" "}
                    <span role="img" aria-label="EyesUp">
                      🙄
                    </span>{" "}
                    Fill all inputs appropriately
                  </div>
                ) : (
                  <div></div>
                )
              }
            </div>
            <div className={viewServiceDiv}>
              <div className="view-service-text">View Session</div>
              <div className="view-service-elements-div">
                <label
                  htmlFor="service-date-label"
                  className="view-service-details-text"
                >
                  Date:{" "}
                </label>
                <input
                  id="service-date-label"
                  className="view-service-details-input"
                  onChange={handleInputService}
                  value={takeCareOfService}
                  placeholder="2020-09-15"
                  type="date"
                />
              </div>
              <div className="view-service-button-div">
                <div
                  onClick={() => handleViewService()}
                  className="view-service-button"
                >
                  View
                </div>
              </div>
              {
                /**
                 * check if date input is correct
                 * before viewing service information
                 * */
                invalidView ? (
                  <div className="start-view-error">
                    Oops!{" "}
                    <span role="img" aria-label="EyesUp">
                      🙄
                    </span>{" "}
                    Fill all inputs appropriately
                  </div>
                ) : (
                  <div></div>
                )
              }
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="verification-header">Verify your Account</div>
          <div className="verification-body">
            <div className="verification-input-div">
              <input
                className="verification-input"
                type={activatePassword ? "password" : "text"}
                placeholder="Type the verification key"
                onChange={verificationInputMonitor}
                value={verificationKey}
              />
            </div>
            <div className="hint-text">
              {/**
               * The &apos; tag represents a single quotation mark(')
               */}
              <strong>Hint:</strong> Don&apos;t you have a key? Get in touch
              with us on <strong>clementgyimah2@gmail.com</strong> or{" "}
              <strong>+233559505063</strong>
            </div>
            <span
              className="activate-password-toggle-span"
              onClick={() => activatePasswordFunc()}
            >
              {activatePassword ? (
                <BsToggleOff
                  className="activate-password-toggle-off"
                  size={20}
                  color="#387C44"
                />
              ) : (
                <BsToggleOn
                  className="activate-password-toggle-on"
                  size={20}
                  color="#387C44"
                />
              )}{" "}
              <span className="show-key-text">Show Key</span>
            </span>
            <div className="verification-button-div">
              <div className="verification-button" onClick={() => verifyKey()}>
                Verify
              </div>
            </div>
            {keyError ? (
              <div className="start-view-error">
                Oops!{" "}
                <span role="img" aria-label="Thinking">
                  🤔
                </span>
                Incorrect key
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
