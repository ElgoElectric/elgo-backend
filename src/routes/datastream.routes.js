// routes.js
const express = require("express");
const router = express.Router();
const datastreamController = require("../controllers/datastream.controller.js"); // Adjust path as necessary

router.post("/", datastreamController.createDatastream);
router.get("/:id", datastreamController.getDatastreamById);
router.patch("/:id", datastreamController.updateDatastream);
router.delete("/:id", datastreamController.deleteDatastream);
router.get("/", datastreamController.listAllDatastreams);
router.get("/bytimestamp", datastreamController.getDatastreamsByTimestampRange);
router.get(
  "/:deviceLabel/energy",
  datastreamController.getEnergyConsumptionByDevice
);
router.get("/deviceLabel/:deviceLabel", datastreamController.getDataStreamByDevice);

module.exports = router;