import React, { useState, useMemo } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    salary: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filtering
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const locOk = filters.location
        ? job.location?.toLowerCase().includes(filters.location.toLowerCase())
        : true;

      const indOk = filters.industry
        ? job.title?.toLowerCase().includes(filters.industry.toLowerCase())
        : true;

      const salOk = filters.salary
        ? job.salary?.toString().includes(filters.salary) // adjust this for actual salary logic
        : true;

      return locOk && indOk && salOk;
    });
  }, [allJobs, filters]);

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white">
      <Navbar />
      <div className="flex flex-1 max-w-[90rem] mx-auto w-full px-4 py-6 gap-6 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[20%] hidden md:block overflow-y-auto">
          <FilterCard filters={filters} onChange={handleFilterChange} />
        </aside>

        {/* Job Listings */}
        <main className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length === 0 ? (
              <span>Job not found</span>
            ) : (
              filteredJobs.map((job) => <Job key={job?._id} job={job} />)
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Jobs;
