// Calling all necessary packages and libraries
import React, { useEffect, useState } from "react";
import "../../Assets/css/OldAttendee.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditServiceModal from "./components/EditSessionModal";
const { ipcRenderer } = window.require("electron");

export default function Analyzer() {
  // declaration of state variables
  const [allData, setAllData] = useState([]);
  /* const [genderData, setGenderData] = useState([]); */
  const [searchActive, setSearchActive] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [analysisDataAvailable, setAnalysisDataAvailable] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [editMale, setEditMale] = useState("");
  const [editFemale, setEditFemale] = useState("");
  const [editAttendeeNumber, setEditAttendeeNumber] = useState("");
  const [showModal, setShowModal] = useState(false);

  // react hook that starts first when component mounts
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      ipcRenderer.send("analysis-data");
      ipcRenderer.on("analysis-data-available-reply", async (event, arg) => {
        await setAnalysisDataAvailable(arg);
      });
      /*
            ipcRenderer.on('analysis-data-gender-reply', async (event, arg) => {
                await setGenderData(arg)
            })
            */
      ipcRenderer.on("analysis-data-reply", async (event, arg) => {
        await setAllData(arg);
      });
    }
    return () => (isSubscribed = false);
  }, []);

  const searchChange = (searchObject) => {
    const searchName = searchObject.target.value;

    if (searchName.length !== 0) {
      ipcRenderer.send("analysis-data-search", searchName);
      ipcRenderer.on("analysis-data-search-reply", (event, arg) => {
        setGroupData(arg);
      });
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  // expression to handle setting state variables to their respective inputs
  const handleEditService = (
    date,
    startTime,
    endTime,
    attendeeNumber,
    male,
    female
  ) => {
    setEditDate(date);
    setEditStartTime(startTime);
    setEditEndTime(endTime);
    setEditAttendeeNumber(attendeeNumber);
    setEditMale(male);
    setEditFemale(female);
    setShowModal(true);
  };

  // expression to send delete service command to backend
  const handleDeleteService = (date) => {
    ipcRenderer.send("delete-service", date);
  };

  // expression to close edit service modal
  const handleServiceClose = () => {
    setShowModal(false);
  };

  return (
    <div className="old-attendee-container">
      {/** edit service modal component call */}
      <EditServiceModal
        show={showModal}
        handleClose={() => handleServiceClose()}
        cDate={editDate}
        cStartTime={editStartTime}
        cEndTime={editEndTime}
        cAttendeeNumner={editAttendeeNumber}
        cMale={editMale}
        cFemale={editFemale}
      />
      <div className="edit-header">Analysis</div>
      {
        /** check if analysis data is available */
        analysisDataAvailable ? (
          <div>
            {/** search input div */}
            <div className="search-input-div">
              <input
                className="search-input"
                type="text"
                placeholder="Type something to search for date(s)"
                onChange={searchChange}
              />
            </div>
            {/** table div */}
            <div className="old-attendee-table-div">
              <table className="old-attendee-table" rules="all">
                <thead className="old-attendee-table-thread">
                  <tr className="old-attendee-table-thread-tr">
                    <th className="old-attendee-table-thread-tr-th" scope="col">
                      <div className="table-cells-div">Date</div>
                    </th>
                    <th className="old-attendee-table-thread-tr-th" scope="col">
                      <div className="table-cells-div">Start Time</div>
                    </th>
                    <th className="old-attendee-table-thread-tr-th" scope="col">
                      <div className="table-cells-div">End Time</div>
                    </th>
                    <th className="old-attendee-table-thread-tr-th" scope="col">
                      <div className="table-cells-div">Number of Attendees</div>
                    </th>
                    <th className="old-attendee-table-thread-tr-th" scope="col">
                      <div className="table-cells-div">Males</div>
                    </th>
                    <th className="old-attendee-table-thread-tr-th" scope="col">
                      <div className="table-cells-div">Females</div>
                    </th>

                    <th className="old-attendee-table-thread-tr-th" scope="col">
                      <div className="table-cells-div">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="old-attendee-table-tbody">
                  {
                    /** check if the search input is active or in use */
                    searchActive
                      ? groupData
                        ? groupData.map(function (data) {
                            return (
                              <tr
                                className="old-attendee-table-tbody-tr"
                                key={data._id}
                              >
                                <td className="old-attendee-table-tbody-tr-td">
                                  <div className="table-cells-div">
                                    {data._id}
                                  </div>
                                </td>
                                <td className="old-attendee-table-tbody-tr-td">
                                  <div className="table-cells-div">
                                    {data.start}
                                  </div>
                                </td>
                                <td className="old-attendee-table-tbody-tr-td">
                                  <div className="table-cells-div">
                                    {data.end}
                                  </div>
                                </td>
                                <td className="old-attendee-table-tbody-tr-td">
                                  <div className="table-cells-div">
                                    {data.attendeeeNum}
                                  </div>
                                </td>
                                <td className="old-attendee-table-tbody-tr-td">
                                  <div className="table-cells-div">
                                    {data.maleNum}
                                  </div>
                                </td>
                                <td className="old-attendee-table-tbody-tr-td">
                                  <div className="table-cells-div">
                                    {data.femaleNum}
                                  </div>
                                </td>
                                <td className="old-attendee-table-tbody-tr-td">
                                  {/** action buttons on the table */}
                                  <div className="edit-table-cells-div">
                                    <span
                                      className="action-icon-span"
                                      onClick={() =>
                                        handleEditService(
                                          data._id,
                                          data.start,
                                          data.end,
                                          data.attendeeeNum,
                                          data.maleNum,
                                          data.femaleNum
                                        )
                                      }
                                    >
                                      <FaEdit />
                                    </span>
                                    <span
                                      className="action-icon-span"
                                      onClick={() =>
                                        handleDeleteService(data._id)
                                      }
                                    >
                                      <FaTrashAlt />
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        : console.log("No attendee is gotten from the search")
                      : allData
                      ? allData.map(function (data) {
                          return (
                            <tr
                              className="old-attendee-table-tbody-tr"
                              key={data._id}
                            >
                              <td className="old-attendee-table-tbody-tr-td">
                                <div className="table-cells-div">
                                  {data._id}
                                </div>
                              </td>
                              <td className="old-attendee-table-tbody-tr-td">
                                <div className="table-cells-div">
                                  {data.start}
                                </div>
                              </td>
                              <td className="old-attendee-table-tbody-tr-td">
                                <div className="table-cells-div">
                                  {data.end}
                                </div>
                              </td>
                              <td className="old-attendee-table-tbody-tr-td">
                                <div className="table-cells-div">
                                  {data.attendeeeNum}
                                </div>
                              </td>
                              <td className="old-attendee-table-tbody-tr-td">
                                <div className="table-cells-div">
                                  {data.maleNum}
                                </div>
                              </td>
                              <td className="old-attendee-table-tbody-tr-td">
                                <div className="table-cells-div">
                                  {data.femaleNum}
                                </div>
                              </td>
                              <td className="old-attendee-table-tbody-tr-td">
                                <div className="edit-table-cells-div">
                                  {/** action buttons on the table */}
                                  <span
                                    className="action-icon-span"
                                    onClick={() =>
                                      handleEditService(
                                        data._id,
                                        data.start,
                                        data.end,
                                        data.attendeeeNum,
                                        data.maleNum,
                                        data.femaleNum
                                      )
                                    }
                                  >
                                    <FaEdit />
                                  </span>
                                  <span
                                    className="action-icon-span"
                                    onClick={() =>
                                      handleDeleteService(data._id)
                                    }
                                  >
                                    <FaTrashAlt />
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : console.log("No attendee is registered in the database")
                  }
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="no-data-available-div">
            {/** error to return if analysis data is not available */}
            <div className="no-data-available-text">
              {" "}
              <span role="img" aria-label="EyesDown">
                😔
              </span>{" "}
              Sorry, there is no service recorded in the database
            </div>
          </div>
        )
      }
    </div>
  );
}
