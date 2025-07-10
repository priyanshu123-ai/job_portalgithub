import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { applicants } = useSelector((store) => store.application)

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials: true
        })
        dispatch(setAllApplicants(res.data.job))
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllApplicants()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white/10 border border-white/20 rounded-xl shadow-2xl backdrop-blur-lg p-6">
          <h1 className="text-2xl font-extrabold mb-6 tracking-wide">
            Applicants{' '}
            <span className="text-cyan-400">({applicants?.applications?.length || 0})</span>
          </h1>
          <ApplicantsTable />
        </div>
      </div>
    </div>
  )
}

export default Applicants
