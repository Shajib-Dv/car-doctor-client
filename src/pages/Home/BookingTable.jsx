/** @format */

import React from "react";

const BookingTable = ({ booking, setDeleted, deleted }) => {
  const { _id, img, price, date, serviceName, status } = booking;
  //   console.log(booking);
  const handleDelete = (id) => {
    const isDelete = confirm("Do you want to delete");
    if (isDelete) {
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setDeleted(!deleted);
          if (data.deletedCount > 0) {
            alert("Done");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleConfirm = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setDeleted(!deleted);
          booking.status = true;
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <tr>
        <td>
          <button onClick={() => handleDelete(_id)} className="btn btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={img} />
              </div>
            </div>
          </div>
        </td>
        <td>{serviceName}</td>
        <th>{date}</th>
        <td>${price}</td>
        <td>
          {status ? (
            <button className="btn btn-sm">Confirmed</button>
          ) : (
            <button onClick={() => handleConfirm(_id)} className="btn-sm btn">
              Confirm
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default BookingTable;
