"use client";

import { useRouter } from 'next/navigation';
import {Button} from "@/components/ui/button";
import {SparklesPreviewColorful} from "../components/homeEffects";


export default function Home() {

  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the login page
    router.push("/auth/login"); // Assuming the login page is located at /auth/login
  };


  return (
    
   
      <div className="min-h-screen flex flex-col items-center  w-full bg-black">
        <SparklesPreviewColorful />
        <Button  onClick={handleContinue} className="w-fit  bg-blue-400 text-white hover:bg-green-500 px-5 py-2 rounded-3xl">Continue...</Button>
      </div>

  );
}
