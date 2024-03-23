const prisma = require("../../lib/prisma.js");

exports.createDevice = async (deviceData) => {
  return prisma.device.create({
    data: deviceData,
  });
};

exports.getDeviceByLabel = async (deviceLabel) => {
  return prisma.device.findUnique({
    where: { device_label: deviceLabel },
    select: {
      id: true,
      device_label: true,
      user_id: true,
      // Explicitly exclude relations by setting them to false
      anomalies: false,
      datastreams: false,
      sagemakerAnomalies: false,
    },
  });
};

exports.updateDevice = async (deviceLabel, updateData) => {
  return prisma.device.update({
    where: { device_label: deviceLabel },
    data: updateData,
  });
};

exports.getDevicesByUserId = async (userId) => {
  return prisma.device.findMany({
    where: { user_id: userId },
    select: {
      id: true,
      device_label: true,
      user_id: true,
      // Exclude related entities from the result
      anomalies: false,
      datastreams: false,
      sagemakerAnomalies: false,
    },
  });
};

exports.deleteDevice = async (deviceLabel) => {
  return prisma.device.delete({
    where: { device_label: deviceLabel },
  });
};

exports.listAllDevices = async () => {
  return prisma.device.findMany({
    select: {
      id: true,
      device_label: true,
      user_id: true,
      // Exclude related entities from the result
      anomalies: false,
      datastreams: false,
      sagemakerAnomalies: false,
    },
  });
};
