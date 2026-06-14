const express = require("express");
const { getAllLogs } = require("../controllers/logController");

const router = express.Router();

// Log Routes
router.get("/", getAllLogs);  // GET /api/logs → Get all logs

module.exports = router;
