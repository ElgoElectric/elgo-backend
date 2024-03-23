const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/device.controller.js"); // Adjust the path as needed

router.post("/createDevice", deviceController.createDevice);
router.get("/:deviceLabel", deviceController.getDeviceByLabel);
router.patch("/:deviceLabel", deviceController.updateDevice);
router.delete("/:deviceLabel", deviceController.deleteDevice);
router.get("/user-devices/:userId", deviceController.getDevicesByUserId);
router.get("/", deviceController.listAllDevices);

module.exports = router;
