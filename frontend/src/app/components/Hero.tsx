"use client"

import { motion } from "framer-motion"
import { Calendar, Ticket, Bell, type LucideIcon } from "lucide-react"
import type React from "react"

interface FeatureIconProps {
  Icon: LucideIcon
  text: string
}

export default function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-foreground mb-6"
        >
          Discover, Book, and Experience Amazing Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          evynt makes it easy to find and book tickets for the events you love, all in one place.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-lg hover:bg-primary/90 transition-colors">
            Get Started
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex justify-center space-x-8"
        >
          <FeatureIcon Icon={Calendar} text="Browse Events" />
          <FeatureIcon Icon={Ticket} text="Book Tickets" />
          <FeatureIcon Icon={Bell} text="Get Notified" />
        </motion.div>
      </div>
    </section>
  )
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ Icon, text }) => (
  <div className="flex flex-col items-center">
    <div className="bg-primary/10 p-3 rounded-full">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <span className="mt-2 text-sm text-muted-foreground">{text}</span>
  </div>
)

