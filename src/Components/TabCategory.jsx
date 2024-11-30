import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import axios from "axios";

const TabCategory = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("http://localhost:5000/jobs");
      setJobs(data);
    };

    getData();
  }, []);

  return (
    <Tabs>
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-3xl text-center font-bold">
          Browse Jobs By Categories
        </h1>
        <p className="text-center w-2/3 mx-auto pt-4 pb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta veniam
          cumque dolorum amet aspernatur. Harum Sint eaque minus fuga!
        </p>
        <div className="flex justify-center">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {jobs
              .filter((j) => j.category === "Web Development")
              .map((job) => {
                return <JobCard key={job._id} job={job} />;
              })}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {jobs
              .filter((j) => j.category === "Graphics Design")
              .map((job) => {
                return <JobCard key={job._id} job={job} />;
              })}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {jobs
              .filter((j) => j.category === "Digital Marketing")
              .map((job) => {
                return <JobCard key={job._id} job={job} />;
              })}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategory;
