const express = require("express");
const anomalyRouter = require("../src/routes/anomaly.routes.js"); // make sure the path points to your anomaly router file
const deviceRouter = require("../src/routes/device.routes.js");
const userRouter = require("../src/routes/user.routes.js");
const datastreamRouter = require("../src/routes/datastream.routes.js");
const sagemakeranomalyRouter = require("../src/routes/sagemakeranomaly.routes.js");
const app = express();
const handler = require("../cron/cronAnomaly.js");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(express.json());

app.use("/anomalies", anomalyRouter);
app.use("/devices", deviceRouter);
app.use("/users", userRouter);
app.use("/sagemakerAnomalies", sagemakeranomalyRouter);
app.get("/anomalyChecker/cron", handler);
app.use("/datastreams", datastreamRouter);

app.get("/", (req, res) => {
  console.info("INFO: Server Started Successfully");
  res.json({ "message:": "Welcome to Elgo API" });
});

// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Export the server for Vercel
module.exports = app;
