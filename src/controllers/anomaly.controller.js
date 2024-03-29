const anomalyService = require("../services/anomaly.service.js");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const prisma = require("../../lib/prisma.js");

exports.createAnomaly = async (req, res) => {
  console.log("Received request body:", req.body);
  try {
    const anomalyData = { ...req.body };
    const convertTimestamp = (timestamp) => `${timestamp}.000Z`;

    // Convert timestamps
    if (anomalyData.timestamp_start) {
      anomalyData.timestamp_start = convertTimestamp(
        anomalyData.timestamp_start
      );
    }
    if (anomalyData.timestamp_end) {
      anomalyData.timestamp_end = convertTimestamp(anomalyData.timestamp_end);
    }
    const device = await prisma.device.findUnique({
      where: { device_label: anomalyData.device_label },
      include: { user: true },
    });

    if (!device || !device.user) {
      return res.status(404).json({ message: "Device or user not found." });
    }

    const msg = {
      to: device.user.email,
      from: process.env.SENDGRID_VERIFIED_SENDER,
      subject: `Anomaly Detected in `,
      text: `An anomaly has been detected in ${anomalyData.device_label} from ${anomalyData.timestamp_start} to ${anomalyData.timestamp_end}. Please visit the website to take action.`,
      html: `
        <strong>Anomaly Detected</strong><br>
        An anomaly has been detected in <b>${anomalyData.device_label}</b> from <b>${anomalyData.timestamp_start}</b> to <b>${anomalyData.timestamp_end}</b>.<br>
        Please <a href="https://elgoapp.com/">visit our website</a> to take action.
      `,
    };

    // Send the email
    await sgMail.send(msg);
    console.log("Email sent successfully.");

    // Proceed to create the anomaly with the provided data
    const newAnomaly = await anomalyService.createAnomaly(anomalyData);
    res.json(newAnomaly);
  } catch (error) {
    console.error("❌ Failed to send email or create anomaly:", error);

    if (error.response) {
      console.error("Response body:", error.response.body);
    }

    res.status(500).json({
      message: "❌ Error sending email or creating anomaly",
      error: error.message,
    });
  }
};
exports.updateAnomalyActionTaken = async (req, res) => {
  try {
    const { id, action_taken } = req.body;

    if (action_taken) {
      const anomaly = await prisma.anomaly.findUnique({
        where: { id },
        include: {
          device: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!anomaly) {
        return res.status(404).json({ message: "Anomaly not found." });
      }

      const { device_label, timestamp_start, timestamp_end } = anomaly;
      const userName = anomaly.device.user.name;

      const msg = {
        to: process.env.SERVICE_EMAIL_ADDRESS,
        from: process.env.SENDGRID_VERIFIED_SENDER,
        subject: "Service Scheduled Notification",
        text: `A service has been scheduled by ${userName} for device ${device_label}. Anomaly detected from ${timestamp_start} to ${timestamp_end}.`,
        html: `<p>A service has been scheduled by <strong>${userName}</strong> for device <strong>${device_label}</strong>. Anomaly detected from <strong>${timestamp_start}</strong> to <strong>${timestamp_end}</strong>.</p>`,
      };

      // Send the email
      await sgMail.send(msg);
      console.log("Email sent successfully.");
    }

    // Update the anomaly action taken status
    const updatedAnomaly = await anomalyService.updateActionTaken(
      id,
      action_taken
    );
    res.json(updatedAnomaly);
  } catch (error) {
    console.error("❌ Failed to send email or update anomaly:", error);
    res.status(500).json({
      message: "❌ Error updating action taken for anomaly or sending email",
      error: error.message,
    });
  }
};

exports.updateAnomalyValidity = async (req, res) => {
  try {
    const { id, valid_anomaly } = req.body;
    const updatedAnomaly = await anomalyService.updateAnomaly(id, {
      valid_anomaly,
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
