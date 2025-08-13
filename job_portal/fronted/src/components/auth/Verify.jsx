import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("emailToVerify");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${USER_API_END_POINT}/verify-otp`, { email, otp });
      if (res.data.success) {
        toast.success("Email verified successfully!");
        localStorage.removeItem("emailToVerify");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-2xl mb-4">Verify Your Email</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter OTP sent to your email"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <Button className="w-full bg-sky-500 hover:bg-sky-600">Verify</Button>
      </form>
    </div>
  );
};

export default Verify;
