"use client"

import { motion } from "framer-motion"
import { Search, CreditCard, Bell, Users, type LucideIcon } from "lucide-react"
import type React from "react" // Added import for React

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureCardProps extends Feature {
  index: number
}

const features: Feature[] = [
  {
    icon: Search,
    title: "Easy Event Discovery",
    description: "Find events that match your interests with our powerful search and recommendation engine.",
  },
  {
    icon: CreditCard,
    title: "Secure Booking",
    description: "Book tickets with confidence using our secure payment system.",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Stay updated with event changes, reminders, and special offers through instant notifications.",
  },
  {
    icon: Users,
    title: "Social Features",
    description: "Connect with friends, share events, and see what's popular in your network.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose evynt?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-card p-6 rounded-lg shadow-md"
  >
    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
)

