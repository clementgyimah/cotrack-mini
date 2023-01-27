import React from "react";
import "../assets/css/TableComp.css";
import { TableCompBody } from "./TableCompBody";

export const TableComp = (props) => {
  const {
    viewCurrentSession,
    searchActive,
    groupAttendee,
    allCurrentSessionAttendee,
    allAttendee,
    handleTemperature,
    type,
    handleDelete,
  } = props;

  return (
    /** table div */
    <div className="table-div">
      <table className="table" rules="all">
        <thead className="table-thread">
          <tr className="table-thread-tr">
            <th className="table-thread-tr-th" scope="col">
              <div className="table-cells-div">First Name</div>
            </th>
            <th className="table-thread-tr-th" scope="col">
              <div className="table-cells-div">Last Name</div>
            </th>
            <th className="table-thread-tr-th" scope="col">
              <div className="table-cells-div">Gender</div>
            </th>
            <th className="table-thread-tr-th" scope="col">
              <div className="table-cells-div">Location</div>
            </th>
            <th className="table-thread-tr-th" scope="col">
              <div className="table-cells-div">Contact Number</div>
            </th>
            <th className="table-thread-tr-th" scope="col">
              <div className="table-cells-div">Email Address</div>
            </th>
            <th className="table-thread-tr-th" scope="col">
              <div className="table-cells-div">
                {viewCurrentSession ? "Temperature" : "Action"}
              </div>
            </th>
          </tr>
        </thead>
        {viewCurrentSession ? (
          <tbody className="table-tbody">
            {searchActive
              ? groupAttendee
                ? groupAttendee.map(function (data) {
                    return (
                      <TableCompBody
                        data={data}
                        viewCurrentSession={viewCurrentSession}
                        handleTemperature={handleTemperature}
                        type={type}
                        handleDelete={handleDelete}
                      />
                    );
                  })
                : console.log("No attendee is gotten from the search")
              : allCurrentSessionAttendee
              ? allCurrentSessionAttendee.map(function (data) {
                  return (
                    <TableCompBody
                      data={data}
                      viewCurrentSession={viewCurrentSession}
                      handleTemperature={handleTemperature}
                      type={type}
                      handleDelete={handleDelete}
                    />
                  );
                })
              : console.log("No attendee is registered in the database")}
          </tbody>
        ) : (
          <tbody className="table-tbody">
            {searchActive
              ? groupAttendee
                ? groupAttendee.map(function (data) {
                    return (
                      <TableCompBody
                        data={data}
                        viewCurrentSession={viewCurrentSession}
                        handleTemperature={handleTemperature}
                        type={type}
                        handleDelete={handleDelete}
                      />
                    );
                  })
                : console.log("No attendee is gotten from the search")
              : allAttendee
              ? allAttendee.map(function (data) {
                  return (
                    <TableCompBody
                      data={data}
                      viewCurrentSession={viewCurrentSession}
                      handleTemperature={handleTemperature}
                      type={type}
                      handleDelete={handleDelete}
                    />
                  );
                })
              : console.log("No attendee is registered in the database")}
          </tbody>
        )}
      </table>
    </div>
  );
};
