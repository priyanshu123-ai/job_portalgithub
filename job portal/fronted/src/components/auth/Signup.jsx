import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input,setInput] = useState({
    fullname:"",
    email:"",
    phoneNumber:"",
  
    password:"",
    role:"",
    file:""
  })
   const { loading,user} = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value})
  }
  const changeFileHandler = (e) => {
    setInput({...input,file:e.target.files?.[0]})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("password",input.password);
    formData.append("role",input.role);
    try {
        dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      }); 

      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }finally{
        dispatch(setLoading(false));
    }

  }
   useEffect(() => {
      if(user){
        navigate("/")
      }
    },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20"
         onSubmit={submitHandler}>
          <h1 className="text-3xl font-bold mb-6 text-sky-400 text-center">
            Create an Account
          </h1>

          {/* Full Name */}
          <div className="mb-5">
            <Label className="block mb-1 text-white">Full Name</Label>
            <input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Priyanshu"
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-slate-300 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <Label className="block mb-1 text-white">Email</Label>
            <input
              type="email"
               value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="priyanshu@gmail.com"
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-slate-300 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

            <div className="mb-5">
            <Label className="block mb-1 text-white">Phone Number</Label>
            <input
              type="text"
               value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="67097979"
              className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-slate-300 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <Label className="block mb-1 text-white">Password</Label>
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
                autoComplete="current-password"
              placeholder="********"

              className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-slate-300 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* User Role */}
          <div className="mb-5">
            <Label className="block mb-2 text-white">Register as</Label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role==="student"}
                  onChange={changeEventHandler}
                  className="accent-sky-500 w-4 h-4"
                />
                <span className="text-white">Student</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                   checked={input.role==="recruiter"}
                  onChange={changeEventHandler}
                  className="accent-sky-500 w-4 h-4"
                />
                <span className="text-white">Recruiter</span>
              </label>
            </div>
          </div>

          {/* Profile Upload */}
          <div className="mb-6">
            <Label className="block mb-2 text-white">Profile Picture</Label>
            <input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-sky-500 file:text-white hover:file:bg-sky-600 transition"
            />
          </div>

          {/* Submit Button */}
         {loading ? (
  <Button
    disabled                        // 🔒 prevent double‑click
    className="w-full bg-sky-600/60 cursor-not-allowed"
  >
    <Loader2 className="h-5 w-5 mr-2 animate-spin text-white/90" />
    Please wait
  </Button>
) : (
  <Button
    type="submit"
    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-xl shadow-lg transition duration-300"
  >
    Signup
  </Button>
)}

          <span className="flex items-center justify-center m-2">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-400 hover:underline ml-1">
              Login
            </Link>
          </span>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
