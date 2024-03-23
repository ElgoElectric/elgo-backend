const express = require("express");
const userController = require("../controllers/users.controller.js"); // Adjust path as needed
const router = express.Router();

router.post("/create", userController.createUser);
router.get("/:userId", userController.getUserById);
router.patch("/:userId", userController.updateUser);
router.get("/", userController.listAllUsers);
router.get("/:userId/devices", userController.getDevicesByUserId);

module.exports = router;
