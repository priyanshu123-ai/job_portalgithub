import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Badge, Contact, Mail, Pen } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "../AppliedJobTable";
import UpdateProfileDetails from "./UpdateProfileDetails";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs()
  const isResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 p-8 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(56,189,248,0.15)] bg-gradient-to-br from-slate-800 to-slate-950">
        {/* Top Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 rounded-full border-2 border-white/20 shadow-lg">
              <AvatarImage src="https://img.freepik.com/premium-vector/beautiful-unique-logo-design-ecommerce-retail-company_1287271-14561.jpg" />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-sky-400">
                {user?.fullname}
              </h1>
              <p className="text-sm text-gray-300 mt-1">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="rounded-lg border-sky-500 text-sky-400 hover:bg-sky-500/20 hover:text-white transition"
          >
            <Pen className="w-4 h-4" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-sky-400" />
            <span className="text-gray-300">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Contact className="w-4 h-4 text-sky-400" />
            <span className="text-gray-300">{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400 text-sm font-medium shadow-lg transition-all transform hover:scale-105 hover:shadow-sky-500/30 hover:bg-sky-500/20 cursor-pointer"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-400">Not Found</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Resume</h2>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-medium text-blue-400 hover:underline cursor-pointer">
              {isResume ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user?.profile?.resume}
                >
                {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span className="text-gray-400">Not Found</span>
              )}
            </Label>
          </div>
        </div>

        {/* Applied Jobs Table */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 rounded-2xl shadow-[0_0_30px_rgba(147,51,234,0.2)] hover:shadow-purple-500/30 transition-all duration-300">
          <h2 className="font-bold text-white mb-4 text-lg">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>
      <UpdateProfileDetails open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
