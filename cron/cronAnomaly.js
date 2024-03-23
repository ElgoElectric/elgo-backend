const cron = require("node-cron");
const prisma = require("./prismaClient"); // Adjust the path to your Prisma client setup

cron.schedule("*/30 * * * *", async () => {
  console.log("Running a task every 30 minutes");

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
          valid_anomaly: true,
          action_taken: false,
        },
      });
      console.log(
        `Anomaly record created for device label: ${device.device_label}`
      );
    }
  }
});
