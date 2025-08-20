
import React from "react";
import LatestJobsCard from "./LatestJobsCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const LatestJobs = () => {
  const navigate = useNavigate()
  const {allJobs} = useSelector(store => store.job)
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-extrabold mb-12">
          <span className="text-sky-500">Latest & Top</span> Job Openings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"  onClick={() => navigate("/jobs")}>
          {allJobs.length<= 0 ? <span>No Job found</span>: allJobs.map((job) => (
           <LatestJobsCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
