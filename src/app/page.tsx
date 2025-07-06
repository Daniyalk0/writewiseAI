"use client"
import Link from 'next/link'
import React from 'react'
import { UseAuthUser } from './auth/authhooks/UseAuthUser';
import { auth } from '../../lib/firebase';

const page = () => {
    const { user, loading } = UseAuthUser();
    console.log(user);
    

  if (loading) return <p>Loading...</p>; // Optional spinner
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>

      {/* Show info based on user login */}
      {user ? (
        <>
        <p className="text-green-600 mb-4">✅ Logged in as {user.displayName || "Guest User"}</p>
         {user.photoURL && (
            <img src={user.photoURL} alt="user pfp" className="rounded-full w-20 h-20 object-cover mb-4" />
          )}
        </>
      ) : (
        <p className="text-red-600 mb-4">❌ You're not logged in</p>
      )}

      {/* Button that only works if user is logged in */}
      <button
        onClick={() => {
          if (!user) {
            alert("Please log in to perform this action.");
            return;
          }

          // Perform the protected action
          alert("Task performed!");
        }}
        className={`px-4 py-2 rounded text-white font-semibold ${
          user ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Perform Action
      </button>
         <button
          onClick={() => auth.signOut()}
            type="button"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition duration-200"
          >
            Sign out
          </button>
    </div>
  );
  
}

export default page