import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Provider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateJob = () => {
  const { user } = useContext(AuthContext);
  const job = useLoaderData();

  console.log(user);
  const [startDate, setStartDate] = useState(
    // eslint-disable-next-line no-constant-binary-expression
    new Date(job.deadline) || new Date()
  );
  const navigate = useNavigate();

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const form = e.target;
    const jobTitle = form.jobTitle.value;
    const email = form.email.value;
    const minPrice = parseFloat(form.minPrice.value);
    const maxPrice = parseFloat(form.maxPrice.value);
    const description = form.description.value;
    const category = form.category.value;

    // Create the bidData object
    const jobData = {
      jobTitle,
      minPrice,
      maxPrice,
      deadline: startDate,
      description,
      category,
      buyer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    };

    console.log(jobData);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/job/${job._id}`,
        jobData
      );
      navigate("/my-posted-job");
      toast.success("update is successful");
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while posting the job");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-2 md:p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Update a Job
        </h2>

        <form onSubmit={handleFormSubmission}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="job_title">
                Job Title
              </label>
              <input
                id="job_title"
                name="jobTitle"
                type="text"
                defaultValue={job.jobTitle}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                disabled
                defaultValue={user?.email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Deadline</label>
              <DatePicker
                className="border p-2 rounded-md outline-none"
                selected={startDate}
                // defaultValue=(job.deadline)
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700" htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="border p-2 rounded-md"
                defaultValue={job.category}
              >
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="min_price">
                Minimum Price
              </label>
              <input
                id="min_price"
                name="minPrice"
                type="number"
                defaultValue={job.minPrice}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="max_price">
                Maximum Price
              </label>
              <input
                id="max_price"
                name="maxPrice"
                type="number"
                defaultValue={job.maxPrice}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              name="description"
              id="description"
              defaultValue={job.description}
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateJob;
