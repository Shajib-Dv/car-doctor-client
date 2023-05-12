/** @format */

import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const CheckOut = () => {
  const service = useLoaderData();
  const { title, img, price, _id } = service;
  const { user } = useContext(AuthContext);
  const handleBooking = (e) => {
    e.preventDefault();
    const from = e.target;
    const clientName = from.name.value;
    const email = from.email.value;
    const date = from.date.value;
    const amount = from.amount.value;
    const booking = {
      clientName,
      email,
      date,
      amount,
      img: img,
      price: price,
      serviceName: title,
      serviceId: _id,
    };
    // console.log(booking);

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          alert("Order done");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <h2 className="text-4xl text-center font-bold py-2">
        Book Service: {title}
      </h2>
      <form onSubmit={handleBooking}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                placeholder="Your name"
                name="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <input
                type="text"
                name="email"
                defaultValue={user?.email}
                placeholder="Your email"
                className="input input-bordered"
              />
            </div>
          </div>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                name="date"
                placeholder="Date"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="text"
                name="amount"
                placeholder="$0.00"
                readOnly
                defaultValue={"$" + price}
                className="input input-bordered"
              />
            </div>
          </div>
        </div>
        <div>
          <input
            className="btn my-4 w-full bg-[#f5430d]"
            type="submit"
            value="Order Confirm"
          />
        </div>
      </form>
    </>
  );
};

export default CheckOut;
