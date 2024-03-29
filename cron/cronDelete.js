const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  console.log("Running the data deletion task");

  try {
    // Delete all entries from Datastream table
    const deleteDatastreams = prisma.datastream.deleteMany({});
    // Delete all entries from SagemakerAnomaly table
    const deleteSagemakerAnomalies = prisma.sagemakerAnomaly.deleteMany({});

    // Execute the deletion operations in parallel
    await prisma.$transaction([deleteDatastreams, deleteSagemakerAnomalies]);

    console.log(
      "All Datastream and SagemakerAnomaly records have been deleted."
    );

    // Assuming this script could be run as part of an Express route or standalone
    if (res) {
      res
        .status(200)
        .json({ message: "Data deletion completed successfully." });
    }
  } catch (error) {
    console.error("❌ Error occurred during the data deletion task:", error);
    if (res) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
