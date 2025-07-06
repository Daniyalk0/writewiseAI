"use client";
import {
  browserLocalPersistence,
  GithubAuthProvider,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../lib/firebase";
import { useRouter } from "next/navigation";
import { FieldValues, UseFormReset } from "react-hook-form";
import { useAuth } from "@/components/AuthProvider";


interface ThirdPartyAuth<T extends FieldValues> {
  setIsAuthProvider: (value: boolean) => void;
  reset: UseFormReset<T>;
  isSubmitting: boolean;
  anonymousLoading: boolean;
  isAuthProvider: boolean;
  Icon: React.ElementType;
  social: "google" | "github";
}

const ThirdPartyAuth = <T extends FieldValues> ({ 
  setIsAuthProvider,
  reset,
  isSubmitting,
  isAuthProvider,
  Icon,
  social,
  anonymousLoading
}: ThirdPartyAuth<T>) => {
  const router = useRouter();
  const {currentUser} = useAuth()
  const handleSocialSignIn = async (providerName: "google" | "github") => {
    reset(); // clear form if needed
    setIsAuthProvider(true);


    let provider;

    if (providerName === "google") {
      provider = new GoogleAuthProvider();
    } else if (providerName === "github") {
      provider = new GithubAuthProvider();
    } else {
      console.error("Unsupported provider");
      return;
    }

    try {
      await setPersistence(auth, browserLocalPersistence);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setIsAuthProvider(false);
      console.log(`✅ Signed in with ${providerName}:`, user.email);

      router.push("/");
    } catch (error) {
      setIsAuthProvider(false);
      if (error instanceof Error) {
        console.error(`❌ ${providerName} sign-in error:`, error.message);
      } else {
        console.error(`❌ ${providerName} sign-in error:`, error);
      }
    }
  };

  return (
    <div
      onClick={() => handleSocialSignIn(social)}
      className={`hover:border-indigo-900 border-transparent border-[1px]  py-2 px-2 bg-zinc-800 text-[#b1b1b1] font-semibold rounded-md shadow  transition duration-200 flex items-center gap-2   ${
        isSubmitting || isAuthProvider || anonymousLoading || currentUser
          ? "pointer-events-none bg-zinc-700 text-zinc-500"
          : "cursor-pointer"
      }`}
    >
      <p>Sign in</p>
      <Icon/>
    </div>
  );
};

export default ThirdPartyAuth;
