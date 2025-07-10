import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [companyName, setCompanyName] = useState('')

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res?.data?.company?._id
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || 'Something went wrong.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">
      <Navbar />
      <div className="max-w-xl mx-auto mt-16 px-6 py-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-[inset_0_1px_5px_rgba(255,255,255,0.05),0_12px_20px_rgba(0,0,0,0.5)] border border-white/10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-white">Your Company Name</h1>
          <p className="text-slate-400 text-sm">
            What would you like to name your company? You can change this later.
          </p>
        </div>

        <div className="mb-6">
          <Label className="text-sm text-slate-300 mb-1 block">Company Name</Label>
          <Input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="my-2 bg-slate-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder:text-slate-400 text-white"
            placeholder="JobHunt, Microsoft etc."
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            onClick={() => navigate('/admin/companies')}
            variant="outline"
            className="bg-slate-700 hover:bg-slate-600 text-white border border-slate-500"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white shadow-md"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
