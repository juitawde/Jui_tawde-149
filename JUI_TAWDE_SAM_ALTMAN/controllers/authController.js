const bcrypt = require("bcryptjs");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required"
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error during registration"
    });
  }
};

const login = (req, res) => {
  res.status(200).json({
    message: "Login successful",
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
};

const logout = (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({
        message: "Logout failed"
      });
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return res.status(500).json({
          message: "Could not destroy session"
        });
      }

      res.clearCookie("connect.sid");

      res.status(200).json({
        message: "Logout successful"
      });
    });
  });
};

const getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "Not authenticated"
    });
  }

  res.status(200).json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};