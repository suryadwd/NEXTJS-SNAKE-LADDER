"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistics = () => {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await axios.get("/api/stats");
        setUserCount(res.data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Game Statistics</h1>
        {userCount !== null ? (
          <p className="text-lg">Total Users: <span className="font-semibold">{userCount}</span></p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Statistics;
