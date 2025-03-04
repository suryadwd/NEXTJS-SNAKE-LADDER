"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useRouter } from "next/navigation";


const Navbar = () => {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();


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

  const handleLogout = async () => {

      try {
        await axios.get("/api/auth/logout", { withCredentials: true });
        setUser(null);
        router.push("/auth/login"); 
      } catch (error) {
        console.log(error)
      }

  }
  
  return (
    <div className='border border-white p-3 flex items-center justify-between' >

          

       <Image
        src="/icon.png" 
        alt="Logo"
        width={50}
        height={50}
        priority
        className="object-contain"
      />

      <div className="flex items-center justify-between gap-5">

      {user?.email === "sun@sun" && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => router.push("/auth/stats")}
          >
            Statistics
          </button>
        )}

        <Image
        src={user?.image || "/default.png"} 
        alt="user Image"
        width={50}
        height={50}
        className="object-contain rounded-full border border-white"
        />
        <div className="font-bold">{user?.username}</div>

        <div className="text-2xl" onClick={e => setDropdownOpen(!dropdownOpen)}><IoIosArrowDropdownCircle className="text-green-500" /></div>

        {dropdownOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-md rounded-md p-2 w-40 text-black">
            <button onClick={() => router.push("/auth/profile")}  className="block w-full text-left px-4 py-2 hover:bg-gray-200">
              Profile
            </button>
            <button onClick={handleLogout}  className="block w-full text-left px-4 py-2 hover:bg-gray-200">
              Logout
            </button>
          </div>
        )}

      </div>


    </div>
  )
}

export default Navbar

