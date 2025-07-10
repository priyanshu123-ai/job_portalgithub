import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
            <Navbar />
            <div className="flex items-center justify-center w-full px-4 py-10">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-5xl p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] bg-white/5 transition-all"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center drop-shadow">🚀 Post a New Job</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: "Title", name: "title", type: "text" },
                            { label: "Description", name: "description", type: "text" },
                            { label: "Requirements", name: "requirements", type: "text" },
                            { label: "Salary", name: "salary", type: "text" },
                            { label: "Location", name: "location", type: "text" },
                            { label: "Job Type", name: "jobType", type: "text" },
                            { label: "Experience Level", name: "experience", type: "text" },
                            { label: "No of Position", name: "position", type: "number" },
                        ].map((field) => (
                            <div key={field.name}>
                                <Label className="text-white">{field.label}</Label>
                                <Input
                                    type={field.type}
                                    name={field.name}
                                    value={input[field.name]}
                                    onChange={changeEventHandler}
                                    className="bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 rounded-xl shadow-inner mt-1"
                                />
                            </div>
                        ))}

                        {companies.length > 0 && (
                            <div>
                                <Label>Select Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl shadow-inner mt-1">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 text-white border border-slate-700 shadow-md">
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem
                                                    key={company._id}
                                                    value={company.name.toLowerCase()}
                                                    className="hover:bg-slate-800"
                                                >
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <Button
                            disabled
                            className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl py-3 shadow-lg"
                        >
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-xl transition-transform hover:scale-[1.02]"
                        >
                            ➕ Post New Job
                        </Button>
                    )}

                    {companies.length === 0 && (
                        <p className="text-sm text-red-400 text-center mt-4 font-semibold">
                            * Please register a company first before posting a job.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
