import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./models/index.js";
import Booking from "./models/booking.js";
import amqp from "amqplib";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

let userdata = {} //stores the users data

// Middleware to fetch user ID from Laravel Sanctum
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const response = await axios.get(process.env.USER_SERVICE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    req.user = response.data; // Attach user data to request
    userdata = req.user //save users data
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Sync database (Creates table if not exists)
sequelize.sync().then(() => {
  console.log("Database synchronized.");
});

// RabbitMQ Publisher Function
async function publishBookingEvent(booking) {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_HOST);
      const channel = await connection.createChannel();
      const queue = process.env.RABBITMQ_QUEUE;
  
      await channel.assertQueue(queue, { durable: true });
      console.log(userdata.email_id)
      const message = JSON.stringify({
        booking_id: booking.id,
        user_id: booking.user_id,
        event_id: booking.event_id,
        status: "CONFIRMED",
        email: userdata.email
      });
  
      channel.sendToQueue(queue, Buffer.from(message));
      console.log("📩 Booking Event Published:", message);
  
      setTimeout(() => {
        connection.close();
      }, 500);
    } catch (error) {
      console.error("❌ RabbitMQ Publish Error:", error.message);
    }
  }

// Create Booking with RabbitMQ
app.post("/bookings", authenticateUser, async (req, res) => {
    const { event_id } = req.body;
    const user_id = req.user.id;
  
    if (!event_id) {
      return res.status(400).json({ error: "Missing event_id" });
    }
    try {
      const booking = await Booking.create({ user_id, event_id });
        
      await publishBookingEvent(booking);
  
      res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
      res.status(500).json({ error: "Database error", details: error.message });
    }
  });

// Get all bookings
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Booking Service running on port ${PORT}`);
});