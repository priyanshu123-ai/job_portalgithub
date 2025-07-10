import React from "react";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const now = new Date();
    const diffTime = now - createdAt;
    const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return daysPassed;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-slate-800 to-slate-950 text-white border border-white/10 rounded-2xl p-6 shadow-[0_12px_24px_rgba(0,0,0,0.3),inset_0_1px_4px_rgba(255,255,255,0.05)] hover:shadow-sky-500/40 hover:-translate-y-1.5 transition-all cursor-pointer"
    >
      {/* Top Info */}
      <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
        <span className="italic">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} day(s) ago`}
        </span>
        <Bookmark className="w-5 h-5 text-gray-300 hover:text-sky-400 transition" />
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={
            job?.company?.logo ||
            "https://img.freepik.com/premium-vector/beautiful-unique-logo-design-ecommerce-retail-company_1287271-14561.jpg"
          }
          alt="Company Logo"
          className="w-12 h-12 rounded-full border border-white/20 shadow-md"
        />
        <div>
          <h1 className="text-lg font-semibold text-sky-400">
            {job?.company?.name || "Unknown Company"}
          </h1>
          <p className="text-sm text-gray-400">{job?.location}</p>
        </div>
      </div>

      {/* Title + Description */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-2">{job?.title}</h2>
        <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Job Tags */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Badge className="bg-sky-500/10 text-sky-300 px-3 py-1 rounded-full">
          {job?.position}
        </Badge>
        <Badge className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full">
          {job?.jobType}
        </Badge>
        <Badge className="bg-green-500/10 text-green-300 px-3 py-1 rounded-full">
           {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="rounded-xl border-sky-500 text-sky-400 hover:bg-sky-500/20 hover:text-white transition"
        >
          Details
        </Button>
        <Button
          variant="outline"
          className="rounded-xl border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-white transition"
        >
          Save for later
        </Button>
      </div>
    </motion.div>
  );
};

export default Job;
