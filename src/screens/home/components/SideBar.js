import React from "react";
import {
  currentServiceHoverFunc,
  editHoverFunc,
  sessionAnalyzerHoverFunc,
  settingsHoverFunc,
  sidebarMenuCurrentService,
  sidebarMenuEdit,
  sidebarMenuSessionAnalyzer,
  sidebarMenuSettings,
} from "../functions/sidebarFunc";
import "../../../assets/css/HomePage.css";
import { FaTools, FaWindowMaximize, FaEdit, FaMedapps } from "react-icons/fa";

const BigSideBar = ({ ...bigSideBarProps }) => (
  <div className="sidebar">
    <div
      onMouseEnter={() =>
        currentServiceHoverFunc({
          cond: "ON",
          setCurrentServiceHover: (props) =>
            bigSideBarProps.setCurrentServiceHover(props),
        })
      }
      onMouseLeave={() =>
        currentServiceHoverFunc({
          cond: "OFF",
          setCurrentServiceHover: (props) =>
            bigSideBarProps.setCurrentServiceHover(props),
        })
      }
      onClick={() => sidebarMenuCurrentService()}
      className="sidebar-element-div"
    >
      <FaWindowMaximize
        id="sidebar-icons"
        color={bigSideBarProps.currentServiceHover ? "#6698FF" : "#387C44"}
        size={bigSideBarProps.currentServiceHover ? 25 : 20}
      ></FaWindowMaximize>
      <span
        className={
          bigSideBarProps.currentServiceHover
            ? "sidebar-element-div-text-active"
            : "sidebar-element-div-text"
        }
      >
        Current Service
      </span>
    </div>
    <div
      onMouseEnter={() =>
        editHoverFunc({
          cond: "ON",
          setEditHover: (props) => bigSideBarProps.setEditHover(props),
        })
      }
      onMouseLeave={() =>
        editHoverFunc({
          cond: "OFF",
          setEditHover: (props) => bigSideBarProps.setEditHover(props),
        })
      }
      onClick={() => sidebarMenuEdit()}
      className="sidebar-element-div"
    >
      <FaEdit
        id="sidebar-icons"
        color={bigSideBarProps.editHover ? "#6698FF" : "#387C44"}
        size={bigSideBarProps.editHover ? 25 : 20}
      ></FaEdit>
      <span
        className={
          bigSideBarProps.editHover
            ? "sidebar-element-div-text-active"
            : "sidebar-element-div-text"
        }
      >
        Edit
      </span>
    </div>
    <div
      onMouseEnter={() =>
        sessionAnalyzerHoverFunc({
          cond: "ON",
          setAnalyzerHover: (props) => bigSideBarProps.setAnalyzerHover(props),
        })
      }
      onMouseLeave={() =>
        sessionAnalyzerHoverFunc({
          cond: "OFF",
          setAnalyzerHover: (props) => bigSideBarProps.setAnalyzerHover(props),
        })
      }
      onClick={() => sidebarMenuSessionAnalyzer()}
      className="sidebar-element-div"
    >
      <FaMedapps
        id="sidebar-icons"
        color={bigSideBarProps.analyzerHover ? "#6698FF" : "#387C44"}
        size={bigSideBarProps.analyzerHover ? 25 : 20}
      ></FaMedapps>
      <span
        className={
          bigSideBarProps.analyzerHover
            ? "sidebar-element-div-text-active"
            : "sidebar-element-div-text"
        }
      >
        Sessions
      </span>
    </div>
    <div
      onMouseEnter={() =>
        settingsHoverFunc({
          cond: "ON",
          setSettingsHover: (props) => bigSideBarProps.setSettingsHover(props),
        })
      }
      onMouseLeave={() =>
        settingsHoverFunc({
          cond: "OFF",
          setSettingsHover: (props) => bigSideBarProps.setSettingsHover(props),
        })
      }
      onClick={() => sidebarMenuSettings()}
      className="sidebar-element-div"
    >
      <FaTools
        id="sidebar-icons"
        color={bigSideBarProps.settingsHover ? "#6698FF" : "#387C44"}
        size={bigSideBarProps.settingsHover ? 25 : 20}
      ></FaTools>
      <span
        className={
          bigSideBarProps.settingsHover
            ? "sidebar-element-div-text-active"
            : "sidebar-element-div-text"
        }
      >
        Settings
      </span>
    </div>
  </div>
);

const SmallSideBar = ({ ...smallSideBarProps }) => (
  <div className="short-sidebar">
    <div
      onMouseEnter={() =>
        currentServiceHoverFunc({
          cond: "ON",
          setCurrentServiceHover: (props) =>
          smallSideBarProps.setCurrentServiceHover(props),
        })
      }
      onMouseLeave={() =>
        currentServiceHoverFunc({
          cond: "OFF",
          setCurrentServiceHover: (props) =>
          smallSideBarProps.setCurrentServiceHover(props),
        })
      }
      onClick={() => sidebarMenuCurrentService()}
      className="short-sidebar-element-div"
    >
      <FaWindowMaximize
        id="sidebar-icons"
        color={smallSideBarProps.currentServiceHover ? "#6698FF" : "#387C44"}
        size={smallSideBarProps.currentServiceHover ? 25 : 20}
      ></FaWindowMaximize>
    </div>
    <div
      onMouseEnter={() =>
        editHoverFunc({
          cond: "ON",
          setEditHover: (props) => smallSideBarProps.setEditHover(props),
        })
      }
      onMouseLeave={() =>
        editHoverFunc({
          cond: "OFF",
          setEditHover: (props) => smallSideBarProps.setEditHover(props),
        })
      }
      onClick={() => sidebarMenuEdit()}
      className="short-sidebar-element-div"
    >
      <FaEdit
        id="sidebar-icons"
        color={smallSideBarProps.editHover ? "#6698FF" : "#387C44"}
        size={smallSideBarProps.editHover ? 25 : 20}
      ></FaEdit>
    </div>
    <div
      onMouseEnter={() =>
        sessionAnalyzerHoverFunc({
          cond: "ON",
          setAnalyzerHover: (props) => smallSideBarProps.setAnalyzerHover(props),
        })
      }
      onMouseLeave={() =>
        sessionAnalyzerHoverFunc({
          cond: "OFF",
          setAnalyzerHover: (props) => smallSideBarProps.setAnalyzerHover(props),
        })
      }
      onClick={() => sidebarMenuSessionAnalyzer()}
      className="short-sidebar-element-div"
    >
      <FaMedapps
        id="sidebar-icons"
        color={smallSideBarProps.analyzerHover ? "#6698FF" : "#387C44"}
        size={smallSideBarProps.analyzerHover ? 25 : 20}
      ></FaMedapps>
    </div>
    <div
      onMouseEnter={() =>
        settingsHoverFunc({
          cond: "ON",
          setSettingsHover: (props) => smallSideBarProps.setSettingsHover(props),
        })
      }
      onMouseLeave={() =>
        settingsHoverFunc({
          cond: "OFF",
          setSettingsHover: (props) => smallSideBarProps.setSettingsHover(props),
        })
      }
      onClick={() => sidebarMenuSettings()}
      className="short-sidebar-element-div"
    >
      <FaTools
        id="sidebar-icons"
        color={smallSideBarProps.settingsHover ? "#6698FF" : "#387C44"}
        size={smallSideBarProps.settingsHover ? 25 : 20}
      ></FaTools>
    </div>
  </div>
);

export { BigSideBar, SmallSideBar };
