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
  { timestampStart, timestampEnd, validAnomaly, actionTaken }
) => {
  return prisma.anomaly.update({
    where: { id },
    data: {
      timestamp_start: timestampStart,
      timestamp_end: timestampEnd,
      valid_anomaly: validAnomaly,
      action_taken: actionTaken,
    },
  });
};

exports.deleteAnomaly = async (id) => {
  return prisma.anomaly.delete({
    where: { id },
  });
};

exports.updateValidAnomaly = async (id, validAnomaly) => {
  return prisma.anomaly.update({
    where: { id },
    data: {
      valid_anomaly: validAnomaly,
    },
  });
};

exports.updateActionTaken = async (id, actionTaken) => {
  return prisma.anomaly.update({
    where: { id },
    data: {
      action_taken: actionTaken,
      valid_anomaly: actionTaken ? true : undefined, // Preserving original logic
    },
  });
};

exports.listAllAnomalies = async () => {
  return prisma.anomaly.findMany();
};
