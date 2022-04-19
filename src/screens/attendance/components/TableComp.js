import React from 'react';

export const TableComp = (props) => {

  const { editColTitle } = props;

  return (
    /** table div */
    <div className="table-div">
      <table className="table" rules="all">
        <thead className="old-attendee-table-thread">
          <tr className="old-attendee-table-thread-tr">
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
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.firstName}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.lastName}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">{data.gender}</div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.location}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.contactNumber}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.emailAddress}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
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
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.firstName}
                        </div>
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
                        <div className="table-cells-div">
                          {data.contactNumber}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.emailAddress}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
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
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.firstName}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.lastName}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">{data.gender}</div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.location}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.contactNumber}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.emailAddress}
                        </div>
                      </td>
                      <td
                        className="table-tbody-tr-td"
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
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.firstName}
                        </div>
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
                        <div className="table-cells-div">
                          {data.contactNumber}
                        </div>
                      </td>
                      <td className="table-tbody-tr-td">
                        <div className="table-cells-div">
                          {data.emailAddress}
                        </div>
                      </td>
                      <td
                        className="table-tbody-tr-td"
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
  )
}
