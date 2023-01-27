import React from "react";
import "../assets/css/TableCompBody.css";
import { FaThermometerHalf } from "react-icons/fa";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const TableCompBody = (props) => {
  const { data, viewCurrentSession, handleTemperature, type, handleDelete } =
    props;

  return (
    <tr className="table-tbody-tr" key={data._id}>
      <td className="table-tbody-tr-td">
        <div className="table-cells-div">{data.firstName}</div>
      </td>
      <td className="table-tbody-tr-td">
        <div className="table-cells-div">{data.lastName}</div>
      </td>
      <td className="table-tbody-tr-td">
        <div className="table-cells-div">{data.gender}</div>
      </td>
      <td className="table-tbody-tr-td">
        <div className="table-cells-div">{data.location}</div>
      </td>
      <td className="table-tbody-tr-td">
        <div className="table-cells-div">{data.contactNumber}</div>
      </td>
      <td className="table-tbody-tr-td">
        <div className="table-cells-div">{data.emailAddress}</div>
      </td>
      {viewCurrentSession ? (
        <td className="table-tbody-tr-td">
          <div className="table-cells-div">{data.temperature}</div>
        </td>
      ) : type === "record" ? (
        <td className="table-tbody-tr-td" align="center">
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
      ) : (
        <td className="old-attendee-table-tbody-tr-td">
          <div className="edit-table-cells-div">
            <span
              className="action-icon-span"
              onClick={() =>
                handleTemperature(
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
      )}
    </tr>
  );
};
