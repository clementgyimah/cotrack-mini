import React from "react";
import '../assets/css/Icon.css'
import { FaAsterisk } from "react-icons/fa";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";

const FaAsteriskIcon = (props) => {
  return <FaAsterisk className="asterick-icon" style={props.style} />;
};

const BsToggleOnIcon = (props) => {
  return <BsToggleOn className="activate-toggle-on" style={props.style}  />
}

const BsToggleOffIcon = (props) => {
  return <BsToggleOff className="activate-toggle-off" style={props.style} />
}

export { FaAsteriskIcon, BsToggleOnIcon, BsToggleOffIcon }
