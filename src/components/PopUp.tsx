"use client";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const PopUp = ({
  title = "hello",
  message = "anjii sijr ofds ",
  onClose,
  onButton,
  ButtonText = "Ok",
}: {
  title: string;
  message: string;
  ButtonText: string;
  onClose: () => void;
  onButton: () => void;
}) => {
  // 🚫 Disable scroll on mount, re-enable on unmount
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
  <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="relative bg-zinc-300 dark:bg-[#1e1e1e] text-white p-6 pt-16 rounded-xl shadow-lg w-[80%] max-w-md sm:w-full text-center">
      {/* ❌ Top Large Cross Icon */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-300 dark:bg-[#1e1e1e] rounded-full p-1">
        <AiOutlineCloseCircle className="text-red-600" size={64} />
      </div>

      {/* ✅ Bottom-right Small Close Icon */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-zinc-600 dark:text-zinc-300 hover:text-red-600 transition"
      >
        <X size={18} className="hover:text-red-500"/>
      </button>

      <h2 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-300">
        {title}
      </h2>
      <p className="text-sm text-zinc-700 dark:text-zinc-400 mb-6">{message}</p>

      <button
        onClick={onButton}
        className="px-4 cursor-pointer py-2 rounded bg-red-600 hover:bg-red-700 transition"
      >
        {ButtonText}
      </button>
    </div>
  </div>
);

};

export default PopUp;
