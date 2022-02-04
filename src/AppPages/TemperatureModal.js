// Calling all necessary packages and libraries
import React, { useState } from "react";
import "../Assets/css/Modal.css";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import PropTypes from "prop-types";
const { ipcRenderer } = window.require("electron");

export default function TemperatureModal(props) {
  // declaration of state variables
  const [attendeeTemperature, setAttendeeTemperature] = useState("");
  const [invalidRecord, setInvalidRecord] = useState(false);
  const [attendeeExists, setAttendeeExists] = useState(false);
  const [activateTemperature, setActivateTemperature] = useState(true);
  const showTempModal = props.show
    ? "modal display-block"
    : "modal display-none";

  // expression to take care of temperature input
  const temperatureFunc = (e) => {
    setAttendeeTemperature(e.target.value);
    setInvalidRecord(false);
    setAttendeeExists(false);
  };

  // expression to take care of prompting backend to record attendee temperature
  const handleRecordTemperature = () => {
    if (attendeeTemperature.length === 0) {
      if (activateTemperature) setInvalidRecord(true);
      else {
        const attendeeData = {
          firstName: props.cFirstName,
          lastName: props.cLastName,
          gender: props.cGender,
          location: props.cLocation,
          contactNumber: props.cContactNumber,
          emailAddress: props.cEmailAddress,
          temperature: "NA",
        };

        ipcRenderer.send("record-attendee-temperature", attendeeData);
        ipcRenderer.on(
          "record-attendee-temperature-reply",
          async (event, arg) => {
            await setAttendeeExists(arg);
          }
        );
        setAttendeeTemperature("");
      }
    } else {
      const attendeeData = {
        firstName: props.cFirstName,
        lastName: props.cLastName,
        gender: props.cGender,
        location: props.cLocation,
        contactNumber: props.cContactNumber,
        emailAddress: props.cEmailAddress,
        temperature: attendeeTemperature,
      };

      ipcRenderer.send("record-attendee-temperature", attendeeData);
      ipcRenderer.on(
        "record-attendee-temperature-reply",
        async (event, arg) => {
          await setAttendeeExists(arg);
        }
      );
      setAttendeeTemperature("");
    }
    return null;
  };

  // expression to handle closing the temperature modal
  const handleCloseModal = () => {
    setAttendeeExists(false);
    setInvalidRecord(false);
    return props.handleClose();
  };

  // expression to take care of activating temperature input
  const activateTemperatureFunc = () => {
    setActivateTemperature(!activateTemperature);
    setInvalidRecord(false);
    setAttendeeExists(false);
    setAttendeeTemperature("");
  };

  return (
    <div className={showTempModal}>
      <div className="modal-main">
        <div className="record-temperature-div">Record Attendee</div>
        {
          /** error to return in case any input is not correct */
          attendeeExists ? (
            <div className="record-temp-error">
              Oops!{" "}
              <span role="img" aria-label="Thinking">
                🤔
              </span>
              <span> </span>
              <strong>{props.cFirstName}</strong>
              <span> </span>is already recorded
            </div>
          ) : invalidRecord ? (
            <div className="record-temp-error">
              Oops!{" "}
              <span role="img" aria-label="EyesGlass">
                🧐
              </span>{" "}
              Make sure temperature is correct
            </div>
          ) : (
            <div></div>
          )
        }
        {/** labels and inputs */}
        <div className="attendee-info-div">
          <div className="details-div">
            <label
              htmlFor="attendee-label-for-firstName"
              className="label-span"
            >
              First Name:{" "}
            </label>
            <span id="attendee-label-for-firstName" className="detail-span">
              {props.cFirstName}
            </span>
          </div>
          <div className="details-div">
            <label htmlFor="attendee-label-for-lastName" className="label-span">
              Last Name:{" "}
            </label>
            <span id="attendee-label-for-lastName" className="detail-span">
              {props.cLastName}
            </span>
          </div>
          <div className="details-div">
            <label htmlFor="attendee-label-for-lastName" className="label-span">
              Gender:{" "}
            </label>
            <span id="attendee-label-for-lastName" className="detail-span">
              {props.cGender}
            </span>
          </div>
          <div className="details-div">
            <label htmlFor="attendee-label-for-location" className="label-span">
              Location:{" "}
            </label>
            <span id="attendee-label-for-location" className="detail-span">
              {props.cLocation}
            </span>
          </div>
          <div className="details-div">
            <label htmlFor="attendee-label-for-contact" className="label-span">
              Contact Number:{" "}
            </label>
            <span id="attendee-label-for-contact" className="detail-span">
              {props.cContactNumber}
            </span>
          </div>
          <div className="details-div">
            <label htmlFor="attendee-label-for-email" className="label-span">
              Email Address:{" "}
            </label>
            <span id="attendee-label-for-email" className="detail-span">
              {props.cEmailAddress}
            </span>
          </div>
          <div className="details-div">
            <label
              htmlFor="attendee-label-for-temperature"
              className={
                activateTemperature ? "label-span" : "label-span-disabled"
              }
            >
              Temperature:{" "}
            </label>
            {activateTemperature ? (
              <input
                type="number"
                id="attendee-label-for-temperature"
                className="input-span"
                placeholder="37.01"
                step="0.01"
                value={attendeeTemperature}
                onChange={temperatureFunc}
              />
            ) : (
              <input
                disabled
                type="number"
                id="attendee-label-for-temperature"
                className="input-span"
                placeholder="37.01"
                step="0.01"
                value={attendeeTemperature}
                onChange={temperatureFunc}
              />
            )}
            <span
              className="activate-toggle-span"
              onClick={() => activateTemperatureFunc()}
            >
              {activateTemperature ? (
                <BsToggleOn
                  className="activate-toggle-on"
                  size={30}
                  color="#387C44"
                />
              ) : (
                <BsToggleOff
                  className="activate-toggle-off"
                  size={30}
                  color="#387C44"
                />
              )}
            </span>
          </div>
        </div>
        <div className="buttons-div">
          <span
            className="save-button"
            onClick={() => handleRecordTemperature()}
          >
            Save
          </span>
          <span className="close-button" onClick={() => handleCloseModal()}>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}

TemperatureModal.propTypes = {
  cFirstName: PropTypes.string.isRequired,
  cLastName: PropTypes.string.isRequired,
  cGender: PropTypes.string.isRequired,
  cLocation: PropTypes.string.isRequired,
  cContactNumber: PropTypes.string.isRequired,
  cEmailAddress: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
