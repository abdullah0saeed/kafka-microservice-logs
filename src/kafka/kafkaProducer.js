const { Kafka } = require("kafkajs");
const { KAFKA_BROKER, APP_NAME } = process.env;

const kafka = new Kafka({
  clientId: APP_NAME,
  brokers: [KAFKA_BROKER],
});

const producer = kafka.producer();

exports.kafkaProducer = async (log) => {
  try {
    await producer.connect();
    console.log("Connected to Kafka Producer");

    const message = {
      topic: "userEvents",
      messages: [
        {
          value: JSON.stringify(log),
        },
      ],
    };

    await producer.send(message);
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message to Kafka:", error);
  } finally {
    await producer.disconnect();
  }
};
