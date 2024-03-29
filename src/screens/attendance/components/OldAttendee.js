// Calling all necessary packages and libraries
import React, { useEffect, useState } from "react";
import TemperatureModal from "./RecordAttendaceModal";
import "../../../assets/css/OldAttendee.css";
import { FaThermometerHalf } from "react-icons/fa";
import { TextInput } from "../../../components";
import { searchChange } from "../functions"
import {
  oldAttendeeSearchInputStyle,
  toggleIconStyle,
} from "../../../assets/styles";
import { BsToggleOnIcon, BsToggleOffIcon } from "../../../components";
const { ipcRenderer } = window.require("electron");

export default function OldAttendee() {
  // declaration of state variables
  const [allAttendee, setAllAttendee] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [groupAttendee, setGroupAttendee] = useState([]);
  const [viewCurrentSession, setViewCurrentSession] = useState(true);
  const [currentSession, setCurrentSession] = useState("");
  const [allCurrentSessionAttendee, setAllCurrentSessionAttendee] = useState(
    []
  );
  const [showTempModal, setShowTempModal] = useState(false);
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentGender, setCurrentGender] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentContactNumber, setCurrentContactNumber] = useState("");
  const [currentEmailAddress, setCurrentEmailAddress] = useState("");
  const [timeHolder, setTimeHolder] = useState({});

  useEffect(() => {
    /**
     * react hook that starts first when component mounts or the varibale,
     * "viewCurrentSession", changes
     */
    let isSubscribed = true;
    if (isSubscribed) {
      ipcRenderer.send("old-attendee-all");
      ipcRenderer.on("old-attendee-all-reply", async (event, arg) => {
        setAllAttendee(arg);
      });
      ipcRenderer.send("search-current-session");
      ipcRenderer.on("search-current-session-reply", async (event, arg) => {
        setCurrentSession(arg);
      });
      ipcRenderer.send("old-attendee-current-session-all");
      ipcRenderer.on("sessionTime-reply", async (event, arg) => {
        setTimeHolder(arg);
      });
      ipcRenderer.on(
        "old-attendee-current-session-all-reply",
        async (event, arg) => {
          setAllCurrentSessionAttendee(arg);
        }
      );
    }
    return () => (isSubscribed = false);
  }, [viewCurrentSession]);

  // expressions to set inputs to their respective state variables
  const handleTemperature = (
    firstName,
    lastName,
    gender,
    location,
    contactNumber,
    emailAddress
  ) => {
    setCurrentFirstName(firstName);
    setCurrentLastName(lastName);
    setCurrentGender(gender);
    setCurrentLocation(location);
    setCurrentContactNumber(contactNumber);
    setCurrentEmailAddress(emailAddress);
    setShowTempModal(true);
  };

  const handleSearchInput = (e) => {
    return searchChange(
      {
        viewCurrentSession,
        searchName: e.target.value,
        setSearchActive,
        setGroupAttendee,
      }
    )
  }

  // expression to take care of closing the temperature recording modal
  const closeTempModal = () => {
    setShowTempModal(false);
  };

  /**
   * expression to take care of showing only attendees
   * of the current session on the table
   */
  const viewCurrentSessionFunc = () => {
    setViewCurrentSession(!viewCurrentSession);
  };

  return (
    <div className="old-attendee-container">
      {/** temperature recording modal component call */}
      <TemperatureModal
        show={showTempModal}
        handleClose={() => closeTempModal()}
        cFirstName={currentFirstName}
        cLastName={currentLastName}
        cGender={currentGender}
        cLocation={currentLocation}
        cContactNumber={currentContactNumber}
        cEmailAddress={currentEmailAddress}
      />
      {/** search input div */}
      <div className="search-input-div">
        <TextInput
          type="text"
          placeholder="Type name to search for attendee(s)"
          onChange={handleSearchInput}
          inputStyle={oldAttendeeSearchInputStyle}
        />
      </div>
      <div className="type-of-table">
        <span className="type-of-table-title">
          Active Date ( {currentSession} ):{" "}
        </span>
        <span
          className="type-of-table-toggle-span"
          onClick={() => viewCurrentSessionFunc()}
        >
          {viewCurrentSession ? (
            <BsToggleOnIcon style={toggleIconStyle} />
          ) : (
            <BsToggleOffIcon style={toggleIconStyle} />
          )}
        </span>
      </div>
      {/** Starting and ending time of the session */}
      <div className="time-div">
        <div className="specific-time-div">Start Time: {timeHolder.start}</div>
        <div className="specific-time-div">End Time: {timeHolder.end}</div>
      </div>
      {/** table div */}
      <div className="old-attendee-table-div">
        <table className="old-attendee-table" rules="all">
          <thead className="old-attendee-table-thread">
            <tr className="old-attendee-table-thread-tr">
              <th className="old-attendee-table-thread-tr-th" scope="col">
                <div className="table-cells-div">First Name</div>
              </th>
              <th className="old-attendee-table-thread-tr-th" scope="col">
                <div className="table-cells-div">Last Name</div>
              </th>
              <th className="old-attendee-table-thread-tr-th" scope="col">
                <div className="table-cells-div">Gender</div>
              </th>
              <th className="old-attendee-table-thread-tr-th" scope="col">
                <div className="table-cells-div">Location</div>
              </th>
              <th className="old-attendee-table-thread-tr-th" scope="col">
                <div className="table-cells-div">Contact Number</div>
              </th>
              <th className="old-attendee-table-thread-tr-th" scope="col">
                <div className="table-cells-div">Email Address</div>
              </th>
              <th className="old-attendee-table-thread-tr-th" scope="col">
                <div className="table-cells-div">Temperature</div>
              </th>
            </tr>
          </thead>
          {viewCurrentSession ? (
            <tbody className="old-attendee-table-tbody">
              {searchActive
                ? groupAttendee
                  ? groupAttendee.map(function (data) {
                      return (
                        <tr
                          className="old-attendee-table-tbody-tr"
                          key={
                            data.firstName +
                            data.lastName +
                            data.gender +
                            data.location +
                            data.contactNumber +
                            data.emailAddress
                          }
                        >
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">
                              {data.firstName}
                            </div>
                          </td>
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">
                              {data.lastName}
                            </div>
                          </td>
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">{data.gender}</div>
                          </td>
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">
                              {data.location}
                            </div>
                          </td>
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">
                              {data.contactNumber}
                            </div>
                          </td>
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">
                              {data.emailAddress}
                            </div>
                          </td>
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">
                              {data.temperature}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : console.log("No attendee is gotten from the search")
                : allCurrentSessionAttendee
                ? allCurrentSessionAttendee.map(function (data) {
                    return (
                      <tr
                        className="old-attendee-table-tbody-tr"
                        key={
                          data.firstName +
                          data.lastName +
                          data.gender +
                          data.location +
                          data.contactNumber +
                          data.emailAddress
                        }
                      >
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">
                            {data.firstName}
                          </div>
                        </td>
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">{data.lastName}</div>
                        </td>
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">{data.gender}</div>
                        </td>
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">{data.location}</div>
                        </td>
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">
                            {data.contactNumber}
                          </div>
                        </td>
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">
                            {data.emailAddress}
                          </div>
                        </td>
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">
                            {data.temperature}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : console.log("No attendee is registered in the database")}
            </tbody>
          ) : (
            <tbody className="old-attendee-table-tbody">
              {searchActive
                ? groupAttendee
                  ? groupAttendee.map(function (data) {
                      return (
                        <tr
                          className="old-attendee-table-tbody-tr"
                          key={data._id}
                        >
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">
                              {data.firstName}
                            </div>
                          </td>
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">
                              {data.lastName}
                            </div>
                          </td>
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">{data.gender}</div>
                          </td>
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">
                              {data.location}
                            </div>
                          </td>
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">
                              {data.contactNumber}
                            </div>
                          </td>
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="table-cells-div">
                              {data.emailAddress}
                            </div>
                          </td>
                          <td
                            className="old-attendee-table-tbody-tr-td"
                            align="center"
                          >
                            <div className="table-cells-div">
                              <span
                                onClick={() =>
                                  handleTemperature(
                                    data.firstName,
                                    data.lastName,
                                    data.gender,
                                    data.location,
                                    data.contactNumber,
                                    data.emailAddress
                                  )
                                }
                              >
                                <FaThermometerHalf />
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : console.log("No attendee is gotten from the search")
                : allAttendee
                ? allAttendee.map(function (data) {
                    return (
                      <tr
                        className="old-attendee-table-tbody-tr"
                        key={data._id}
                      >
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">
                            {data.firstName}
                          </div>
                        </td>
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">{data.lastName}</div>
                        </td>
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">{data.gender}</div>
                        </td>
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">{data.location}</div>
                        </td>
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">
                            {data.contactNumber}
                          </div>
                        </td>
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="table-cells-div">
                            {data.emailAddress}
                          </div>
                        </td>
                        <td
                          className="old-attendee-table-tbody-tr-td"
                          align="center"
                        >
                          <div className="table-cells-div">
                            <span
                              onClick={() =>
                                handleTemperature(
                                  data.firstName,
                                  data.lastName,
                                  data.gender,
                                  data.location,
                                  data.contactNumber,
                                  data.emailAddress
                                )
                              }
                            >
                              <FaThermometerHalf />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : console.log("No attendee is registered in the database")}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
