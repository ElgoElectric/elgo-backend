// services.js
const prisma = require("../../lib/prisma.js");
exports.createDatastream = async (data) => {
  return prisma.datastream.create({
    data,
  });
};

exports.getDatastreamById = async (id) => {
  return prisma.datastream.findUnique({
    where: { id },
  });
};

exports.updateDatastream = async (id, updateData) => {
  return prisma.datastream.update({
    where: { id },
    data: updateData,
  });
};

exports.deleteDatastream = async (id) => {
  return prisma.datastream.delete({
    where: { id },
  });
};

exports.listAllDatastreams = async () => {
  return prisma.datastream.findMany();
};

exports.getDatastreamsByTimestampRange = async (
  startTimestamp,
  endTimestamp
) => {
  return prisma.datastream.findMany({
    where: {
      timestamp: {
        gte: new Date(startTimestamp),
        lte: new Date(endTimestamp),
      },
    },
  });
};

exports.calculateEnergyConsumption = async (deviceLabel) => {
  const datastreams = await prisma.datastream.findMany({
    where: { device_label: deviceLabel },
    select: { power: true, timestamp: true },
  });

  const totalEnergyKWh = datastreams.reduce((total, { power }) => {
    return total + (Number(power) / 1000) * (8 / 3600);
  }, 0);

  return totalEnergyKWh;
};

exports.getDatastreamByDeviceLabel = async (deviceLabel) => {
  const datastreams = await prisma.datastream.findMany({
    where: { device_label: deviceLabel }
  });

  return datastreams;
};