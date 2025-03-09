"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Calendar, MapPin, DollarSign } from "lucide-react"
import AuthHeader from "../components/AuthHeader"
import PaymentSidebar from "../components/PaymentSidebar"
import Link from "next/link"
import type React from "react"

interface Event {
  id: number
  name: string
  date: string
  location: string
  price: number
  availability?: boolean
  image?: string
}

interface EventCardProps {
  event: Event
  index: number
  onBookNow: (eventId: number) => void
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isPaymentSidebarOpen, setIsPaymentSidebarOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://127.0.0.1:5000/events/available')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`)
        }
        
        const data = await response.json()
        setEvents(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching events:', err)
        setError('Failed to load events. Please try again later.')
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleBookNow = (eventId: number) => {
    setSelectedEventId(eventId)
    // Store the selected event ID in local storage
    localStorage.setItem('selected_event_id', eventId.toString())
    setIsPaymentSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setIsPaymentSidebarOpen(false)
    // We keep the selectedEventId in state and localStorage until payment is completed or cancelled
    // If you want to clear it on sidebar close, uncomment the next line
    // localStorage.removeItem('selected_event_id')
  }

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-destructive/20 text-destructive p-4 rounded-md mb-6"
          >
            {error}
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    index={index} 
                    onBookNow={handleBookNow}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12 text-muted-foreground"
                >
                  No events found matching your search.
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
      <PaymentSidebar 
        isOpen={isPaymentSidebarOpen} 
        onClose={handleSidebarClose} 
        selectedEventId={selectedEventId} // Pass selectedEventId as a prop
      />
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
    <img 
      src={`https://picsum.photos/seed/${event.id}/400/240`} 
      alt={event.name} 
      className="w-full h-48 object-cover" 
    />
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-card-foreground">{event.name}</h3>
        <div className="flex items-center text-primary font-medium bg-primary/10 px-2 py-1 rounded">
          <DollarSign className="w-4 h-4 mr-1" />
          {event.price.toFixed(2)}
        </div>
      </div>
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
        onClick={() => onBookNow(event.id)}
      >
        Book Now
      </motion.button>
    </div>
  </motion.div>
)