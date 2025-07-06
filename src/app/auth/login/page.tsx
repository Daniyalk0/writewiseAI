"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { loginSchema } from "../../../../lib/validation/Auth-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { auth } from "../../../../lib/firebase";
import {
  reload,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInAnonymously,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import PopUp from "@/components/PopUp";
import AuthProvider from "../authProviders/AuthProvider";
import GuestSignin from "../authProviders/GuestSignin";
import z from "zod";

type Inputs = z.infer<typeof loginSchema>;

const Page = () => {
  const [message, setMessage] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [anonymousLoading, setAnonymousLoading] = useState(false);
  const [isAuthProvider, setIsAuthProvider] = useState(false);
  const [currentUser] = useState<User | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await reload(user); // MUST reload to refresh emailVerified
      router.push("/");

      console.log(
        "Reloaded user:",
        user.email,
        "Verified:",
        user.emailVerified
      );

      if (!user.emailVerified) {
        setMessage("Please verify your email before logging in.");
        reset();
        return;
      }

      setMessage("✅ Login successful!");
      // Redirect to dashboard or homepage
    } catch (error) {
      reset();

      if (error instanceof Error) {
        setMessage("❌ Login failed: " + error.message);
      } else {
        setMessage("❌ Login failed: Unknown error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-800 flex-col gap-7">
      <div className="w-full max-w-md  rounded-lg shadow-lg p-8 bg-zinc-900">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#b1b1b1]">
          Sign In
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-[#b1b1b1]"
            >
              Email
            </Label>
            <Input
              disabled={isSubmitting}
              id="email"
              type="email"
              autoComplete="email"
              //   required
              className={`text-gray-400 mt-1 block w-full rounded-md  shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50   disabled:opacity-60 disabled:cursor-not-allowed ${
                errors.email && errors.email.message
                  ? "border-red-700"
                  : "border-indigo-600"
              }`}
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-700 text-[0.7rem] mb-3">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-[#b1b1b1]"
            >
              Password
            </Label>
            <Input
              disabled={isSubmitting}
              {...register("password")}
              id="password"
              type="password"
              //   required
              className={`text-gray-400 mt-1 block w-full rounded-md border-gray-300 shadow-sm   focus:ring focus:ring-indigo-200 focus:ring-opacity-50  disabled:opacity-60 disabled:cursor-not-allowed ${
                errors.password && errors.password.message
                  ? "border-red-700"
                  : "border-indigo-600"
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-700 text-[0.7rem] mb-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <Checkbox
                id="remember"
                disabled={isSubmitting}
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
                className={`h-4 w-4 cursor-pointer text-zinc-800  border-gray-300 data-[state=checked]:bg-zinc-200 data-[state=checked]:text-black  disabled:opacity-50  ${
                  isSubmitting ? "pointer-events-none" : ""
                }`}
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-[#b1b1b1]"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                onClick={(e) => {
                  if (isSubmitting) {
                    e.preventDefault();
                  }
                }}
                className={`${
                  isSubmitting
                    ? "text-zinc-500 pointer-events-none"
                    : "text-indigo-600 "
                } hover:underline`}
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className={`w-full py-2 px-4 cursor-pointer  text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition duration-200  disabled:opacity-50 disabled:cursor-not-allowed  ${
              isSubmitting
                ? "pointer-events-none bg-indigo-800"
                : "bg-indigo-600"
            }`}
          >
            {isSubmitting ? "Submitting.." : "Submit"}
          </button>
        </form>
        <div className="flex items-center justify-between gap-5 my-5">
          <AuthProvider<Inputs>
            Icon={FaGoogle}
            setIsAuthProvider={setIsAuthProvider}
            reset={reset}
            isSubmitting={isSubmitting}
            isAuthProvider={isAuthProvider}
            social={"google"}
          />
          <AuthProvider<Inputs>
            Icon={FaGithub}
            setIsAuthProvider={setIsAuthProvider}
            reset={reset}
            isSubmitting={isSubmitting}
            isAuthProvider={isAuthProvider}
            social={"github"}
          />
        </div>
        <p className="mt-6 text-center text-sm text-[#b1b1b1]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className={`text-indigo-600 font-medium hover:underline ${
              isSubmitting ? "pointer-events-none" : ""
            }`}
          >
            Sign Up
          </Link>
        </p>

        {message && (
          <PopUp
            title="Submission failed"
            message={message}
            onClose={() => setMessage("")}
          />
        )}
      </div>
      <GuestSignin
        setAnonymousLoading={setAnonymousLoading}
        currentUser={currentUser}
        signOut={signOut}
        auth={auth}
        signInAnonymously={signInAnonymously}
        isSubmitting={isSubmitting}
        anonymousLoading={anonymousLoading}
        isAuthProvider={isAuthProvider}
      />
    </div>
  );
};

export default Page;
