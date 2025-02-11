"use client"

import { motion } from "framer-motion"
import { Search, Ticket, Smile, type LucideIcon } from "lucide-react"
import type React from "react" // Added import for React

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

interface StepProps extends Step {
  index: number
}

const steps: Step[] = [
  {
    icon: Search,
    title: "Find Your Event",
    description:
      "Browse through our curated list of events or use our search feature to find exactly what you're looking for.",
  },
  {
    icon: Ticket,
    title: "Book Your Tickets",
    description: "Select your preferred tickets and securely complete your purchase with our easy booking process.",
  },
  {
    icon: Smile,
    title: "Enjoy the Experience",
    description:
      "Receive your e-tickets instantly and get ready to create unforgettable memories at your chosen event.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <Step key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const Step: React.FC<StepProps> = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="flex flex-col items-center text-center max-w-xs"
  >
    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
)

