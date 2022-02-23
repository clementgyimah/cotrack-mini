// Calling all necessary packages and libraries
import React, { useState } from "react";
import "../../../assets/css/NewAttendee.css";
import {
  NewAttendeeFormInputStyle,
  NewAttendeeFormSelectStyle,
  AsterickIcon,
} from "../../../assets/styles";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { TextInput, SelectInput, FaAsteriskIcon } from "../../../components";
import { addNewAttendee } from "../functions";

export default function NewAttendee(props) {
  // declaration of state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [temperature, setTemperature] = useState("");
  const [attendeeAlreadyExist, setAttendeeAlreadyExist] = useState(false);
  const [invalidAdd, setInvalidAdd] = useState(false);
  const [activateTemp, setActivateTemp] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const resetAllInputs = () => {
    setFirstName("");
    setLastName("");
    setLocation("");
    setContactNumber("");
    setEmailAddress("");
    setTemperature("");
  };

  const resetAllErrors = () => {
    setAttendeeAlreadyExist(false);
    setInvalidAdd(false);
    setInvalidEmail(false);
  }

  // expressions to set inputs to their respective state variables
  const firstNameFunc = (e) => {
    setFirstName(e.target.value);
    setAttendeeAlreadyExist(false);
    setInvalidAdd(false);
    setInvalidEmail(false);
  };

  const lastNameFunc = (e) => {
    setLastName(e.target.value);
    setAttendeeAlreadyExist(false);
    setInvalidAdd(false);
    setInvalidEmail(false);
  };

  const genderFunc = (e) => {
    setGender(e.target.value);
    setAttendeeAlreadyExist(false);
    setInvalidAdd(false);
    setInvalidEmail(false);
  };

  const locationFunc = (e) => {
    setLocation(e.target.value);
    setAttendeeAlreadyExist(false);
    setInvalidAdd(false);
    setInvalidEmail(false);
  };

  const contactNumberFunc = (e) => {
    setContactNumber(e.target.value);
    setAttendeeAlreadyExist(false);
    setInvalidAdd(false);
    setInvalidEmail(false);
  };

  const emailAddressFunc = (e) => {
    setEmailAddress(e.target.value);
    setAttendeeAlreadyExist(false);
    setInvalidAdd(false);
    setInvalidEmail(false);
  };

  const temperatureFunc = (e) => {
    setTemperature(e.target.value);
    setAttendeeAlreadyExist(false);
    setInvalidAdd(false);
    setInvalidEmail(false);
  };

  const activateTempFunc = () => {
    setActivateTemp(!activateTemp);
    setTemperature("");
    setInvalidAdd(false);
    setInvalidEmail(false);
  };

  return (
    <div className="new-attendee-container">
      <div className="new-attendee-holder">
        {/** form labels, inputs and toggle buttons */}
        <div className="section-div">
          <label htmlFor="first-name-label" className="attendee-details-text">
            First Name:{" "}
          </label>
          <TextInput
            type="text"
            id="first-name-label"
            placeholder="Clement"
            value={firstName}
            onChange={firstNameFunc}
            inputStyle={NewAttendeeFormInputStyle}
          />
          <FaAsteriskIcon style={AsterickIcon} />
        </div>
        <div className="section-div">
          <label htmlFor="last-name-label" className="attendee-details-text">
            Last Name:{" "}
          </label>
          <TextInput
            type="text"
            id="last-name-label"
            placeholder="Gyimah"
            value={lastName}
            onChange={lastNameFunc}
            inputStyle={NewAttendeeFormInputStyle}
          />
          <FaAsteriskIcon style={AsterickIcon} />
        </div>
        <div className="section-div">
          <label htmlFor="last-name-label" className="attendee-details-text">
            Gender:{" "}
          </label>
          <SelectInput
            id="last-name-label"
            placeholder="Gender"
            value={gender}
            onChange={genderFunc}
            intro="Choose Gender"
            selectStyle={NewAttendeeFormSelectStyle}
            options={[
              {
                displayName: "Male",
                value: "Male",
              },
              {
                displayName: "Female",
                value: "Female",
              },
            ]}
          />
          <FaAsteriskIcon style={AsterickIcon} />
        </div>
        <div className="section-div">
          <label htmlFor="location-label" className="attendee-details-text">
            Location:{" "}
          </label>
          <TextInput
            type="text"
            id="location-label"
            placeholder="Aputuogya"
            value={location}
            onChange={locationFunc}
            inputStyle={NewAttendeeFormInputStyle}
          />
        </div>
        <div className="section-div">
          <label
            htmlFor="contact-number-label"
            className="attendee-details-text"
          >
            Contact Number:{" "}
          </label>
          <TextInput
            type="text"
            id="contact-number-label"
            placeholder="0559505063"
            value={contactNumber}
            onChange={contactNumberFunc}
            inputStyle={NewAttendeeFormInputStyle}
          />
        </div>
        <div className="section-div">
          <label
            htmlFor="email-address-label"
            className="attendee-details-text"
          >
            Email Address:{" "}
          </label>
          <TextInput
            type="text"
            id="email-address-label"
            placeholder="clementgyimah2@gmail.com"
            value={emailAddress}
            onChange={emailAddressFunc}
            inputStyle={NewAttendeeFormInputStyle}
          />
        </div>
        <div className="section-div">
          <label
            htmlFor="temperature-label"
            className={
              activateTemp
                ? "attendee-details-text"
                : "attendee-details-text-disabled"
            }
          >
            Temperature:{" "}
          </label>
          {activateTemp ? (
            <TextInput
              type="number"
              id="temperature-label"
              placeholder="37.01"
              value={temperature}
              onChange={temperatureFunc}
              inputStyle={NewAttendeeFormInputStyle}
            />
          ) : (
            <TextInput
              disabled={true}
              type="number"
              id="temperature-label"
              placeholder="37.01"
              value={temperature}
              onChange={temperatureFunc}
              inputStyle={NewAttendeeFormInputStyle}
            />
          )}
          <span
            className="activate-toggle-span"
            onClick={() => activateTempFunc()}
          >
            {activateTemp ? (
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
        <div className="temperature-button-div">
          <div
            onClick={() => addNewAttendee({
              firstName,
              lastName,
              gender,
              location,
              contactNumber,
              emailAddress,
              temperature,
              activateTemp,
              setFirstName,
              setLastName,
              setGender,
              setLocation,
              setContactNumber,
              setEmailAddress,
              setTemperature,
              setAttendeeAlreadyExist,
              setInvalidAdd,
              setInvalidEmail,
              resetAllInputs,
              resetAllErrors
            })}
            className="temperature-button"
          >
            Save
          </div>
        </div>
        {
          /**
           * send error if attendee already exist in the database
           * or any of the input(s) is/are not correct
           */
          attendeeAlreadyExist ? (
            <div className="new-attendee-error">
              Oops!{" "}
              <span role="img" aria-label="Thinking">
                🤔
              </span>{" "}
              Attendee already exists
            </div>
          ) : invalidAdd ? (
            <div className="new-attendee-error">
              Oops!{" "}
              <span role="img" aria-label="EyesUp">
                🙄
              </span>{" "}
              Fill all inputs appropriately
            </div>
          ) : invalidEmail ? (
            <div className="new-attendee-error">
              Oops!{" "}
              <span role="img" aria-label="EyesUp">
                🙄
              </span>{" "}
              Email address should have a maximum of 25 characters
            </div>
          ) : (
            <div></div>
          )
        }
      </div>
    </div>
  );
}
