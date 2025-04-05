const { Kafka } = require("kafkajs");
const { KAFKA_BROKER, APP_NAME } = process.env;
const LogModel = require("../dbModels/logModel");

const kafka = new Kafka({
  clientId: APP_NAME,
  brokers: [KAFKA_BROKER],
});
const consumer = kafka.consumer({ groupId: `${APP_NAME}-group` });

exports.kafkaConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Connected to Kafka Consumer");

    await consumer.subscribe({ topic: "userEvents", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const log = JSON.parse(message.value.toString());

        await LogModel.create(log);
        console.log("Message received and saved to MongoDB:", log);
      },
    });
  } catch (error) {
    console.error("Error in Kafka Consumer:", error);
  }
};
