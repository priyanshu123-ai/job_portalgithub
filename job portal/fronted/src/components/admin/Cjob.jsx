import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import AdminJobTable from "./AdminJobTable";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const Cjob = () => {
  useGetAllJobs();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-6">
        {/* Glassy container */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 rounded-3xl shadow-[0_0_40px_rgba(56,189,248,0.1)] hover:shadow-sky-500/20 transition duration-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <Input
              className="bg-slate-800 border border-sky-500 text-sky-200 placeholder:text-sky-400 rounded-xl px-4 py-2 shadow-inner shadow-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full sm:w-auto transition"
              placeholder="Filter by name"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:from-sky-700 hover:to-indigo-700 transition-transform transform hover:scale-105 active:scale-95"
            >
              New Jobs
            </Button>
          </div>

          {/* Table */}
          <AdminJobTable />
        </div>
      </div>
    </div>
  );
};

export default Cjob;
