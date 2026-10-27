import jwt from 'jsonwebtoken';

// Function to get token from cookies or headers
const getToken = (req) => {
  // Token from cookies
  if (req.cookies && req.cookies.token) {
    console.log("Token found in cookies.");
    return req.cookies.token;
  }
  // Token from Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    console.log("Token found in Authorization header.");
    return req.headers.authorization.split(" ")[1];
  }
  return null; // No token found
};

// Middleware to check user authentication
const isAuthenticated = (req, res, next) => {
  try {
    const token = getToken(req);

    // If no token is found, return an error
    if (!token) {
      console.log("No token found in the request.");
      return res.status(401).json({
        message: "Authentication token missing.",
        success: false,
      });
    }

    // Ensure the secret key is present in environment variables
    const secret = process.env.SECRET_KEY;
    if (!secret) {
      console.error("SECRET_KEY is not set in environment variables.");
      return res.status(500).json({
        message: "Internal configuration error: Missing secret key.",
        success: false,
      });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    req.id = decoded.userId || decoded.id; // Adjust based on how you encoded the token

    console.log("Token verified successfully.");
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("JWT authentication error:", error);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Session expired. Please login again.",
        success: false,
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token. Please login again.",
        success: false,
      });
    }

    // General server error
    return res.status(500).json({
      message: "Internal server error during authentication.",
      success: false,
    });
  }
};

export default isAuthenticated;
