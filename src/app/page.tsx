"use client";
import React from "react";
import { auth } from "../../lib/firebase";
import { useAuthGuard } from "./auth/authhooks/useAuthGuard";

const Page = () => {
  useAuthGuard();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>

      <button
        onClick={() => auth.signOut()}
        type="button"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition duration-200"
      >
        Sign out
      </button>
    </div>
  );
};

export default Page;