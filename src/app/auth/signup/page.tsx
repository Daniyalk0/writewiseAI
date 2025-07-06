"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { signupSchema } from "../../../../lib/validation/Auth-schema";
import { auth } from "../../../../lib/firebase";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import PopUp from "@/components/PopUp";
import Link from "next/link";
import GuestSignin from "../authProviders/GuestSignin";
import z from "zod";
import { useAuth } from "@/components/AuthProvider";
import ThirdPartyAuth from "../authProviders/ThirdPartyAuth";

type Inputs = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isAuthProvider, setIsAuthProvider] = useState(false);
  const {currentUser, setCurrentUser, anonymousLoading } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password, name }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=random`;

      await updateProfile(user, {
        displayName: name,
        photoURL: avatarUrl,
      });

      setCurrentUser(user);

      await sendEmailVerification(user);
      await auth.signOut();

      setMessage("✅ Verification email sent! Please check your inbox.");
      setEmailSent(true);
    } catch (error) {
      if (error instanceof Error) {
        setMessage("❌ Signup failed: " + error.message);
      } else {
        setMessage("❌ Signup failed: Unknown error");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setCurrentUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex w-full items-center justify-center flex-col bg-zinc-800 gap-4 min-h-screen sm:flex-row px-4">
      <div className=" w-full sm:w-[40%] flex items-center justify-center ">
        <div className="w-full max-w-md rounded-lg shadow-lg px-5 sm:px-8 py-6 bg-zinc-900">
          <h2
            className={`text-2xl font-bold mb-4 sm:mb-6 text-center text-[#b1b1b1] `}
          >
            Sign Up
          </h2>

          {!emailSent && (
            <div>
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#b1b1b1]"
                  >
                    Name
                  </Label>
                  <Input
                    disabled={isSubmitting || isAuthProvider || anonymousLoading || !!currentUser}
                    id="name"
                    type="text"
                    autoComplete="name"
                    //   required
                    className={`text-gray-400 mt-1 block w-full rounded-md  shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50   disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.name && errors.name.message
                        ? "border-red-700"
                        : "border-indigo-600"
                    }`}
                    placeholder="John doe"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-700 text-[0.7rem] mb-3">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#b1b1b1]"
                  >
                    Email
                  </Label>
                  <Input
                   disabled={isSubmitting || isAuthProvider || anonymousLoading || !!currentUser}
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
                  disabled={isSubmitting || isAuthProvider || anonymousLoading || !!currentUser}
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
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[#b1b1b1]"
                  >
                    Confirm Password
                  </Label>
                  <Input
                 disabled={isSubmitting || isAuthProvider || anonymousLoading || !!currentUser}
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type="password"
                    //   required
                    className={`text-gray-400 mt-1 block w-full rounded-md border-gray-300 shadow-sm   focus:ring focus:ring-indigo-200 focus:ring-opacity-50  disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.confirmPassword && errors.confirmPassword.message
                        ? "border-red-700"
                        : "border-indigo-600"
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-700 text-[0.7rem] mb-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  disabled={isSubmitting || isAuthProvider || anonymousLoading || !!currentUser}
                  type="submit"
                  className={`w-full py-2 px-4 cursor-pointer  text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition duration-200  disabled:opacity-50 disabled:cursor-not-allowed  ${
                    isSubmitting || isAuthProvider || anonymousLoading || currentUser
                      ? "pointer-events-none bg-indigo-900 text-zinc-400"
                      : "bg-indigo-600"
                  }`}
                >
                  {isSubmitting ? "Submitting.." : "Submit"}
                </button>
              </form>
              <div className="flex items-center justify-between gap-5 my-5">
                <ThirdPartyAuth<Inputs>
                  Icon={FaGoogle}
                  setIsAuthProvider={setIsAuthProvider}
                  reset={reset}
                  isSubmitting={isSubmitting}
                  isAuthProvider={isAuthProvider}
                  social={"google"}
                  anonymousLoading={anonymousLoading}
                />
                <ThirdPartyAuth<Inputs>
                  Icon={FaGithub}
                  setIsAuthProvider={setIsAuthProvider}
                  reset={reset}
                  isSubmitting={isSubmitting}
                  isAuthProvider={isAuthProvider}
                  social={"github"}
                  anonymousLoading={anonymousLoading}
                />
              </div>
              <p className="mt-6 text-center text-sm text-[#b1b1b1]">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className={`text-indigo-600 font-medium hover:underline ${
                    isSubmitting || isAuthProvider || anonymousLoading || currentUser ? "pointer-events-none" : ""
                  }`}
                >
                  Sign in
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
          )}

          {emailSent && (
            <div className="flex items-center justify-center flex-col gap-2 ">
              <h1 className="text-[#b1b1b1] font-semibold text-center">
                Email Sent!
              </h1>
              <h1 className="text-[#b1b1b1] font-light text-center">
                Please Verify your Email by the clicking on the Link sent to
                your email
              </h1>
            </div>
          )}

        </div>
      </div>
      <GuestSignin
        currentUser={currentUser}
        signOut={signOut}
        auth={auth}
        signInAnonymously={signInAnonymously}
        isSubmitting={isSubmitting}
        isAuthProvider={isAuthProvider}
      />
    </div>
  );
}
