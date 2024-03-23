const userService = require("../services/user.service.js"); // Adjust path as needed

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error creating user", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error retrieving user", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.userId,
      req.body
    );
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error updating user", error: error.message });
  }
};

exports.listAllUsers = async (req, res) => {
  try {
    const users = await userService.listAllUsers();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error listing users", error: error.message });
  }
};

exports.getDevicesByUserId = async (req, res) => {
  try {
    const devices = await userService.getDevicesByUserId(req.params.userId);
    res.json(devices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error retrieving devices", error: error.message });
  }
};
