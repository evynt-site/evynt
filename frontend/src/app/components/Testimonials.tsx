/* eslint-disable react/no-unescaped-entities */

"use client"

import { motion } from "framer-motion"
import type React from "react"

interface Testimonial {
  name: string
  role: string
  content: string
}

interface TestimonialCardProps extends Testimonial {
  index: number
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Event Organizer",
    content:
      "evynt has revolutionized the way I manage my events. It's user-friendly and packed with features that make my job easier.",
  },
  {
    name: "Michael Chen",
    role: "Regular Attendee",
    content:
      "I love how easy it is to find and book tickets for events I'm interested in. The notification system is a game-changer!",
  },
  {
    name: "Emily Rodriguez",
    role: "Music Enthusiast",
    content:
      "Thanks to evynt, I never miss out on concerts from my favorite artists. The app is intuitive and the booking process is smooth.",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, content, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-card p-6 rounded-lg shadow-md"
  >
    <p className="text-muted-foreground mb-4">"{content}"</p>
    <div>
      <p className="font-semibold text-foreground">{name}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  </motion.div>
)

