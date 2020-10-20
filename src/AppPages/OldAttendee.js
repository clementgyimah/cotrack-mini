import React, { useEffect, useState } from 'react';
import TemperatureModal from './TemperatureModal';
import "../Assets/css/OldAttendee.css";
import { FaThermometerHalf } from 'react-icons/fa';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
const { ipcRenderer } = window.require('electron');

export default function OldAttendee() {
  const [allAttendee, setAllAttendee] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [groupAttendee, setGroupAttendee] = useState([]);
  const [viewCurrentSession, setViewCurrentSession] = useState(true);
  const [currentSession, setCurrentSession] = useState("");
  const [allCurrentSessionAttendee, setAllCurrentSessionAttendee] = useState([]);
  const [showTempModal, setShowTempModal] = useState(false);
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentGender, setCurrentGender] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentContactNumber, setCurrentContactNumber] = useState("");
  const [currentEmailAddress, setCurrentEmailAddress] = useState("");
  const [timeHolder, setTimeHolder] = useState({});

  useEffect(() => {
    var isSubscribed = true
    if (isSubscribed) {
      ipcRenderer.send('old-attendee-all');
      ipcRenderer.on('old-attendee-all-reply', async (event, arg) => {
        await setAllAttendee(arg);
      })
      ipcRenderer.send('search-current-session');
      ipcRenderer.on('search-current-session-reply', async (event, arg) => {
        await setCurrentSession(arg);
      })
      ipcRenderer.send('old-attendee-current-session-all');
      ipcRenderer.on('sessionTime-reply', async (event, arg) => {
        await setTimeHolder(arg);
      })
      ipcRenderer.on('old-attendee-current-session-all-reply', async (event, arg) => {
        await setAllCurrentSessionAttendee(arg);
      })
    }
    return () => isSubscribed = false
  }, [viewCurrentSession])

  const searchChange = searchObject => {
    const searchName = searchObject.target.value;
    if (viewCurrentSession) {
      if (searchName.length !== 0) {
        ipcRenderer.send('old-attendee-current-session-name', searchName);
        ipcRenderer.on('old-attendee-current-session-name-reply', (event, arg) => {
          setGroupAttendee(arg);
        })
        setSearchActive(true)
      }
      else {
        setSearchActive(false)
      }
    }
    else {
      if (searchName.length !== 0) {
        ipcRenderer.send('old-attendee-name', searchName);
        ipcRenderer.on('old-attendee-name-reply', (event, arg) => {
          setGroupAttendee(arg);
        })
        setSearchActive(true)
      }
      else {
        setSearchActive(false)
      }
    }
  }

  const handleTemperature = (firstName, lastName, gender, location, contactNumber, emailAddress) => {
    setCurrentFirstName(firstName);
    setCurrentLastName(lastName);
    setCurrentGender(gender);
    setCurrentLocation(location);
    setCurrentContactNumber(contactNumber);
    setCurrentEmailAddress(emailAddress);
    setShowTempModal(true);
  }

  const closeTempModal = () => {
    setShowTempModal(false);
  }

  const viewCurrentSessionFunc = () => {
    setViewCurrentSession(!viewCurrentSession);
  }

  return (
    <div className="old-attendee-container">
      <TemperatureModal show={showTempModal} handleClose={() => closeTempModal()} cFirstName={currentFirstName} cLastName={currentLastName} cGender={currentGender} cLocation={currentLocation} cContactNumber={currentContactNumber} cEmailAddress={currentEmailAddress} />
      <div className="search-input-div">
        <input className="search-input" type="text"
          placeholder="Type something to search list items"
          onChange={searchChange} />
      </div>
      <div className="type-of-table">
        <span className="type-of-table-title">Active Date ( {currentSession} ): </span>
        <span className="type-of-table-toggle-span" onClick={() => viewCurrentSessionFunc()}>{viewCurrentSession ? <BsToggleOn className="type-of-table-toggle-on" size={30} color="#387C44" /> : <BsToggleOff className="type-of-table-toggle-off" size={30} color="#387C44" />}</span>
      </div>
      <div className="time-div">
        <div className="specific-time-div">Start Time: {timeHolder.start}</div>
        <div className="specific-time-div">End Time: {timeHolder.end}</div>
      </div>
      <div className="old-attendee-table-div">
        <table className="old-attendee-table" rules="all">
          <thead className="old-attendee-table-thread">
            <tr className="old-attendee-table-thread-tr">
              <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">First Name</div></th>
              <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Last Name</div></th>
              <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Gender</div></th>
              <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Location</div></th>
              <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Contact Number</div></th>
              <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Email Address</div></th>
              <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Temperature</div></th>
            </tr>
          </thead>
          {
            viewCurrentSession ?
              <tbody className="old-attendee-table-tbody">
                {
                  searchActive ? (
                    groupAttendee ?
                      groupAttendee.map(function (data) {
                        return (
                          <tr className="old-attendee-table-tbody-tr" key={data.firstName + data.lastName + data.gender + data.location + data.contactNumber + data.emailAddress}>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.firstName}</div></td>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.lastName}</div></td>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.gender}</div></td>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.location}</div></td>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.contactNumber}</div></td>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.emailAddress}</div></td>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.temperature}</div></td>
                          </tr>
                        )
                      })
                      :
                      console.log("No attendee is gotten from the search")
                  )
                    :
                    (
                      allCurrentSessionAttendee ?
                        allCurrentSessionAttendee.map(function (data) {
                          return (
                            <tr className="old-attendee-table-tbody-tr" key={data.firstName + data.lastName + data.gender + data.location + data.contactNumber + data.emailAddress}>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.firstName}</div></td>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.lastName}</div></td>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.gender}</div></td>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.location}</div></td>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.contactNumber}</div></td>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.emailAddress}</div></td>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.temperature}</div></td>
                            </tr>
                          )
                        })
                        :
                        console.log("No attendee is registered in the database")
                    )
                }
              </tbody>
              :
              <tbody className="old-attendee-table-tbody">
                {
                  searchActive ? (
                    groupAttendee ?
                      groupAttendee.map(function (data) {
                        return (
                          <tr className="old-attendee-table-tbody-tr" key={data._id}>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.firstName}</div></td>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.lastName}</div></td>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.gender}</div></td>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.location}</div></td>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.contactNumber}</div></td>
                            <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.emailAddress}</div></td>
                            <td className="old-attendee-table-tbody-tr-td" align="center">
                              <div className="table-cells-div">
                                <span onClick={() => handleTemperature(data.firstName, data.lastName, data.gender, data.location, data.contactNumber, data.emailAddress)}><FaThermometerHalf /></span>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                      :
                      console.log("No attendee is gotten from the search")
                  )
                    :
                    (
                      allAttendee ?
                        allAttendee.map(function (data) {
                          return (
                            <tr className="old-attendee-table-tbody-tr" key={data._id}>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.firstName}</div></td>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.lastName}</div></td>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.gender}</div></td>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.location}</div></td>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.contactNumber}</div></td>
                              <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.emailAddress}</div></td>
                              <td className="old-attendee-table-tbody-tr-td" align="center">
                                <div className="table-cells-div">
                                  <span onClick={() => handleTemperature(data.firstName, data.lastName, data.gender, data.location, data.contactNumber, data.emailAddress)}><FaThermometerHalf /></span>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                        :
                        console.log("No attendee is registered in the database")
                    )
                }
              </tbody>
          }
        </table>
      </div>
    </div>
  )
}
