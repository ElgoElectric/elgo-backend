const express = require("express");
const router = express.Router();
// Device controller
const deviceController = require("../controllers/device.controller.js"); // Adjust the path as needed

// Device routes
router.post("/createDevice", deviceController.createDevice); // Create a new device
router.get("/:deviceLabel", deviceController.getDeviceByLabel); // Get a specific device by device label
router.patch("/:deviceLabel", deviceController.updateDevice); // Update a device by device label
router.delete("/:deviceLabel", deviceController.deleteDevice); // Delete a device by device label
router.get("/", deviceController.listAllDevices); // List all devices

module.exports = router;
