const anomalyService = require("../services/anomaly.service.js");

exports.createAnomaly = async (req, res) => {
  console.log("Received request body:", req.body);
  try {
    const anomalyData = JSON.parse(req.body);
    const newAnomaly = await anomalyService.createAnomaly(anomalyData);
    res.json(newAnomaly);
  } catch (error) {
    console.error("❌ Error creating anomaly:", error);
    res
      .status(500)
      .json({ message: "❌ Error creating anomaly, Request body was: " + JSON.stringify(req.body), error: error.message });
  }
};

exports.updateAnomalyActionTaken = async (req, res) => {
  try {
    const { id, actionTaken } = req.body;
    const updatedAnomaly = await anomalyService.updateActionTaken(
      id,
      actionTaken
    );
    res.json(updatedAnomaly);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error updating action taken for anomaly",
      error: error.message,
    });
  }
};

exports.updateAnomalyValidity = async (req, res) => {
  try {
    const { id, validAnomaly } = req.body;
    const actionTaken = validAnomaly ? undefined : false;
    const updatedAnomaly = await anomalyService.updateAnomaly(id, {
      validAnomaly,
      actionTaken,
    });
    res.json(updatedAnomaly);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error updating anomaly validity",
      error: error.message,
    });
  }
};

exports.getAllAnomalies = async (req, res) => {
  try {
    const anomalies = await anomalyService.listAllAnomalies();
    res.json(anomalies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error retrieving anomalies", error: error.message });
  }
};
