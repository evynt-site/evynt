const amqplib = require("amqplib");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_HOST;
const QUEUE_NAME = process.env.RABBITMQ_QUEUE;

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  const sendEmail = async (email, event_id) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Booking Confirmation",
      text: `Your booking for event ID ${event_id} has been confirmed! 🎉`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent to:", email);
    } catch (error) {
      console.error("❌ Error sending email:", error);
    }
  };

const consumeQueue = async () => {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log("📩 Waiting for messages...");
    channel.consume(
      QUEUE_NAME,
      async (msg) => {
        if (msg !== null) {
          const booking = JSON.parse(msg.content.toString());
          console.log("📥 Received message:", booking);
          await sendEmail(booking.email, booking.event_id);
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("❌ Consumer failed:", error);
  }
};

// Start consuming messages
consumeQueue();
