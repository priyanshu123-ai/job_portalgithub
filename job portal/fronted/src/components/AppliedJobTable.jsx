import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse rounded-2xl overflow-hidden shadow-lg">
        <thead className="bg-sky-900 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Company</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Job Title</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Company</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Applied Date</th>
          </tr>
        </thead>
        <tbody className="bg-gradient-to-b from-slate-800 to-slate-950 text-white divide-y divide-white/10">
          {
            allAppliedJobs.length > 0 ? (
              allAppliedJobs
                .filter(job => job?.job && job?.job?.company) // ✅ remove invalid entries
                .map((job, index) => (
                  <tr
                    key={job._id || index}
                    className="hover:bg-slate-700 transition-all hover:shadow-md cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sky-400">
                      {job?.job?.company?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {job?.job?.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {job?.job?.location}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                        job?.status === 'Accepted' || job?.status === 'accepted'
                          ? 'text-green-400'
                          : job?.status === 'Rejected' || job?.status === 'rejected'
                          ? 'text-red-400'
                          : 'text-yellow-400'
                      }`}
                    >
                      {job?.status?.charAt(0).toUpperCase() + job?.status?.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
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
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobTable;
