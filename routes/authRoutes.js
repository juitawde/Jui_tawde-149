const express = require("express");
const passport = require("passport");

const {
  register,
  login,
  logout,
  getCurrentUser
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

router.post(
  "/login",
  passport.authenticate("local"),
  login
);

router.post("/logout", logout);

router.get("/me", getCurrentUser);

module.exports = router;