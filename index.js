const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.use("/api/logs", require("./src/routes/logRouter"));

app.use("/", (req, res) => {
  res.send("Welcome to the Kafka logger service!");
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("MongoDB connected");

    require("./src/kafka/kafkaConsumer").kafkaConsumer();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
