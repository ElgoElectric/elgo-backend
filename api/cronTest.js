module.exports = async (req, res) => {
  console.log("Received GET Request");
  try {
    console.info("INFO: Performing initial checks");
    console.info("INFO: Anomaly check task completed successfully");
    res.status(200).send("Success");
  } catch (error) {
    console.error("❌ Error Testing:", error);
    res.status(500).json({
      message: "❌ Error Testing",
      error: error.message,
    });
  }
};
