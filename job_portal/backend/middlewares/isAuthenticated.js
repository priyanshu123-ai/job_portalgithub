import jwt from "jsonwebtoken";

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
  // ✅ Allow public GET access to jobs
  if (req.method === "GET" && req.originalUrl.startsWith("/api/v1/job")) {
    return next();
  }

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Authentication token not found.",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId; // Attach user ID to req object
    next();
  } catch (error) {
    console.log("JWT verification error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token.",
      success: false,
    });
  }
};

export default isAuthenticated;
