"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/profile", { withCredentials: true });
        setUser(res.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (!user) return <p className="text-center text-red-500">User not found</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black border text-white">
      <h1 className="text-3xl font-bold mb-5">User Profile</h1>
      <Image src={user.image || "/default.png"} alt="User Image" width={100} height={100} className="rounded-full" />
      <p className="mt-3 text-xl">Username: {user.username}</p>
      <p className="text-lg">Email: {user.email}</p>
      <p className="text-lg">Gender: {user.gender}</p>
      <p className="text-lg">Created At: {new Date(user.createdAt).toLocaleString()}</p>

      <button  onClick={() => router.push("/auth/update")} className="bg-green-500 text-white px-4 py-2 rounded-2xl mt-5">Changes...</button>
     
    </div>
  );
};

export default Profile;
