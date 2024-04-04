// controller.js
const datastreamService = require("../services/datastream.service.js"); // Adjust path as necessary

exports.createDatastream = async (req, res) => {
  try {
    const datastream = await datastreamService.createDatastream(req.body);
    res.status(201).json(datastream);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error creating datastream", error: error.message });
  }
};

exports.getDatastreamById = async (req, res) => {
  try {
    const datastream = await datastreamService.getDatastreamById(
      parseInt(req.params.id)
    );
    if (datastream) {
      res.json(datastream);
    } else {
      res.status(404).json({ message: "Datastream not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving datastream",
      error: error.message,
    });
  }
};

exports.updateDatastream = async (req, res) => {
  try {
    const updatedDatastream = await datastreamService.updateDatastream(
      parseInt(req.params.id),
      req.body
    );
    res.json(updatedDatastream);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error updating datastream", error: error.message });
  }
};

exports.deleteDatastream = async (req, res) => {
  try {
    await datastreamService.deleteDatastream(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error deleting datastream", error: error.message });
  }
};

exports.listAllDatastreams = async (req, res) => {
  try {
    const datastreams = await datastreamService.listAllDatastreams();
    res.json(datastreams);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error listing datastreams", error: error.message });
  }
};

// Add to controller.js
exports.getDatastreamsByTimestampRange = async (req, res) => {
  try {
    const { startTimestamp, endTimestamp } = req.query;
    if (!startTimestamp || !endTimestamp) {
      return res
        .status(400)
        .json({ message: "Start and end timestamps are required." });
    }
    const datastreams = await datastreamService.getDatastreamsByTimestampRange(
      startTimestamp,
      endTimestamp
    );
    res.json(datastreams);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error retrieving datastreams by timestamp range",
      error: error.message,
    });
  }
};

exports.getEnergyConsumptionByDevice = async (req, res) => {
  try {
    const { deviceLabel } = req.params; // Extract deviceLabel from URL parameters
    const totalEnergyKWh = await datastreamService.calculateEnergyConsumption(
      deviceLabel
    );
    res.json({
      deviceLabel,
      totalEnergyKWh: totalEnergyKWh.toFixed(4) + " kWh",
    }); // Format output
  } catch (error) {
    res.status(500).json({
      message: "❌ Error calculating energy consumption",
      error: error.message,
    });
  }
};

exports.getDataStreamByDevice = async (req, res) => {
  try {
    const { deviceLabel } = req.params; // Extract deviceLabel from URL parameters
    const datastreams = await datastreamService.getDatastreamByDeviceLabel(
      deviceLabel
    );
    res.json({datastreams}); // Format output
  } catch (error) {
    res.status(500).json({
      message: "❌ Error calculating energy consumption",
      error: error.message,
    });
  }
};
