"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Calendar, MapPin } from "lucide-react"
import AuthHeader from "../components/AuthHeader"
import PaymentSidebar from "../components/PaymentSidebar"
import Link from "next/link"
import type React from "react"

interface Event {
  id: number
  title: string
  date: string
  location: string
  image: string
}

interface EventCardProps {
  event: Event
  index: number
  onBookNow: () => void
}

const events: Event[] = [
  {
    id: 1,
    title: "Summer Music Festival",
    date: "2023-07-15",
    location: "Central Park, New York",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Tech Conference 2023",
    date: "2023-08-22",
    location: "Convention Center, San Francisco",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Food and Wine Expo",
    date: "2023-09-10",
    location: "Exposition Hall, Chicago",
    image: "/placeholder.svg",
  },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isPaymentSidebarOpen, setIsPaymentSidebarOpen] = useState(false)

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-foreground"
          >
            Browse Events
          </motion.h1>
          <Link href="/dashboard/my-bookings">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
            >
              My Bookings
            </motion.button>
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </motion.div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} onBookNow={() => setIsPaymentSidebarOpen(true)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
      <PaymentSidebar isOpen={isPaymentSidebarOpen} onClose={() => setIsPaymentSidebarOpen(false)} />
    </div>
  )
}

const EventCard: React.FC<EventCardProps> = ({ event, index, onBookNow }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
    className="bg-card rounded-lg shadow-md overflow-hidden"
  >
    <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-card-foreground mb-2">{event.title}</h3>
      <p className="text-muted-foreground mb-2 flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        {event.date}
      </p>
      <p className="text-muted-foreground flex items-center">
        <MapPin className="w-4 h-4 mr-2" />
        {event.location}
      </p>
    </div>
    <div className="px-4 py-3 bg-accent">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-colors"
        onClick={onBookNow}
      >
        Book Now
      </motion.button>
    </div>
  </motion.div>
)

