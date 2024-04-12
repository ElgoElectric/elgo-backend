const deviceService = require("../services/device.service.js"); // Adjust the path as needed
const AWS = require("aws-sdk");
const awsIot = require("aws-iot-device-sdk");
const { Mutex } = require("async-mutex");
let temp;

// Setup AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const mutex = new Mutex();

// Function to download a file from S3
async function downloadFromS3(bucket, key) {
  const params = {
    Bucket: bucket,
    Key: key,
  };
  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) reject(err);
      else resolve(data.Body);
    });
  });
}

async function initIoTDevice() {
  try {
    const privateKey = await downloadFromS3(
      process.env.AWS_S3_BUCKET,
      process.env.AWS_S3_PKEY
    );
    const certificate = await downloadFromS3(
      process.env.AWS_S3_BUCKET,
      process.env.AWS_S3_CERT
    );
    const caCertificate = await downloadFromS3(
      process.env.AWS_S3_BUCKET,
      process.env.AWS_S3_CA1
    );

    const iot_connector = awsIot.device({
      privateKey: Buffer.from(privateKey),
      clientCert: Buffer.from(certificate),
      caCert: Buffer.from(caCertificate),
      clientId: "iotconsole-elgo-client-06",
      host: process.env.AWS_IOT_ENDPOINT,
    });

    return iot_connector;
  } catch (error) {
    console.error("Failed to initialize IoT Device:", error);
    throw error;
  }
}

async function publishTemperatureUpdate(temp) {
  try {
    const payload = JSON.stringify({ temp: temp });
    const iot_connector = await initIoTDevice();
    console.log("IoT Device initialized successfully");

    // Now that we have the iot_connector, we can publish the message
    iot_connector.publish("elgo/v1/device/hvac/setTemp", payload, () => {
      console.log(`Message published to elgo/v1/device/hvac/setTemp`);
    });
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}

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
  const release = await mutex.acquire(); // Acquire the lock
  try {
    temp = req.body.temp; // Assuming temp is validated and exists
    await publishTemperatureUpdate(temp);
    res.status(200).json({ message: "Published" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to set temperature", error: error.message });
  } finally {
    release(); // Always release the lock, even if an error occurs
  }
};

exports.getHVACTemp = async (req, res) => {
  const release = await mutex.acquire();
  try {
    res.set({
      "Cache-Control": "no-store, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    });
    res.status(200).json({ temp: temp });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to get temperature", error: error.message });
  } finally {
    release(); // Always release the lock, even if an error occurs
  }
};
