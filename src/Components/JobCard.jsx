import { Link } from "react-router";

// eslint-disable-next-line react/prop-types
const JobCard = ({ job }) => {
 
  const { _id, jobTitle, category, deadline, description, minPrice, maxPrice } =
    job || {};
  return (
    <Link to={`/job/${_id}`}>
      <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-light text-gray-800 ">
            Deadline: {new Date(deadline).toLocaleDateString()}
          </span>
          <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full ">
            {category}
          </span>
        </div>

        <div>
          <h1
            title={jobTitle}
            className="mt-2 text-lg font-semibold text-gray-800 "
          >
            {jobTitle.substring(0, 80)}...
          </h1>

          <p title={description} className="mt-2 text-sm text-gray-600 ">
            {description.substring(0, 80)}...
          </p>
          <p className="mt-2 text-sm font-bold text-gray-600 ">
            Range: ${minPrice} - ${maxPrice}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
