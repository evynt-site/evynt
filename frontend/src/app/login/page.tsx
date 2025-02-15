/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import Form from "../components/Form";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "../components/Logo";
import { auth } from "@/lib/auth";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      setError(null);
      await auth.login(data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "Login failed");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center mb-4">
          <Logo />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="ml-2 text-2xl font-bold text-primary"
          >
            evynt
          </motion.span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <Form type="login" onSubmit={handleSubmit} />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/signup" className="font-medium text-primary hover:text-primary/90">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
