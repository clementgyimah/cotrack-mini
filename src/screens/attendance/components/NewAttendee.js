// Calling all necessary packages and libraries
import React, { useState } from "react";
import "../../../assets/css/NewAttendee.css";
import { NewAttendeeFormInputStyle, NewAttendeeFormSelectStyle, AsterickIcon } from "../../../assets/styles";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { TextInput, SelectInput, FaAsteriskIcon } from "../../../components";
const { ipcRenderer } = window.require("electron");

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
  const [activateTemp, setActivateTemp] = useState(true);
  const [activateEmail, setActivateEmail] = useState(true);
  const [activateContact, setActivateContact] = useState(true);
  const [activateLocation, setActivateLocation] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const onSubmit = () => {
    // variables to hold attendee details
    setFirstName(firstName.split(" ").join(""));
    setLastName(lastName.split(" ").join(""));
    setContactNumber(contactNumber.split(" ").join(""));
    setEmailAddress(emailAddress.split(" ").join(""));
    setTemperature(temperature.split(" ").join(""));
    setGender(gender.split(" ").join(""));
    console.log(gender);
    /**
     * logic that uses "Exclusive OR" to make sure that each toggle button
     * correlate with it's input before form submission
     */
    if (firstName.length === 0 || lastName.length === 0 || gender.length === 0)
      return setInvalidAdd(true);
    else if (
      location.length === 0 ||
      contactNumber.length === 0 ||
      emailAddress.length === 0 ||
      temperature.length === 0
    ) {
      if (
        (location.length === 0 && !activateLocation) ||
        (!(location.length === 0) && activateLocation)
      ) {
        if (
          (contactNumber.length === 0 && !activateContact) ||
          (!(contactNumber.length === 0) && activateContact)
        ) {
          if (
            (emailAddress.length === 0 && !activateEmail) ||
            (!(emailAddress.length === 0) && activateEmail)
          ) {
            if (
              (temperature.length === 0 && !activateTemp) ||
              (!(temperature.length === 0) && activateTemp)
            ) {
              if (!activateEmail) {
                const attendeeDetails = {
                  firstName,
                  lastName,
                  gender,
                  location,
                  contactNumber,
                  emailAddress,
                  temperature,
                };
                ipcRenderer.send("new-attendee", attendeeDetails);
                ipcRenderer.on("new-attendee-reply", (event, arg) => {
                  setAttendeeAlreadyExist(arg);
                });
                /**
                 * reset each variable as empty string.
                 * This will clear all input values
                 */
                setFirstName("");
                setLastName("");
                setLocation("");
                setContactNumber("");
                setEmailAddress("");
                setTemperature("");
              } else {
                /**
                 * condition to check if a valid email is entered
                 * in the email input. Done by checking '@' sign in the input
                 */
                if (emailAddress.indexOf("@") < 0) setInvalidAdd(true);
                else {
                  if (emailAddress.length > 25) setInvalidEmail(true);
                  else {
                    const attendeeDetails = {
                      firstName,
                      lastName,
                      gender,
                      location,
                      contactNumber,
                      emailAddress,
                      temperature,
                    };
                    ipcRenderer.send("new-attendee", attendeeDetails);
                    ipcRenderer.on("new-attendee-reply", (event, arg) => {
                      setAttendeeAlreadyExist(arg);
                    });
                    setFirstName("");
                    setLastName("");
                    setLocation("");
                    setContactNumber("");
                    setEmailAddress("");
                    setTemperature("");
                  }
                }
              }
            } else setInvalidAdd(true);
          } else setInvalidAdd(true);
        } else setInvalidAdd(true);
      } else setInvalidAdd(true);
    } else if (emailAddress.indexOf("@") < 0) {
      setInvalidAdd(true);
    } else {
      if (emailAddress.length > 25) setInvalidEmail(true);
      else {
        const attendeeDetails = {
          firstName,
          lastName,
          gender,
          location,
          contactNumber,
          emailAddress,
          temperature,
        };
        ipcRenderer.send("new-attendee", attendeeDetails);
        ipcRenderer.on("new-attendee-reply", (event, arg) => {
          setAttendeeAlreadyExist(arg);
        });
        setFirstName("");
        setLastName("");
        setLocation("");
        setContactNumber("");
        setEmailAddress("");
        setTemperature("");
      }
    }
  };

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

  const activateEmailFunc = () => {
    setActivateEmail(!activateEmail);
    setEmailAddress("");
    setInvalidAdd(false);
    setInvalidEmail(false);
  };

  const activateContactFunc = () => {
    setActivateContact(!activateContact);
    setContactNumber("");
    setInvalidAdd(false);
    setInvalidEmail(false);
  };

  const activateLocationFunc = () => {
    setActivateLocation(!activateLocation);
    setLocation("");
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
                displayName: 'Male',
                value: 'Male'
              },
              {
                displayName: 'Female',
                value: 'Female'
              }
            ]}
          />
          <FaAsteriskIcon style={AsterickIcon} />
        </div>
        <div className="section-div">
          <label
            htmlFor="location-label"
            className={
              activateLocation
                ? "attendee-details-text"
                : "attendee-details-text-disabled"
            }
          >
            Location:{" "}
          </label>
          {activateLocation ? (
            <TextInput
              type="text"
              id="location-label"
              placeholder="Aputuogya"
              value={location}
              onChange={locationFunc}
              inputStyle={NewAttendeeFormInputStyle}
            />
          ) : (
            <TextInput
              disabled={true}
              type="text"
              id="location-label"
              placeholder="Aputuogya"
              value={location}
              onChange={locationFunc}
              inputStyle={NewAttendeeFormInputStyle}
            />
          )}

          <span
            className="activate-toggle-span"
            onClick={() => activateLocationFunc()}
          >
            {activateLocation ? (
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
        <div className="section-div">
          <label
            htmlFor="contact-number-label"
            className={
              activateContact
                ? "attendee-details-text"
                : "attendee-details-text-disabled"
            }
          >
            Contact Number:{" "}
          </label>
          {activateContact ? (
            <TextInput
              type="text"
              id="contact-number-label"
              placeholder="0559505063"
              value={contactNumber}
              onChange={contactNumberFunc}
              inputStyle={NewAttendeeFormInputStyle}
            />
          ) : (
            <TextInput
              disabled={true}
              type="text"
              id="contact-number-label"
              placeholder="0559505063"
              value={contactNumber}
              onChange={contactNumberFunc}
              inputStyle={NewAttendeeFormInputStyle}
            />
          )}
          <span
            className="activate-toggle-span"
            onClick={() => activateContactFunc()}
          >
            {activateContact ? (
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
        <div className="section-div">
          <label
            htmlFor="email-address-label"
            className={
              activateEmail
                ? "attendee-details-text"
                : "attendee-details-text-disabled"
            }
          >
            Email Address:{" "}
          </label>
          {activateEmail ? (
            <TextInput
              type="text"
              id="email-address-label"
              placeholder="clementgyimah2@gmail.com"
              value={emailAddress}
              onChange={emailAddressFunc}
              inputStyle={NewAttendeeFormInputStyle}
            />
          ) : (
            <TextInput
              disabled={true}
              type="text"
              id="email-address-label"
              placeholder="clementgyimah2@gmail.com"
              value={emailAddress}
              onChange={emailAddressFunc}
              inputStyle={NewAttendeeFormInputStyle}
            />
          )}
          <span
            className="activate-toggle-span"
            onClick={() => activateEmailFunc()}
          >
            {activateEmail ? (
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
          <div onClick={() => onSubmit()} className="temperature-button">
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
