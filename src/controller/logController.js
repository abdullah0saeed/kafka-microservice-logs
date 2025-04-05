const { status } = require("express/lib/response");
const LogModel = require("../dbModels/logModel");
const { kafkaProducer } = require("../kafka/kafkaProducer");

exports.getLogs = async (filter, page, limit) => {
  console.log("getting logs");

  try {
    const logs = await LogModel.find(filter || {})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ timestamp: -1 });
    return { logs, status: 200 };
  } catch (error) {
    console.error("Error fetching logs:", error);
    return { message: "Internal server error", status: 500 };
  }
};

////////////////////////////////////////////////////////////////////////?

exports.createLog = async (log) => {
  const { userId, action, timestamp } = log;

  if (!userId || !action) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newLog = { userId, action, timestamp: timestamp || new Date() };

  try {
    await kafkaProducer(newLog);
    res.status(201).json(newLog);
  } catch (error) {
    console.error("Error saving log:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
