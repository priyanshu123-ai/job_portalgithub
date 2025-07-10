import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '../utils/constant'
import axios from 'axios'

const shortlistingStatus = ['Accepted', 'Rejected']

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application)

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      )
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred')
    }
  }

  return (
    <div className="overflow-x-auto shadow-xl rounded-xl border border-[#1f2937] bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6">
      <Table>
        <TableCaption className="text-cyan-400 font-medium mb-2">
          Recently Applied Candidates
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-[#1e293b] text-white border-b border-gray-700">
            <TableHead className="text-cyan-400">FullName</TableHead>
            <TableHead className="text-cyan-400">Email</TableHead>
            <TableHead className="text-cyan-400">Contact</TableHead>
            <TableHead className="text-cyan-400">Resume</TableHead>
            <TableHead className="text-cyan-400">Date</TableHead>
            <TableHead className="text-cyan-400 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.map(item => (
            <TableRow
              key={item._id}
              className="transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-[0_4px_20px_rgba(0,255,255,0.2)] hover:bg-[#1f2937] rounded-lg cursor-pointer border-b border-[#2d3748]"
            >
              <TableCell className="text-white font-medium">
                {item?.applicant?.fullname}
              </TableCell>
              <TableCell className="text-gray-300">{item?.applicant?.email}</TableCell>
              <TableCell className="text-gray-300">{item?.applicant?.phoneNumber}</TableCell>
              <TableCell className="text-blue-400 hover:underline">
                {item.applicant?.profile?.resume ? (
                  <a
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span className="text-gray-500">NA</span>
                )}
              </TableCell>
              <TableCell className="text-gray-300">
                {item?.applicant?.createdAt?.split('T')[0]}
              </TableCell>
              <TableCell className="float-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-white hover:text-cyan-400" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-[#1e293b] text-white border border-gray-700 shadow-lg rounded-md">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item?._id)}
                        className="px-2 py-1 hover:bg-cyan-700 rounded cursor-pointer"
                      >
                        {status}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
