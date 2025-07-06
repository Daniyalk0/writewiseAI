"use client";
import { useAuth } from "@/components/AuthProvider";
import { Auth, User, UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

interface Props {
  currentUser: User | null;
  isSubmitting: boolean;
  isAuthProvider: boolean;
  signOut: (auth: Auth) => Promise<void>;
  signInAnonymously: (auth: Auth) => Promise<UserCredential>;
  auth:Auth;
}

const GuestSignin = ({
  currentUser,
  signOut,
  auth,
  signInAnonymously,
  isSubmitting,
  isAuthProvider,
}: Props) => {
    const router = useRouter()
    const { anonymousLoading, setAnonymousLoading } = useAuth();

console.log(currentUser);

  const handleGuestAuth = async () => {
    setAnonymousLoading(true);
    try {
      if (currentUser?.isAnonymous) {
        await signOut(auth);
      } else {
        await signInAnonymously(auth);
        router.push("/");
      }
    } catch (error) {
      console.error("Guest auth error:", error);
    } finally {
      setAnonymousLoading(false);
    }
  };

  const getGuestButtonText = () => {
    if (anonymousLoading) {
      console.log(currentUser?.isAnonymous);
      
      return currentUser?.isAnonymous ? "Signing out..." : "Signing in...";
    }
    return currentUser?.isAnonymous ? "Sign out as Guest" : "Sign in as Guest";
  };

  return (
    <div
      onClick={handleGuestAuth}
      className={`bg-zinc-900 flex items-center justify-center  hover:border-indigo-900 border-transparent border-[1px] w-full sm:w-[20%]  py-2   text-[#b1b1b1] font-semibold rounded-md  shadow  transition duration-200 gap-2    ${
        isSubmitting || anonymousLoading || isAuthProvider 
          ? "pointer-events-none bg-zinc-700 text-zinc-500"
          : "cursor-pointer"
      }`}
    >
      <p>{getGuestButtonText()}</p>
      <FaUser className="" />
    </div>
  );
};

export default GuestSignin;
