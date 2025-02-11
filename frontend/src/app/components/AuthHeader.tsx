"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, Settings, LogOut } from "lucide-react"
import { Logo } from "./Logo"
import type React from "react"

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, ...props }) => (
  <Link href={href} className="text-muted-foreground hover:text-primary transition-colors" {...props}>
    {children}
  </Link>
)

export default function AuthHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-background shadow-sm"
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Logo />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-foreground"
          >
            evynt
          </motion.span>
        </Link>
        <div className="hidden md:flex space-x-4">
          <NavLink href="/dashboard">Browse Events</NavLink>
          <NavLink href="/dashboard/my-events">My Events</NavLink>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <motion.button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </motion.button>
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1"
                >
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <User className="w-4 h-4 inline-block mr-2" />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <Settings className="w-4 h-4 inline-block mr-2" />
                    Settings
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground">
                    <LogOut className="w-4 h-4 inline-block mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <motion.button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X /> : <Menu />}
        </motion.button>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background shadow-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
              <NavLink href="/dashboard" onClick={() => setIsOpen(false)}>
                Browse Events
              </NavLink>
              <NavLink href="/dashboard/my-events" onClick={() => setIsOpen(false)}>
                My Events
              </NavLink>
              <NavLink href="/dashboard/profile" onClick={() => setIsOpen(false)}>
                Profile
              </NavLink>
              <NavLink href="/dashboard/settings" onClick={() => setIsOpen(false)}>
                Settings
              </NavLink>
              <button
                className="text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

