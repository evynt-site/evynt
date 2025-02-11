import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "evynt - Discover, Book, and Experience Amazing Events",
  description: "evynt is your go-to platform for finding and booking tickets to the best events in your area.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}

