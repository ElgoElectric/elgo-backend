const prisma = require("../../lib/prisma.js");

exports.createAnomaly = async (anomalyData) => {
  return prisma.anomaly.create({ data: anomalyData });
};

exports.getAnomalyById = async (id) => {
  return prisma.anomaly.findUnique({
    where: { id },
  });
};

exports.listAnomaliesByDeviceLabel = async (deviceLabel) => {
  return prisma.anomaly.findMany({
    where: { device_label: deviceLabel },
  });
};

exports.updateAnomaly = async (
  id,
  { timestampStart, timestampEnd, valid_anomaly, action_taken }
) => {
  return prisma.anomaly.update({
    where: { id },
    data: {
      timestamp_start: timestampStart,
      timestamp_end: timestampEnd,
      valid_anomaly: valid_anomaly,
      action_taken: action_taken,
    },
  });
};

exports.deleteAnomaly = async (id) => {
  return prisma.anomaly.delete({
    where: { id },
  });
};

exports.updateValidAnomaly = async (id, valid_anomaly) => {
  return prisma.anomaly.update({
    where: { id },
    data: {
      valid_anomaly: valid_anomaly,
    },
  });
};

exports.updateActionTaken = async (id, action_taken) => {
  return prisma.anomaly.update({
    where: { id },
    data: {
      action_taken: action_taken,
      valid_anomaly: action_taken ? true : undefined, // Preserving original logic
    },
  });
};

exports.listAnomaliesByTimeFrame = async (deviceLabel, hours) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setHours(endDate.getHours() - hours);

  return prisma.anomaly.findMany({
    where: {
      device_label: deviceLabel,
      timestamp_start: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
};

exports.listAllAnomalies = async () => {
  return prisma.anomaly.findMany();
};
