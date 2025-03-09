import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./models/index.js";
import Booking from "./models/booking.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Sync database (Creates table if not exists)
sequelize.sync().then(() => {
  console.log("Database synchronized.");
});

// Create a booking
app.post("/bookings", authenticateUser, async (req, res) => {
  const { event_id, tickets } = req.body;
  const user_id = req.user.id;

  if (!event_id ) {
    return res.status(400).json({ error: "Missing event_id" });
  }

  try {
    const booking = await Booking.create({ user_id, event_id });
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
