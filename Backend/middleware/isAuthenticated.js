const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify the token
    const decoded = await jwt.verify(token, process.env.SECRET_TOKEN_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }

    // Check user role
    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
        success: false,
      });
    }

    // Attach user ID and role to the request object
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = isAuthenticated;
