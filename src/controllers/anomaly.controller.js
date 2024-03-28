const anomalyService = require("../services/anomaly.service.js");

exports.createAnomaly = async (req, res) => {
  console.log("Received request body:", req.body);
  try {
    const anomalyData = { ...req.body };
    const convertTimestamp = (timestamp) => {
      return `${timestamp}.000Z`;
    };

    if (anomalyData.timestamp_start) {
      anomalyData.timestamp_start = convertTimestamp(
        anomalyData.timestamp_start
      );
    }
    if (anomalyData.timestamp_end) {
      anomalyData.timestamp_end = convertTimestamp(anomalyData.timestamp_end);
    }

    // Proceed to create anomaly with the reformatted timestamp
    const newAnomaly = await anomalyService.createAnomaly(anomalyData);
    res.json(newAnomaly);
  } catch (error) {
    console.error("❌ Error creating anomaly:", error);
    res.status(500).json({
      message:
        "❌ Error creating anomaly, Request body was: " +
        JSON.stringify(req.body),
      error: error.message,
    });
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

exports.listAnomaliesByDevice = async (req, res) => {
  try {
    const { deviceLabel } = req.params;
    const anomalies = await anomalyService.listAnomaliesByDeviceLabel(
      deviceLabel
    );
    res.json(anomalies);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving anomalies by device label",
      error: error.message,
    });
  }
};

exports.listAnomaliesLast24Hours = async (req, res) => {
  try {
    const { deviceLabel } = req.params;
    const anomalies = await anomalyService.listAnomaliesByTimeFrame(
      deviceLabel,
      24
    );
    res.json(anomalies);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving anomalies for the last 24 hours",
      error: error.message,
    });
  }
};

exports.listAnomaliesLast48Hours = async (req, res) => {
  try {
    const { deviceLabel } = req.params;
    const anomalies = await anomalyService.listAnomaliesByTimeFrame(
      deviceLabel,
      48
    );
    res.json(anomalies);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving anomalies for the last 48 hours",
      error: error.message,
    });
  }
};
