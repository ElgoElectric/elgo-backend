const SagemakerAnomalyService = require("../services/sagemakeranomaly.service.js"); // Adjust the path to where your service file is located

// Create a new SagemakerAnomaly record
exports.createSagemakerAnomaly = async (req, res) => {
  try {
    const data = req.body;
    const createdAnomaly = await SagemakerAnomalyService.createSagemakerAnomaly(
      data
    );
    res.status(201).json(createdAnomaly);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error creating SagemakerAnomaly",
      error: error.message,
    });
  }
};

// Get a specific SagemakerAnomaly record by ID
exports.getSagemakerAnomalyById = async (req, res) => {
  try {
    const { id } = req.params;
    const anomaly = await SagemakerAnomalyService.getSagemakerAnomalyById(
      parseInt(id)
    );
    if (anomaly) {
      res.json(anomaly);
    } else {
      res.status(404).json({ message: "SagemakerAnomaly not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving SagemakerAnomaly",
      error: error.message,
    });
  }
};

// List all SagemakerAnomaly records
exports.listSagemakerAnomalies = async (req, res) => {
  try {
    const anomalies = await SagemakerAnomalyService.listSagemakerAnomalies();
    res.json(anomalies);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error listing SagemakerAnomalies",
      error: error.message,
    });
  }
};

// Update a SagemakerAnomaly record by ID
exports.updateSagemakerAnomaly = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedAnomaly = await SagemakerAnomalyService.updateSagemakerAnomaly(
      parseInt(id),
      updateData
    );
    res.json(updatedAnomaly);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error updating SagemakerAnomaly",
      error: error.message,
    });
  }
};

// Delete a SagemakerAnomaly record by ID
exports.deleteSagemakerAnomaly = async (req, res) => {
  try {
    const { id } = req.params;
    await SagemakerAnomalyService.deleteSagemakerAnomaly(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "❌ Error deleting SagemakerAnomaly",
      error: error.message,
    });
  }
};
