// services.js
const prisma = require("../lib/prisma"); // Adjust path as necessary

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
