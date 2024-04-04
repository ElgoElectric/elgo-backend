const deviceService = require("../services/device.service.js"); // Adjust the path as needed
const AWS = require("aws-sdk");
const awsIot = require("aws-iot-device-sdk");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // Make sure to set this to your region
});
const iot_connector = awsIot.device({
  keyPath: path.join(
    __dirname,
    "device_certs/6024c861f896c261591a1696f27f858054aee5ddafaa47e36ae42065258c2f62-private.pem.key"
  ),
  certPath: path.join(
    __dirname,
    "device_certs/6024c861f896c261591a1696f27f858054aee5ddafaa47e36ae42065258c2f62-certificate.pem.crt"
  ),
  caPath: path.join(__dirname, "device_certs/AmazonRootCA1.pem"),
  clientId: "iotconsole-elgo-client-06",
  host: "a1smcl0622itjw-ats.iot.us-east-1.amazonaws.com",
});

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

exports.setHVACTemp = async (req, res) => {
  try {
    // Assuming you've validated req.body and req.body.temp exists
    const temp = req.body.temp;

    // Prepare the payload
    const payload = JSON.stringify({ temp: temp });

    // Publish a message to the specified MQTT topic
    iot_connector.publish("elgo/v1/device/hvac/setTemp", payload, () => {
      console.log(`Message published to elgo/v1/user/HVAC/setTemp`);
    });
    res.status(200).json({ message: "Published" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to list devices", error: error.message });
  }
};
