"use client";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const PopUp = ({
  title = 'hello',
  message = 'anjii sijr ofds ',
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-zinc-800 text-white p-6 pt-16 rounded-xl shadow-lg max-w-md w-full text-center">
        {/* ❌ Big Red Cross Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 rounded-full p-1">
          <AiOutlineCloseCircle className="text-red-600" size={64} />
        </div>

        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-zinc-300 mb-6">{message}</p>

        <button
          onClick={onClose}
          className="px-4 cursor-pointer py-2 rounded bg-red-600 hover:bg-red-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;
