const deviceService = require("../services/device.service.js"); // Adjust the path as needed

exports.createDevice = async (req, res) => {
  try {
    const deviceData = req.body;
    const device = await deviceService.createDevice(deviceData);
    res.status(201).json(device);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to create device", error: error.message });
  }
};

exports.getDeviceByLabel = async (req, res) => {
  try {
    const { deviceLabel } = req.params; // Assuming deviceLabel is a URL parameter
    const device = await deviceService.getDeviceByLabel(deviceLabel);
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ message: "👀 Device not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to retrieve device", error: error.message });
  }
};

exports.updateDevice = async (req, res) => {
  try {
    const { deviceLabel } = req.params; // Assuming deviceLabel is a URL parameter
    const updateData = req.body;
    const updatedDevice = await deviceService.updateDevice(
      deviceLabel,
      updateData
    );
    res.json(updatedDevice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to update device", error: error.message });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const { deviceLabel } = req.params; // Assuming deviceLabel is a URL parameter
    await deviceService.deleteDevice(deviceLabel);
    res.json({ message: "✅ Device deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to delete device", error: error.message });
  }
};

exports.getDevicesByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is a URL parameter
    const devices = await deviceService.getDevicesByUserId(userId);
    res.json(devices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to retrieve devices", error: error.message });
  }
};

exports.listAllDevices = async (req, res) => {
  try {
    const devices = await deviceService.listAllDevices();
    res.json(devices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to list devices", error: error.message });
  }
};
