const express = require("express");
const router = express.Router();
const anomalyController = require("../controllers/anomaly.controller.js");
router.get("/", anomalyController.getAllAnomalies);
router.post("/createAnomaly", anomalyController.createAnomaly);
router.patch("/:id/updateAction", anomalyController.updateAnomalyActionTaken);
router.patch("/:id/updateValidity", anomalyController.updateAnomalyValidity);

module.exports = router;
