import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const CompanySetup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const { singleCompany } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  if (singleCompany) {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null, // 👈 file should be reset to null (not logo path)
    });
  }
}, [singleCompany]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-10 rounded-3xl shadow-[inset_0_1px_8px_rgba(255,255,255,0.05),0_15px_25px_rgba(0,0,0,0.6)] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
        <Button
          variant="ghost"
          className="mb-6 text-sky-400 hover:text-white"
          onClick={() => navigate("/admin/companies")}
        >
          <ArrowLeft className="mr-2" /> Back
        </Button>

        <h1 className="text-3xl font-bold mb-8 text-white">Company Setup</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <Label className="block mb-2 text-sm text-slate-300">
              Company Name
            </Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter company name"
              className="bg-slate-800 border border-white/10 text-white placeholder:text-slate-500"
            />
          </div>

          <div>
            <Label className="block mb-2 text-sm text-slate-300">
              Description
            </Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter company description"
              className="bg-slate-800 border border-white/10 text-white placeholder:text-slate-500"
            />
          </div>

          <div>
            <Label className="block mb-2 text-sm text-slate-300">Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              placeholder="https://example.com"
              className="bg-slate-800 border border-white/10 text-white placeholder:text-slate-500"
            />
          </div>

          <div>
            <Label className="block mb-2 text-sm text-slate-300">
              Location
            </Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="City, Country"
              className="bg-slate-800 border border-white/10 text-white placeholder:text-slate-500"
            />
          </div>

          <div>
            <Label className="block mb-2 text-sm text-slate-300">
              Company Logo
            </Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="bg-slate-800 text-white border border-white/10 cursor-pointer"
            />
          </div>

          {loading ? (
            <Button
              disabled
              className="w-full bg-sky-600/60 cursor-not-allowed"
            >
              <Loader2 className="h-5 w-5 mr-2 animate-spin text-white/90" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white font-semibold py-2 rounded-xl shadow-lg transition duration-300"
            >
              Update Company
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
