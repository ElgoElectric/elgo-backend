// routes.js
const express = require("express");
const router = express.Router();
const datastreamController = require("../controllers/datastream.controller"); // Adjust path as necessary

router.post("/", datastreamController.createDatastream);
router.get("/:id", datastreamController.getDatastreamById);
router.patch("/:id", datastreamController.updateDatastream);
router.delete("/:id", datastreamController.deleteDatastream);
router.get("/", datastreamController.listAllDatastreams);
router.get("/bytimestamp", datastreamController.getDatastreamsByTimestampRange);

module.exports = router;
