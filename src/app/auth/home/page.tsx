"use client";

import Navbar from "@/components/navbar"
import axios from "axios";
import React, { useEffect, useState } from "react";
import Board from "@/components/board";

const page = () => {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/profile", { withCredentials: true });
        setUser(res.data.user); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='bg-black flex flex-col  text-white min-h-screen '>

      <Navbar />

      <div className="flex flex-1 items-center justify-center">
        <Board />
      </div>

    </div>
  )
}

export default page