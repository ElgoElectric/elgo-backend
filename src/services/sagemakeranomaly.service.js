const prisma = require("../../lib/prisma.js"); // Ensure this path is correct for your project setup

// Create a SagemakerAnomaly
exports.createSagemakerAnomaly = async (data) => {
  return prisma.sagemakerAnomaly.create({
    data: data,
  });
};

// Get a SagemakerAnomaly by ID
exports.getSagemakerAnomalyById = async (id) => {
  return prisma.sagemakerAnomaly.findUnique({
    where: { id: id },
  });
};

// List all SagemakerAnomalies
exports.listSagemakerAnomalies = async () => {
  return prisma.sagemakerAnomaly.findMany();
};

// Update a SagemakerAnomaly by ID
exports.updateSagemakerAnomaly = async (id, updateData) => {
  return prisma.sagemakerAnomaly.update({
    where: { id: id },
    data: updateData,
  });
};

// Delete a SagemakerAnomaly by ID
exports.deleteSagemakerAnomaly = async (id) => {
  return prisma.sagemakerAnomaly.delete({
    where: { id: id },
  });
};
