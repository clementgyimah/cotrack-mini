import React, { useState, useEffect } from 'react';
import '../Assets/css/OldAttendee.css';
import EditAttendeeModal from './EditAttendeeModal';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
const { ipcRenderer } = window.require('electron');

export default function EditPage() {
  const [allAttendee, setAllAttendee] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [groupAttendee, setGroupAttendee] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editContactNumber, setEditContactNumber] = useState("");
  const [editEmailAddress, setEditEmailAddress] = useState("");

  useEffect(() => {
    var isSubscribed = true
    if (isSubscribed) {
      ipcRenderer.send('old-attendee-all');
      ipcRenderer.on('old-attendee-all-reply', async (event, arg) => {
        await setAllAttendee(arg);
      })
    }
    return () => isSubscribed = false
  }, [])

  const searchChange = searchObject => {
    const searchName = searchObject.target.value;

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

  const handleEdit = (id, firstName, lastName, gender, location, contactNumber, emailAddress) => {
    setEditId(id)
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setEditGender(gender);
    setEditLocation(location);
    setEditContactNumber(contactNumber);
    setEditEmailAddress(emailAddress);
    setShowEditModal(true);
  }

  const closeTempModal = () => {
    setShowEditModal(false);
  }

  const handleDelete = (id) => {
    ipcRenderer.send('delete-attendee', id);
  }

  return (
    <div className="old-attendee-container">
      <EditAttendeeModal show={showEditModal} handleClose={() => closeTempModal()} cId={editId} cFirstName={editFirstName} cLastName={editLastName} cGender={editGender} cLocation={editLocation} cContactNumber={editContactNumber} cEmailAddress={editEmailAddress} />
      <div className="edit-header">Edit Attendee</div>
      <div className="search-input-div">
        <input className="search-input" type="text"
          placeholder="Type something to search list items"
          onChange={searchChange} />
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
              <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Action</div></th>
            </tr>
          </thead>
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
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="edit-table-cells-div">
                            <span className="action-icon-span" onClick={() => handleEdit(data._id, data.firstName, data.lastName, data.gender, data.location, data.contactNumber, data.emailAddress)}><FaEdit /></span>
                            <span className="action-icon-span" onClick={() => handleDelete(data._id)}><FaTrashAlt /></span>
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
                          <td className="old-attendee-table-tbody-tr-td">
                            <div className="edit-table-cells-div">
                              <span className="action-icon-span" onClick={() => handleEdit(data._id, data.firstName, data.lastName, data.gender, data.location, data.contactNumber, data.emailAddress)}><FaEdit /></span>
                              <span className="action-icon-span" onClick={() => handleDelete(data._id)}><FaTrashAlt /></span>
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
        </table>
      </div>
    </div>
  )
}
