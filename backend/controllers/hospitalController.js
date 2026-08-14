const Hospital = require("../models/Hospital");

// GET all hospitals
const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().sort({ createdAt: -1 });

    res.status(200).json(hospitals);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch hospitals"
    });
  }
};

// GET hospital by ID
const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital not found"
      });
    }

    res.status(200).json(hospital);
  } catch (error) {
    res.status(400).json({
      message: "Invalid hospital ID"
    });
  }
};

// GET hospitals with available beds
const getAvailableHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find({
      availableBeds: { $gt: 0 }
    }).sort({ availableBeds: -1 });

    res.status(200).json(hospitals);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch available hospitals"
    });
  }
};

// CREATE hospital
const createHospital = async (req, res) => {
  try {
    const {
      name,
      city,
      totalBeds,
      availableBeds
    } = req.body;

    if (
      !name ||
      !city ||
      totalBeds === undefined ||
      availableBeds === undefined
    ) {
      return res.status(400).json({
        message: "All hospital fields are required"
      });
    }

    if (availableBeds > totalBeds) {
      return res.status(400).json({
        message: "Available beds cannot be greater than total beds"
      });
    }

    const hospital = await Hospital.create({
      name,
      city,
      totalBeds,
      availableBeds
    });

    res.status(201).json({
      message: "Hospital created successfully",
      hospital
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create hospital"
    });
  }
};

// UPDATE hospital
const updateHospital = async (req, res) => {
  try {
    const {
      name,
      city,
      totalBeds,
      availableBeds
    } = req.body;

    if (
      totalBeds !== undefined &&
      availableBeds !== undefined &&
      availableBeds > totalBeds
    ) {
      return res.status(400).json({
        message: "Available beds cannot be greater than total beds"
      });
    }

    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      {
        name,
        city,
        totalBeds,
        availableBeds
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital not found"
      });
    }

    res.status(200).json({
      message: "Hospital updated successfully",
      hospital
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Failed to update hospital"
    });
  }
};

// DELETE hospital
const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital not found"
      });
    }

    res.status(200).json({
      message: "Hospital deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid hospital ID"
    });
  }
};

module.exports = {
  getHospitals,
  getHospitalById,
  getAvailableHospitals,
  createHospital,
  updateHospital,
  deleteHospital
};