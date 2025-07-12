"use client";
import React, {useState } from "react";
import ThemeToggle from "./ThemeToggle";
// import { ModeToggle } from "./ui/modeToggle";
import { motion } from "framer-motion";
import GradientText from "./ui/GradientText";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { handleLogout } from "@/lib/logoutHelper";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const user = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      if (user) {
        await handleLogout();
        return;
      }

      router.push("/auth/login");
    } catch (error) {
      console.error("❌ Login/Logout failed:", error);
      // Optional: show toast or set error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.header
      key={isHome ? "home" : "other"}
      initial={isHome ? { opacity: 0 } : false}
      animate={isHome ? { opacity: 1 } : false}
      transition={{
        delay: 4,
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={`h-16  top-0  dark:shadow-[#30303079] px-4 md:px-8 flex items-center justify-between fixed w-full left-0 z-50
    shadow-sm md:shadow-md bg-[#ffffff] dark:bg-[#000000] ${
      isHome ? "opacity-0" : ""
    }`}
    >
      <div className="flex items-center">
        <GradientText
          colors={["#ff4d4d", "#ffa500", "#ffff66", "#ffa500", "#ff4d4d"]}
          animationSpeed={12}
          showBorder={false}
          className="text-xl whitespace-nowrap "
        >
          WriteWise AI
        </GradientText>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <button
          onClick={handleLogin}
          type="submit"
          className={`py-[0.35rem] sm:py-1 px-3 cursor-pointer text-sm sm:text-[1rem] font-semibold shadow  border-b-[1px] rounded-lg border-transparent hover:border-orange-600 bg-[#eeeeee]  dark:bg-[#222]`}
        >
          <span
            style={{
              background:
                "linear-gradient(90deg,rgba(255, 113, 25, 1) 50%, rgba(255, 0, 0, 1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            {user ? "Logout" : loading ? "Logging out.." : "Login"}
          </span>
        </button>

        <ThemeToggle />
      </div>
    </motion.header>
  );
};

export default Header;
