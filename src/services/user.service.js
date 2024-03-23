const prisma = require("../../lib/prisma.js");

exports.createUser = async (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

exports.getUserById = async (userId) => {
  return prisma.user.findUnique({
    where: { user_id: userId },
  });
};

exports.updateUser = async (userId, updateData) => {
  return prisma.user.update({
    where: { user_id: userId },
    data: updateData,
  });
};

exports.deleteUser = async (userId) => {
  return prisma.user.delete({
    where: { user_id: userId },
  });
};

exports.listAllUsers = async () => {
  return prisma.user.findMany();
};

exports.getDevicesByUserId = async (userId) => {
  return prisma.user.findUnique({
    where: { user_id: userId },
    select: {
      devices: {
        select: {
          id: true,
          user_id: true,
          email: true,
          // Exclude related entities from the devices
          anomalies: false,
          datastreams: false,
          sagemakerAnomalies: false,
        },
      },
    },
  });
};
