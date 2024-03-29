const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = async (req, res) => {
  console.log("Running the anomaly check task");

  try {
    const devices = await prisma.device.findMany();

    for (const device of devices) {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60000);
      const anomalies = await prisma.sagemakerAnomaly.findMany({
        where: {
          device_label: device.device_label,
          timestamp: {
            gte: thirtyMinutesAgo,
          },
        },
      });

      const totalAnomalies = anomalies.length;

      // Check if no anomalies were detected
      if (totalAnomalies === 0) {
        console.log(
          `No anomalies detected for device label: ${device.device_label} in the last 30 minutes.`
        );
        continue;
      }

      const anomaliesDetected = anomalies.filter(
        (a) => a.isofAnomaly || a.lstmAnomaly
      ).length;
      const percentage = (anomaliesDetected / totalAnomalies) * 100;

      if (percentage > 80) {
        await prisma.anomaly.create({
          data: {
            device_label: device.device_label,
            timestamp_start: thirtyMinutesAgo,
            timestamp_end: new Date(),
            valid_anomaly: undefined,
            action_taken: undefined,
          },
        });
        console.log(
          `Anomaly record created for device label: ${device.device_label}`
        );
      }
    }

    res.status(200).json({ message: "Anomaly check completed" });
  } catch (error) {
    console.error("❌ Error occurred during the anomaly check:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
