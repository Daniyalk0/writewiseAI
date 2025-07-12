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
 <div className="min-h-screen flex items-center justify-center px-4">
  <div className="dark:bg-[#000000d6] bg-[#ffffffa4] p-8 rounded-xl shadow-xl max-w-md w-full text-center backdrop-blur-md">
    <div className="text-green-600 text-4xl mb-2">✅</div>
    <h1 className="text-2xl font-bold text-green-700 dark:text-green-500">
      Email Successfully Verified!
    </h1>
    <p className="mt-3 text-gray-700 dark:text-gray-300">
      Thank you for confirming your email address.
    </p>
    <p className="text-sm mt-1 text-gray-500">
      You&apos;re now ready to log in and start using <strong>WriteWise AI.</strong>
    </p>

    <Link
      href="/auth/login"
      className="inline-block mt-6 w-full py-2 px-4 text-white font-semibold rounded-md shadow transition duration-200 bg-orange-600 hover:bg-orange-700 dark:bg-orange-800 hover:dark:bg-orange-900"
    >
      Go to Login
    </Link>
  </div>
</div>

  );
}
