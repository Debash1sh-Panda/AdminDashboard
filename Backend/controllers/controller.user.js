const User = require("../models/models.user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, emailId, gender, password } = req.body;
    // console.log(name, emailId, gender, password)
    if (!name || !emailId || !gender || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ emailId });
    if (user) {
      return res.status(400).json({
        message: "User already exists, please login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      emailId,
      gender,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "Registered successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal issue, please try again later",
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    let user = await User.findOne({ emailId });

    if (!user) {
      return res.status(400).json({
        message: "User not found, please register",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    // Update the last login date and increment the count
    user.lastLoginDate = new Date();
    if (user.role === "user") {
      user.count += 1;
    }
    await user.save();

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN_KEY, {
      expiresIn: "1d",
    });

    const userResponse = {
      _id: user._id,
      name: user.name,
      emailId: user.emailId,
      role: user.role,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${userResponse.name}`,
        userResponse,
        success: true,
      });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal issue, please try again later",
      success: false,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal issue, please try again later",
      success: false,
    });
  }
};

//admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users.length) {
      return res.status(404).json({
        message: "No users found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Users retrieved successfully",
      users,
      success: true,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal issue, please try again later",
      success: false,
    });
  }
};
