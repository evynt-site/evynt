 // Signup.tsx
 "use client"

// interface FormData {
//     email: string;
//     password: string;
//     name?: string;
//   }
  
//   interface FormProps {
//     type: 'login' | 'signup';
//     onSubmit: (data: FormData) => void;
//   }
  
 
  
  import { useRouter } from "next/navigation"
  import Form from "../components/Form"
  import Link from "next/link"
  import { motion } from "framer-motion"
  import { Logo } from "../components/Logo"
  import axios from "axios";
  import { useState } from "react";
  
  interface SignupData {
    email: string;
    password: string;
    name: string;
  }
 
  export default function Signup() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
  
    const handleSubmit = async (data: { name: string; email: string; password: string }) => {
      try {
        setError(null);
    
        const csrfResponse = await axios.get("http://localhost:8000/sanctum/csrf-cookie", { withCredentials: true });

        // 1. Log the entire Set-Cookie header (for verification)
        console.log("Full Set-Cookie Header:", csrfResponse.headers['set-cookie']);

        // 2. Extract and log the XSRF-TOKEN cookie value
        const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]; // Directly from document.cookie
        console.log("XSRF-TOKEN Cookie Value (Frontend):", xsrfToken);

        // 3. Log what Axios is sending (check network tab too - see below)
        console.log("Axios Config Headers:", axios.defaults.headers.common['X-XSRF-TOKEN']); // If Axios is automatically setting it

        // Send signup request
        const response = await axios.post(
          "http://localhost:8000/api/register",
          {
            name: data.name,
            email: data.email,
            password: data.password,
          },
          { 
            headers: {
              
              //'X-CSRF-TOKEN': xsrfToken, 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          withCredentials: true,

          } 
        );
    
        console.log("Signup Success:", response.data);
    
        // Store token in localStorage or state management
        localStorage.setItem("auth_token", response.data.token);
    
        // Redirect user to dashboard
        router.push("/dashboard");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message || "Signup failed");
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form 
              type="signup" 
              onSubmit={(formData) => {
                // Type assertion since we know signup form will always have name
                handleSubmit(formData as SignupData)
              }} 
            />
            {error && (
              <div className="mt-4 text-red-600 text-center">
                {error}
              </div>
            )}
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
                <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                  Already have an account? Log in
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }