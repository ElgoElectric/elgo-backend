const express = require("express");
const router = express.Router();
const sagemakerAnomalyController = require("../controllers/sagemakeranomaly.controller.js"); // Adjust the path as needed

// Create a new SagemakerAnomaly record
router.post("/create", sagemakerAnomalyController.createSagemakerAnomaly);

// Get a specific SagemakerAnomaly record by ID
router.get("/:id", sagemakerAnomalyController.getSagemakerAnomalyById);

// List all SagemakerAnomaly records
router.get("/", sagemakerAnomalyController.listSagemakerAnomalies);

// Update a SagemakerAnomaly record by ID
router.patch("/:id", sagemakerAnomalyController.updateSagemakerAnomaly);

// Delete a SagemakerAnomaly record by ID
router.delete("/:id", sagemakerAnomalyController.deleteSagemakerAnomaly);

module.exports = router;
