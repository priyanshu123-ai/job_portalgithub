import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "../components/Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs, searchQuery } = useSelector((state) => state.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch]);

  const filteredJobs = allJobs?.filter((job) => {
    const q = searchQuery?.toLowerCase().trim();
    return (
      q === "" ||
      job?.title?.toLowerCase().includes(q) ||
      job?.company?.name?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Responsive Heading */}
        <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
          Search Results ({filteredJobs?.length || 0})
        </h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredJobs?.length > 0 ? (
            filteredJobs.map((job) => <Job key={job._id} job={job} />)
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No jobs found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
