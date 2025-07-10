import React from "react";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const LatestJobsCard = ({ job }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 text-white cursor-pointer hover:shadow-sky-500/30 hover:translate-y-[-2px] transition-transform"
    >
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-sky-400">{job?.company?.name}</h1>
        <p className="text-sm text-gray-400">{job.location}</p>
      </div>

      <div className="mb-3">
        <h2 className="text-xl font-bold text-white mb-1">{job?.title}</h2>
        <p className="text-sm text-gray-400">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Badge className="bg-sky-500/10 text-sky-300 font-semibold" variant="ghost">
          {job?.positions} Positions
        </Badge>
        <Badge className="bg-purple-500/10 text-purple-300 font-semibold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="bg-green-500/10 text-green-300 font-semibold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobsCard;