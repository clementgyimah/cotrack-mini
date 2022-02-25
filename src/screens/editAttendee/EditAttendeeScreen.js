// Calling all necessary packages and libraries
import React, { useState, useEffect } from "react";
import "../../assets/css/OldAttendee.css";
import EditAttendeeModal from "./components/EditAttendeeModal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
const { ipcRenderer } = window.require("electron");

export default function EditPage() {
  // declaration of state variables
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
  const [addNewAttendee, setAddNewAttendee] = useState(false);

  // react hook that starts first when component mounts
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      ipcRenderer.send("old-attendee-all");
      ipcRenderer.on("old-attendee-all-reply", async (event, arg) => {
        await setAllAttendee(arg);
      });
    }
    return () => (isSubscribed = false);
  }, []);

  // expression to handle contacting backend when the search input is active
  const searchChange = (searchObject) => {
    const searchName = searchObject.target.value;

    if (searchName.length !== 0) {
      ipcRenderer.send("old-attendee-name", searchName);
      ipcRenderer.on("old-attendee-name-reply", (event, arg) => {
        setGroupAttendee(arg);
      });
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  // expression to handle setting the state variables to their respective inputs
  const handleEdit = (
    id,
    firstName,
    lastName,
    gender,
    location,
    contactNumber,
    emailAddress
  ) => {
    setEditId(id);
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setEditGender(gender);
    setEditLocation(location);
    setEditContactNumber(contactNumber);
    setEditEmailAddress(emailAddress);
    setAddNewAttendee(false);
    setShowEditModal(true);
  };

  // expression to handle closing the edit modal
  const closeTempModal = () => {
    setShowEditModal(false);
  };

  // expression to prompt backend to delete a certain attendee
  const handleDelete = (id) => {
    ipcRenderer.send("delete-attendee", id);
  };

  // expression to open Edit Attendee modal and add a new attendee
  const openAddNewAttendeeModal = () => {
    setEditId("");
    setEditFirstName("");
    setEditLastName("");
    setEditGender("");
    setEditLocation("");
    setEditContactNumber("");
    setEditEmailAddress("");
    setAddNewAttendee(true);
    setShowEditModal(true);
  };

  return (
    <div className="old-attendee-container">
      {/** edit attendee modal component call */}
      <EditAttendeeModal
        show={showEditModal}
        newAttendeeAdd={addNewAttendee}
        handleClose={() => closeTempModal()}
        cId={editId}
        cFirstName={editFirstName}
        cLastName={editLastName}
        cGender={editGender}
        cLocation={editLocation}
        cContactNumber={editContactNumber}
        cEmailAddress={editEmailAddress}
      />
      <div className="edit-header">Edit Attendee</div>
      {/** search input div */}
      <div className="search-input-div">
        <input
          className="search-input"
          type="text"
          placeholder="Type name to search for attendee(s)"
          onChange={searchChange}
        />
      </div>
      {/** add new attendee div */}
      <div className="add-new-attendee-button-div">
        <div
          onClick={() => openAddNewAttendeeModal()}
          className="add-new-attendee-button"
        >
          + Add Attendee
        </div>
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
                <div className="table-cells-div">Action</div>
              </th>
            </tr>
          </thead>
          <tbody className="old-attendee-table-tbody">
            {
              /** check if the search input is active or in use */
              searchActive
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
                          <td className="old-attendee-table-tbody-tr-td">
                            {/** action buttons on the table */}
                            <div className="edit-table-cells-div">
                              <span
                                className="action-icon-span"
                                onClick={() =>
                                  handleEdit(
                                    data._id,
                                    data.firstName,
                                    data.lastName,
                                    data.gender,
                                    data.location,
                                    data.contactNumber,
                                    data.emailAddress
                                  )
                                }
                              >
                                <FaEdit />
                              </span>
                              <span
                                className="action-icon-span"
                                onClick={() => handleDelete(data._id)}
                              >
                                <FaTrashAlt />
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
                        <td className="old-attendee-table-tbody-tr-td">
                          <div className="edit-table-cells-div">
                            <span
                              className="action-icon-span"
                              onClick={() =>
                                handleEdit(
                                  data._id,
                                  data.firstName,
                                  data.lastName,
                                  data.gender,
                                  data.location,
                                  data.contactNumber,
                                  data.emailAddress
                                )
                              }
                            >
                              <FaEdit />
                            </span>
                            <span
                              className="action-icon-span"
                              onClick={() => handleDelete(data._id)}
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
  );
}
