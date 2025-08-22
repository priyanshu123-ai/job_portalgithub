import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full table-auto border-collapse rounded-2xl overflow-hidden shadow-lg">
        {/* Table header hidden on mobile */}
        <thead className="bg-sky-900 text-white hidden md:table-header-group">
          <tr>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold">Company</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold">Job Title</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold">Location</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold">Status</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold">Applied Date</th>
          </tr>
        </thead>

        <tbody className="bg-gradient-to-b from-slate-800 to-slate-950 text-white divide-y divide-white/10">
          {allAppliedJobs.length > 0 ? (
            allAppliedJobs
              .filter(job => job?.job && job?.job?.company)
              .map((job, index) => (
                <tr
                  key={job._id || index}
                  className="md:table-row flex flex-col md:flex-row border-b md:border-0 p-4 md:p-0 hover:bg-slate-700 transition-all hover:shadow-md cursor-pointer"
                >
                  <td className="px-4 md:px-6 py-2 md:py-4 break-words text-sm font-medium text-sky-400">
                    <span className="md:hidden font-semibold">Company: </span>
                    {job?.job?.company?.name}
                  </td>
                  <td className="px-4 md:px-6 py-2 md:py-4 break-words text-sm">
                    <span className="md:hidden font-semibold">Job Title: </span>
                    {job?.job?.title}
                  </td>
                  <td className="px-4 md:px-6 py-2 md:py-4 break-words text-sm text-gray-300">
                    <span className="md:hidden font-semibold">Location: </span>
                    {job?.job?.location}
                  </td>
                  <td
                    className={`px-4 md:px-6 py-2 md:py-4 break-words text-sm font-semibold ${
                      job?.status?.toLowerCase() === 'accepted'
                        ? 'text-green-400'
                        : job?.status?.toLowerCase() === 'rejected'
                        ? 'text-red-400'
                        : 'text-yellow-400'
                    }`}
                  >
                    <span className="md:hidden font-semibold">Status: </span>
                    {job?.status?.charAt(0).toUpperCase() + job?.status?.slice(1)}
                  </td>
                  <td className="px-4 md:px-6 py-2 md:py-4 break-words text-sm text-gray-400">
                    <span className="md:hidden font-semibold">Applied: </span>
                    {job?.createdAt?.split("T")[0]}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-400">
                You haven't applied to any jobs yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobTable;
