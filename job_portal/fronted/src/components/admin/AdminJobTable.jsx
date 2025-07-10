import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAdminJob from "../hooks/useAdminJob";

const AdminJobTable = () => {
  useAdminJob();
  const navigate = useNavigate();

  const { allAdminJobs } = useSelector((store) => store.job); // ✅ Fixed
  const search = useSelector((store) => store.company.searchCompanyByText || "");

  const filteredJobs = allAdminJobs.filter((job) =>
    search ? job?.title?.toLowerCase().includes(search.trim().toLowerCase()) : true
  );

  return (
    <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-3xl shadow-[inset_0_2px_6px_rgba(255,255,255,0.05),0_20px_30px_rgba(0,0,0,0.5)] p-6 backdrop-blur-md">
      <Table className="text-white">
        <TableCaption className="mt-6 mb-6 text-sm text-cyan-400 hover:underline hover:text-cyan-300 transition-all duration-200 cursor-pointer text-center">
          A list of your recently posted jobs
        </TableCaption>

        <TableHeader>
          <TableRow className="text-sky-300 text-sm uppercase tracking-wide bg-slate-800/30 rounded">
            <TableHead className="p-4">Job Title</TableHead>
            <TableHead className="p-4">Company</TableHead>
            <TableHead className="p-4">Date</TableHead>
            <TableHead className="p-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-slate-400 py-6">
                No jobs found.
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map((job) => (
              <TableRow key={job._id} className="hover:bg-slate-800/40 transition duration-300">
                <TableCell className="p-4 font-medium text-white">
                  {job?.title}
                </TableCell>
                <TableCell className="p-4 text-slate-300">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="p-4 text-slate-300">
                  {new Date(job?.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="p-4 text-right">
                  <Popover>
                    <PopoverTrigger className="text-white hover:text-cyan-400">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="bg-slate-800 p-2 rounded-xl shadow-lg border border-slate-600 w-36">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 hover:bg-slate-700 p-2 rounded cursor-pointer transition"
                      >
                        <Edit2 className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm text-white">Edit</span>
                      </div>
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 hover:bg-slate-700 p-2 rounded cursor-pointer transition">
                        <Eye />
                        <span className="text-sm text-white">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobTable;
