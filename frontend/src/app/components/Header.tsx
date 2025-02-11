"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Logo } from "./Logo"

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

type ButtonProps = {
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"button">, "className" | "children" | "variant">;

const NavLink = ({ href, children, ...props }: NavLinkProps) => (
  <Link 
    href={href} 
    className="text-muted-foreground hover:text-primary transition-colors" 
    {...props}
  >
    {children}
  </Link>
)

const Button = ({ children, variant = "solid", className = "", ...props }: ButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 rounded-md font-medium transition-colors ${
      variant === "outline"
        ? "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        : "bg-primary text-primary-foreground hover:bg-primary/90"
    } ${className}`}
    {...props}
  >
    {children}
  </motion.button>
)

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-background shadow-sm"
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
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
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
        </div>
        <div className="hidden md:flex space-x-2">
          <Link href="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
        <button 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
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
              <NavLink href="#features" onClick={() => setIsOpen(false)}>
                Features
              </NavLink>
              <NavLink href="#how-it-works" onClick={() => setIsOpen(false)}>
                How It Works
              </NavLink>
              <NavLink href="#testimonials" onClick={() => setIsOpen(false)}>
                Testimonials
              </NavLink>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}