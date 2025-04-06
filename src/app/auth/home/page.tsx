"use client";

import Navbar from "@/components/navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Board from "@/components/board";

interface User {
  username: string;
  email: string;
  gender: string;
  image?: string;
  createdAt: string;
}

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log("User:", user);
    console.log("Loading:", loading);
  }, [user, loading]);

  return (
    <div className="bg-black flex flex-col text-white min-h-screen">
      <Navbar />

      <div className="flex flex-1 items-center justify-center">
        <Board />
      </div>
    </div>
  );
};

export default Page;
