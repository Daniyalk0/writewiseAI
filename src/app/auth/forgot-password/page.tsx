"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../../lib/firebase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset email sent! Check your inbox.");
    } catch (error: any) {
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Forgot Password</h2>

        {message && (
          <p className="mb-4 text-indigo-600 font-medium">{message}</p>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
