"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect } from "react";
import { auth } from "../../lib/firebase";

export default function Page() {
  useEffect(() => {
  signOut(auth); 
}, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600">✅ Email Verified!</h1>
        <p className="mt-2 text-gray-700">
          Your email has been successfully verified.
        </p>
        <p className="mt-1 text-gray-500">
          You can now log in to your account.
        </p>

        <Link
          href="/auth/login"
          className="mt-6 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
