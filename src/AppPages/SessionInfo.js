//Calling all necessary packages and libraries
import React, { useState, useEffect } from 'react';
import "../Assets/css/SessionInfo.css";
const { ipcRenderer } = window.require('electron');

//renderer process to listen to backend after PDF download is done
ipcRenderer.on('pdf-printed', async (event, arg) => {
  return alert("😁 PDF Downloaded!!!\n\nCheck the path below on your computer file system:\n" + arg);
})

export default function SessionInfo() {
  //declaration of state variables
  const [sessionHolder, setSessionHolder] = useState([]);
  const [dateHolder, setDateHolder] = useState("");
  const [timeHolder, setTimeHolder] = useState({});
  const [totalHolder, setTotalHolder] = useState("");
  const [maleHolder, setMaleHolder] = useState("");
  const [femaleHolder, setFemaleHolder] = useState("");

  useEffect(() => {
    //react hook that starts first when component mounts
    var isSubscribed = true
    if (isSubscribed) {
      ipcRenderer.send('view-old-attendee-current-session-all');
      ipcRenderer.on('view-sessionTime-reply', async (event, arg) => {
        await setTimeHolder(arg);
      })
      ipcRenderer.on('view-old-attendee-current-session-all-reply', async (event, arg) => {
        await setSessionHolder(arg);
      })
      ipcRenderer.send('search-tempDate');
      ipcRenderer.on('search-tempDate-reply', async (event, arg) => {
        if (arg) {
          await setDateHolder(arg.theTempDate);
          await setTotalHolder(arg.theTotal);
          await setMaleHolder(arg.theMales);
          setFemaleHolder(arg.theFemales)
        }
      })
    }

    return () => isSubscribed = false
  }, [])

  return (
    <div className="session-info-container">
      <div className="session-info-header">
        Date: {dateHolder}
      </div>
      <div className="session-info-body">
        {
          sessionHolder.length !== 0 ?
            (
              <div>
                <div className="time-div">
                  <div className="specific-number-div">Total: {totalHolder}</div>
                  <div className="specific-number-div">Males: {maleHolder}</div>
                  <div className="specific-number-div">Females: {femaleHolder}</div>
                </div>
                <div className="time-div">
                  <div className="view-time-div">Start Time: {timeHolder.start}</div>
                  <div className="view-time-div">End Time: {timeHolder.end}</div>
                </div>
                {/**table div */}
                <div className="main-table-container">
                <div className="session-info-table-div">
                  <table className="session-info-table" rules="all">
                    <thead className="session-info-table-thread">
                      <tr className="session-info-table-thread-tr">
                        <th className="session-info-table-thread-tr-th" scope="col"><div className="session-table-cells-div">First Name</div></th>
                        <th className="session-info-table-thread-tr-th" scope="col"><div className="session-table-cells-div">Last Name</div></th>
                        <th className="session-info-table-thread-tr-th" scope="col"><div className="session-table-cells-div">Gender</div></th>
                        <th className="session-info-table-thread-tr-th" scope="col"><div className="session-table-cells-div">Location</div></th>
                        <th className="session-info-table-thread-tr-th" scope="col"><div className="session-table-cells-div">Contact Number</div></th>
                        <th className="session-info-table-thread-tr-th" scope="col"><div className="session-table-cells-div">Email Address</div></th>
                        <th className="session-info-table-thread-tr-th" scope="col"><div className="session-table-cells-div">Temperature</div></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sessionHolder ?
                          sessionHolder.map((newHolderAttendee) => {
                            return (
                              <tr className="session-info-table-tbody-tr" key={newHolderAttendee.firstName + newHolderAttendee.lastName + newHolderAttendee.gender + newHolderAttendee.location + newHolderAttendee.contactNumber + newHolderAttendee.emailAddress + newHolderAttendee.temperature}>
                                <td className="session-info-table-tbody-tr-td"><div className="session-table-cells-div">{newHolderAttendee.firstName}</div></td>
                                <td className="session-info-table-tbody-tr-td"><div className="session-table-cells-div">{newHolderAttendee.lastName}</div></td>
                                <td className="session-info-table-tbody-tr-td"><div className="session-table-cells-div">{newHolderAttendee.gender}</div></td>
                                <td className="session-info-table-tbody-tr-td"><div className="session-table-cells-div">{newHolderAttendee.location}</div></td>
                                <td className="session-info-table-tbody-tr-td"><div className="session-table-cells-div">{newHolderAttendee.contactNumber}</div></td>
                                <td className="session-info-table-tbody-tr-td"><div className="session-table-cells-div">{newHolderAttendee.emailAddress}</div></td>
                                <td className="session-info-table-tbody-tr-td"><div className="session-table-cells-div">{newHolderAttendee.temperature}</div></td>
                              </tr>
                            )
                          }) :
                          <tr></tr>
                      }
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            )
            :
            <div className="no-sessions-found-div">
              {/**error to return when no session is recorded for the date whose information is being searched */}
              <div className="no-sessions-found-text"> <span role="img" aria-label="EyesDown">😔</span> Sorry, there wasn't any recorded sessions on this date</div>
            </div>
        }
      </div>
    </div>
  )
}
