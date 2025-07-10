import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearSingleJob, setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasUserApplied = (jobObj) => {
    if (!jobObj?.applications) return false;
    return jobObj.applications.some(
      (application) =>
        application?.applicant === user?._id ||
        application?.applicant?._id === user?._id
    );
  };

  const applyJobHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
console.log(res);
      if (res.data.success) {
        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id, status: "pending" }],
        };
        dispatch(setSingleJob(updatedJob));
        setIsApplied(true);
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to apply");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(hasUserApplied(res.data.job));
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load job");
      }
    };

    fetchJob();
     return () => {
    dispatch(clearSingleJob());
  };
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-16 px-4 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          rotateX: 2,
          rotateY: 2,
          transition: { type: "spring", stiffness: 120 },
        }}
        className="w-full max-w-5xl bg-gradient-to-br from-slate-900 to-slate-950 text-white p-10 rounded-3xl border border-white/10 shadow-[inset_0_1px_6px_rgba(255,255,255,0.05),0_15px_25px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:shadow-sky-500/20"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{singleJob?.title}</h1>
            <div className="flex flex-wrap gap-3">
              <span className="bg-sky-500/10 text-sky-300 font-medium px-3 py-1 rounded-full text-sm border border-sky-400/30">
                {singleJob?.position} Positions
              </span>
              <span className="bg-rose-500/10 text-rose-300 font-medium px-3 py-1 rounded-full text-sm border border-rose-400/30">
                {singleJob?.jobType}
              </span>
              <span className="bg-purple-500/10 text-purple-300 font-medium px-3 py-1 rounded-full text-sm border border-purple-400/30">
                {singleJob?.salary} LPA
              </span>
            </div>
          </div>

          <Button
            disabled={isApplied || loading}
            onClick={!isApplied ? applyJobHandler : undefined}
            className={`mt-6 md:mt-0 rounded-xl px-6 py-2 font-semibold text-sm shadow-md transition-all ${
              isApplied
                ? "bg-gray-600/60 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            }`}
          >
            {isApplied ? "Already Applied" : loading ? "Applying..." : "Apply Now"}
          </Button>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2 border-b border-white/10 pb-2">
              Job Overview
            </h2>
            <p>{singleJob?.description}</p>
          </section>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 text-[15px]">
            <p>
              <span className="font-semibold text-white">Role:</span>{" "}
              <span className="text-sky-400">{singleJob?.title}</span>
            </p>
            <p>
              <span className="font-semibold text-white">Location:</span>{" "}
              <span className="text-sky-400">{singleJob?.location}</span>
            </p>
            <p>
              <span className="font-semibold text-white">Experience:</span>{" "}
              <span className="text-sky-400">{singleJob?.experienceLevel}</span>
            </p>
            <p>
              <span className="font-semibold text-white">Posted:</span>{" "}
              <span className="text-sky-400">
                {new Date(singleJob?.createdAt).toLocaleDateString()}
              </span>
            </p>
            <p>
              <span className="font-semibold text-white">Applicants:</span>{" "}
              <span className="text-sky-400">{singleJob?.applications?.length}</span>
            </p>
            <p>
              <span className="font-semibold text-white">Work Type:</span>{" "}
              <span className="text-sky-400">{singleJob?.jobType}</span>
            </p>
            <p>
              <span className="font-semibold text-white">CTC Offered:</span>{" "}
              <span className="text-sky-400">{singleJob?.salary} LPA</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDescription;
