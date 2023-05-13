/** @format */

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import BookingTable from "./Home/BookingTable";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("jwt-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBookings(data);
        } else {
          navigate("/", { replace: true });
        }
      })
      .catch((error) => console.log(error));
  }, [deleted]);
  //   console.log(bookings);
  return (
    <>
      <h2 className="text-4xl text-center font-bold py-4">Your Bookings</h2>
      <div className="overflow-x-auto w-full my-10">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings?.map((booking) => (
                <BookingTable
                  key={booking._id}
                  booking={booking}
                  setDeleted={setDeleted}
                  deleted={deleted}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bookings;
