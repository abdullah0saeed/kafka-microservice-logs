const router = require("express").Router();

const { getLogs } = require("../controller/logController");
const LogModel = require("../dbModels/logModel");
const { kafkaProducer } = require("../kafka/kafkaProducer");

router.get("/", async (req, res) => {
  const { userId, page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  if (!userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const filter = {
    userId,
  };

  try {
    const data = await getLogs(filter, pageNumber, limitNumber);
    res
      .status(data.status)
      .json(data.status === 200 ? data.logs : data.message);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//////////////////////////////////////////////////////////////////////////////?
router.post("/", async (req, res) => {
  const { userId, action, timestamp } = req.body;

  if (!userId || !action) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const log = { userId, action, timestamp: timestamp || new Date() };

  try {
    await kafkaProducer(log);
    res.status(201).json(log);
  } catch (error) {
    console.error("Error saving log:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
