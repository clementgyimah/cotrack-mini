import React, { useState, useEffect } from 'react';
import '../Assets/css/Modal.css';
const { ipcRenderer } = window.require('electron');

export default function EditAttendeeModal(props) {
    const showEditModal = props.show ? 'modal display-block' : 'modal display-none';
    const [invalidDetails, setInvalidDetails] = useState(false);
    const [editDate, setEditDate] = useState("");
    const [editStartTime, setEditStartTime] = useState("");
    const [editEndTime, setEditEndTime] = useState("");
    const [editAttendeeNumber, setEditAttendeeNumber] = useState("");

    useEffect(() => {
        var isSubscribed = true;
        if (isSubscribed) {
            setEditDate(props.cDate);
            setEditStartTime(props.cStartTime);
            setEditEndTime(props.cEndTime);
            setEditAttendeeNumber(props.cAttendeeNumner);
        }
        return () => isSubscribed = false;
    }, [props.cDate, props.cStartTime, props.cEndTime, props.cAttendeeNumner, showEditModal])

    const handleEditDetails = () => {
        if (editDate.length === 0 || editStartTime.length === 0 || editEndTime.length === 0 || editAttendeeNumber.length === 0) {
            setInvalidDetails(true);
        }
        else {
            const serviceData = {
                editDate,
                editStartTime,
                editEndTime,
                editAttendeeNumber
            }
            ipcRenderer.send('edit-service-details', serviceData);
            return props.handleClose();
        }
    }

    const editStartTimeFunc = (e) => {
        setEditStartTime(e.target.value);
        setInvalidDetails(false);
    }
    const editEndTimeFunc = (e) => {
        setEditEndTime(e.target.value);
        setInvalidDetails(false);
    }

    const handleCloseModal = () => {
        setInvalidDetails(false);
        return props.handleClose();
    }

    return (
        <div className={showEditModal}>
            <div className="modal-main">
                <div className="record-temperature-div">Edit Sevice Details</div>
                {
                    invalidDetails ?
                        <div className="record-temp-error">Oops! <span role="img" aria-label="EyesGlass">🧐</span> Make sure all inputs are correct</div>
                        :
                        <div></div>
                }
                <div className="attendee-info-div">
                    <div className="details-div"><label htmlFor="service-label-for-date" className="label-span">Date: </label><span id="service-label-for-date" className="detail-span">{editDate}</span></div>
                    <div className="details-div"><label htmlFor="service-label-for-start" className="label-span">Start Time: </label><input type="time" id="service-label-for-start" className="edit-attendee-input-text" placeholder="Start Time" value={editStartTime} onChange={editStartTimeFunc} /></div>
                    <div className="details-div"><label htmlFor="service-label-for-end" className="label-span">End Time: </label><input type="time" id="service-label-for-end" className="edit-attendee-input-text" placeholder="End Time" value={editEndTime} onChange={editEndTimeFunc} /></div>
                    <div className="details-div"><label htmlFor="service-label-for-number" className="label-span">Number of Attendees: </label><span id="service-label-for-number" className="detail-span">{editAttendeeNumber}</span></div>

                </div>
                <div className="buttons-div">
                    <span className="save-button" onClick={() => handleEditDetails()}>Save</span><span className="close-button" onClick={() => handleCloseModal()}>Close</span>
                </div>
            </div>

        </div>
    );
}