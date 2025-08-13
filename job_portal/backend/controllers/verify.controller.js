import { User } from "../models/user.model.js"; // ✅ Fixes the crash
import bcrypt from "bcryptjs"


export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required.",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({
        message: "Account is already verified.",
        success: false,
      });
    }

    if (user.verifyOtpExpiresAt < Date.now()) {
      return res.status(400).json({
        message: "OTP has expired. Please register again or request new OTP.",
        success: false,
      });
    }

    // ✅ Force OTP to string for comparison
    const isMatch = await bcrypt.compare(otp.toString(), user.verifyOtp);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid OTP.",
        success: false,
      });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiresAt = 0;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully. You can now log in.",
      success: true,
    });

  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({
        message:error.message,
    
      message: "Something went wrong. Please try again.",
      success: false,
    });
  }
};
