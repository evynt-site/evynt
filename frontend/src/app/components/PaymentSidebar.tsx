"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard } from "lucide-react"

interface PaymentSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function PaymentSidebar({ isOpen, onClose }: PaymentSidebarProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [name, setName] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the payment processing
    // For now, we'll just show the confirmation message
    setShowConfirmation(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 right-0 w-full sm:w-96 bg-card shadow-lg z-50"
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-card-foreground">Payment Details</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>
            {!showConfirmation ? (
              <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-card-foreground">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-primary"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-card-foreground">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-primary"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="cvv" className="block text-sm font-medium text-card-foreground">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-primary"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-primary"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="flex-grow" />
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
                >
                  Confirm Payment
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center flex-grow text-center">
                <CreditCard size={48} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Payment Confirmed</h3>
                <p className="text-muted-foreground mb-4">
                  You will receive an email with confirmation of your booking shortly.
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

