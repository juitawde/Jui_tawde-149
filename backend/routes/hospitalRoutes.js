const express = require("express");

const {
  getHospitals,
  getHospitalById,
  getAvailableHospitals,
  createHospital,
  updateHospital,
  deleteHospital
} = require("../controllers/hospitalController");

const isAuthenticated = require("../middleware/authMiddleware");

const router = express.Router();

// Get hospitals with available beds
router.get("/available", getAvailableHospitals);

// Get all hospitals
router.get("/", getHospitals);

// Get hospital by ID
router.get("/:id", getHospitalById);

// Create hospital
router.post("/", isAuthenticated, createHospital);

// Update hospital
router.put("/:id", isAuthenticated, updateHospital);

// Delete hospital
router.delete("/:id", isAuthenticated, deleteHospital);

module.exports = router;