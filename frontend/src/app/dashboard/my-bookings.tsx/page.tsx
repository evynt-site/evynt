"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import AuthHeader from "../../components/AuthHeader"
import { Calendar, MapPin, Clock } from "lucide-react"
import type React from "react"

interface Booking {
  id: number
  eventName: string
  date: string
  time: string
  location: string
}

interface BookingCardProps extends Booking {
  index: number
}

// Mock data for bookings
const mockBookings: Booking[] = [
  {
    id: 1,
    eventName: "Summer Music Festival",
    date: "2023-07-15",
    time: "14:00",
    location: "Central Park, New York",
  },
  {
    id: 2,
    eventName: "Tech Conference 2023",
    date: "2023-08-22",
    time: "09:00",
    location: "Convention Center, San Francisco",
  },
  { id: 3, eventName: "Food and Wine Expo", date: "2023-09-10", time: "11:00", location: "Exposition Hall, Chicago" },
]

export default function MyBookings() {
  const [bookings] = useState<Booking[]>(mockBookings)

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-foreground mb-8"
        >
          My Bookings
        </motion.h1>
        <div className="grid gap-6">
          {bookings.map((booking, index) => (
            <BookingCard key={booking.id} {...booking} index={index} />
          ))}
        </div>
      </main>
    </div>
  )
}

const BookingCard: React.FC<BookingCardProps> = ({ eventName, date, time, location, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="bg-card rounded-lg shadow-md overflow-hidden"
  >
    <div className="p-6">
      <h3 className="text-xl font-semibold text-card-foreground mb-4">{eventName}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock className="w-5 h-5 mr-2" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  </motion.div>
)

