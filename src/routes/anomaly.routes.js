const express = require("express");
const router = express.Router();
const anomalyController = require("../controllers/anomaly.controller.js");
router.get("/", anomalyController.getAllAnomalies);
router.post("/createAnomaly", anomalyController.createAnomaly);
router.patch("/:id/updateAction", anomalyController.updateAnomalyActionTaken);
router.patch("/:id/updateValidity", anomalyController.updateAnomalyValidity);
router.get("/:deviceLabel", anomalyController.listAnomaliesByDevice);
router.get(
  "/:deviceLabel/last24hours",
  anomalyController.listAnomaliesLast24Hours
);
router.get(
  "/:deviceLabel/last48hours",
  anomalyController.listAnomaliesLast48Hours
);

module.exports = router;
