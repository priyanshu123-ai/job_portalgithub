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

  // Safe filtering
  const filteredJobs = allJobs?.filter((job) => {
    const q = searchQuery?.toLowerCase().trim();
    return (
      q === "" ||
      job?.title?.toLowerCase().includes(q) ||
      job?.company?.name?.toLowerCase().includes(q)
    );
  });

  // Debug logs
  console.log("Search Query:", searchQuery);
  console.log("Filtered Jobs:", filteredJobs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-white text-xl font-bold mb-6">
          Search Results ({filteredJobs.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
