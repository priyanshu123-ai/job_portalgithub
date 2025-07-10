import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";



const Jobs = () => {
  const {allJobs} = useSelector(store => store.job);
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-[90rem] mx-auto px-4 py-10 flex gap-6">
        <aside className="w-[20%] hidden md:block">
          <FilterCard />
        </aside>

        <main className="w-[85%] overflow-y-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.length <= 0 ? <span>Job not found</span>: allJobs.map((job) => (
              <Job key={job?._id} job={job} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Jobs;
