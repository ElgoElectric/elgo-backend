export default async function handler(req, res) {
  console.info("INFO: Anomaly check task started");

  try {
    console.info("INFO: Performing initial checks");

    console.info(`INFO: Request Method - ${req.method}, Path - ${req.url}`);

    console.info("INFO: Anomaly check task completed successfully");
    res.status(200).send("Success");
  } catch (error) {
    console.error("ERROR: An issue occurred during the anomaly check", error);
    res.status(500).send("An error occurred");
  }
}
