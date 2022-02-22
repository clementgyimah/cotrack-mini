// Calling all necessary packages and libraries
import React, { useState, useEffect } from "react";
import "../../../assets/css/Modal.css";
import PropTypes from "prop-types";
const { ipcRenderer } = window.require("electron");

export default function EditServiceModal(props) {
  // declaration of state variables
  const showEditModal = props.show
    ? "modal display-block"
    : "modal display-none";
  const [invalidDetails, setInvalidDetails] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [editAttendeeNumber, setEditAttendeeNumber] = useState("");
  const [editMale, setEditMale] = useState("");
  const [editFemale, setEditFemale] = useState("");
  /**
   * react hook that starts first when component mounts
   * or any of the varibales in the array changes
   */
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      setEditDate(props.cDate);
      setEditStartTime(props.cStartTime);
      setEditEndTime(props.cEndTime);
      setEditAttendeeNumber(props.cAttendeeNumner);
      setEditMale(props.cMale);
      setEditFemale(props.cFemale);
    }
    return () => (isSubscribed = false);
  }, [
    props.cDate,
    props.cStartTime,
    props.cEndTime,
    props.cAttendeeNumner,
    props.cMale,
    props.cFemale,
    showEditModal,
  ]);

  // expression to handle sending edited service detail(s) to backend
  const handleEditDetails = () => {
    if (editStartTime.length === 0 || editEndTime.length === 0) {
      setInvalidDetails(true);
    } else {
      const serviceData = {
        editDate,
        editStartTime,
        editEndTime,
      };
      ipcRenderer.send("edit-service-details", serviceData);
      return props.handleClose();
    }
  };

  // expressions to monitor input values during the editing
  const editStartTimeFunc = (e) => {
    setEditStartTime(e.target.value);
    setInvalidDetails(false);
  };
  const editEndTimeFunc = (e) => {
    setEditEndTime(e.target.value);
    setInvalidDetails(false);
  };

  // expression to handle closing the edit service modal
  const handleCloseModal = () => {
    setInvalidDetails(false);
    return props.handleClose();
  };

  return (
    <div className={showEditModal}>
      <div className="modal-main">
        <div className="record-temperature-div">Edit Sevice Details</div>
        {
          /** check if all inputs are correct */
          invalidDetails ? (
            <div className="record-temp-error">
              Oops!{" "}
              <span role="img" aria-label="EyesGlass">
                🧐
              </span>{" "}
              Make sure all inputs are correct
            </div>
          ) : (
            <div></div>
          )
        }
        {/** form inputs and labels */}
        <div className="attendee-info-div">
          <div className="details-div">
            <label htmlFor="service-label-for-date" className="label-span">
              Date:{" "}
            </label>
            <span id="service-label-for-date" className="detail-span">
              {editDate}
            </span>
          </div>
          <div className="details-div">
            <label htmlFor="service-label-for-start" className="label-span">
              Start Time:{" "}
            </label>
            <input
              type="time"
              id="service-label-for-start"
              className="edit-attendee-input-text"
              placeholder="Start Time"
              value={editStartTime}
              onChange={editStartTimeFunc}
            />
          </div>
          <div className="details-div">
            <label htmlFor="service-label-for-end" className="label-span">
              End Time:{" "}
            </label>
            <input
              type="time"
              id="service-label-for-end"
              className="edit-attendee-input-text"
              placeholder="End Time"
              value={editEndTime}
              onChange={editEndTimeFunc}
            />
          </div>
          <div className="details-div">
            <label htmlFor="service-label-for-number" className="label-span">
              Number of Attendees:{" "}
            </label>
            <span id="service-label-for-number" className="detail-span">
              {editAttendeeNumber}
            </span>
          </div>
          <div className="details-div">
            <label htmlFor="service-label-for-number" className="label-span">
              Males:{" "}
            </label>
            <span id="service-label-for-number" className="detail-span">
              {editMale}
            </span>
          </div>
          <div className="details-div">
            <label htmlFor="service-label-for-number" className="label-span">
              Females:{" "}
            </label>
            <span id="service-label-for-number" className="detail-span">
              {editFemale}
            </span>
          </div>
        </div>
        <div className="buttons-div">
          <span className="save-button" onClick={() => handleEditDetails()}>
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

EditServiceModal.propTypes = {
  cDate: PropTypes.string.isRequired,
  cStartTime: PropTypes.string.isRequired,
  cEndTime: PropTypes.string.isRequired,
  cAttendeeNumner: PropTypes.string.isRequired,
  cMale: PropTypes.string.isRequired,
  cFemale: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
