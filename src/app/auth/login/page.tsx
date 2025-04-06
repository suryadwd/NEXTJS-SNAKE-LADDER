"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link"; 
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState({
    email: "",
    password: ""
  });

 
  const handelSubmit = async (e:any) => {
    
    e.preventDefault();

    console.log(data)

    setLoading(true);

    try {
      
      const response = await axios.post("/api/auth/login", data);

      console.log(response.data)

      if(response.data.success)   router.push("/auth/home");

    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }

  }
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">

      <div className="px-[7%] py-[1%] flex flex-col items-center justify-center  border border-white rounded-3xl">
        <h1 className="text-3xl font-bold mb-5 mt-2">Login </h1>
        <Input 
        className="mb-5 px-10" 
        placeholder="Email" 
        type="email"
        value={data.email}
        name="email"
        onChange={e => setData({...data, email: e.target.value})}
         />
        <Input
         className="mb-5 px-10"
          placeholder="Password"
          type="password" 
          value={data.password}
          name="password"
          onChange={e => setData({...data, password: e.target.value})}
          />
        <Button onClick={handelSubmit} className="px-8 py-1 bg-blue-400 hover:bg-green-400 rounded-3xl mb-5">{ loading ? "Loading..." : "Login" }</Button>
        <Link href="/auth/signup"> {/* Add Link component to navigate */}
          <span className="text-sm font-extralight text-white/60 mb-5 hover:text-blue-300">
            Don't have an account? Signup
          </span>
        </Link>
        

      </div>


    </div>
  );
};

export default Page;

