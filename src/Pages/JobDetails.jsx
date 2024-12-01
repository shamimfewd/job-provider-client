import { useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { user } = useContext(AuthContext);
  const loadedData = useLoaderData();
  const [startDate, setStartDate] = useState(new Date());

  const {
    _id,
    jobTitle,
    buyerEmail,
    category,
    deadline,
    description,
    minPrice,
    maxPrice,
  } = loadedData || {};

  const handleFormSubmission = async (e) => {
    if (user?.email === buyerEmail) return toast.error("Action not Permuted");
    e.preventDefault();
    const form = e.target;
    const jobId = _id;
    const price = parseFloat(form.price.value);

    if (price < parseFloat(minPrice)) {
      return toast.error("Offer more or at least equal to minimum price");
    } else if (price > parseFloat(maxPrice)) {
      return toast.error("Offer less or most to maximum price");
    }

    const comment = form.comment.value;
    const userEmail = user?.email;
    const deadline = startDate;
    const status = "Pending";

    const bidData = {
      jobId,
      price,
      comment,
      userEmail,
      buyerEmail,
      status,
      deadline,
      category,
    };

    try {
      const { data } = await axios.post("http://localhost:5000/bid", bidData);
      // if (data.insertedId) {
      //   alert("ok");
      // }

      alert("ok");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 ">
            Deadline: 12/08/2024
          </span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            Web Development
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {jobTitle}
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">{description} </p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Buyer Details:{buyerEmail}
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm  text-gray-600 ">Name: Jhankar Vai.</p>
              <p className="mt-2 text-sm  text-gray-600 ">
                Email: jhankar@mahbub.com
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img src="" alt="" />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: ${minPrice} - ${maxPrice}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className="p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Place A Bid
        </h2>

        <form onSubmit={handleFormSubmission}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="text"
                name="price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                defaultValue={user?.email}
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded-md outline-none"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;
