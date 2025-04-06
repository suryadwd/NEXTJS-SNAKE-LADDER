"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";


const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [loadDelete, setLoadDelete] = React.useState(false);

  const [data, setData] = React.useState({
    email: "",
    password: "",
    username: "",
    gender: "",
  });
  


const handleSubmit = async (e: any) => {
  e.preventDefault();
  
  setLoading(true);
  try {
      const response = await axios.put(
          "/api/user/update",
          data,
          {
              withCredentials: true, 
              headers: {
                  "Content-Type": "application/json",
              },
          }
      );

      console.log(response.data);

      if (response.data.success) {
          router.push("/auth/home");
      }
  } catch (error: any) {
      console.error(error.response?.data?.message || error.message);
  } finally {
      setLoading(false);
  }
};

const handelDelete = async (e: any) => {

  setLoadDelete(true);

  try {
    
    const res = await axios.delete("/api/user/delete", { withCredentials: true });

    alert(res.data.message || "Account deleted successfully");

    if(res.data.success) router.push("/");

  } catch (error: any) {
    console.error(error.response?.data?.message || error.message);
} finally {
  setLoadDelete(false);
}


}


return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">

      <div className="px-[7%] py-[1%] flex flex-col items-center justify-center  border border-white rounded-3xl">
        <h1 className="text-3xl font-bold mb-5 mt-2">Update the data </h1>
        <Input 
        className="mb-5 px-10"
         placeholder="username" 
         type="text"
         value={data.username}
         name="username"
         onChange={e => setData({...data, username: e.target.value})}
         />
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

        <div className="flex gap-4 mb-4">

          <label >Gender: </label>

          <div className="flex items-center justify-between gap-5">

          <label className="flex items-center justify-between gap-5">
            <Input 
             className="size-4"
            type="radio"
            value="male"
            name="gender"
            checked={data.gender === "male"}
            onChange={e => setData({...data, gender: e.target.value})}
            />Male
          </label>

          <label className="flex items-center justify-between gap-3">
            <Input
            className="size-4"
            type="radio"
            value="female"
            name="gender"
            checked={data.gender === "female"}
            onChange={e => setData({...data, gender: e.target.value})}
            />
            Female
          </label>
          </div>

        </div>

        <Button onClick={handleSubmit} className="px-8 py-1 bg-blue-400 hover:bg-green-400 rounded-3xl mb-5">{loading ? "Loading..." : "Confirm"}</Button>
        <p className="font-extralight text-white/30">This action is irreversible. Be careful!. </p>
        <div className="flex items-center gap-3">
        <p className="font-semibold text-red-700">Delete the account if you want.</p>
        <button onClick={handelDelete} className="bg-red-600 text-white px-5 py-1 rounded-2xl">{loadDelete ? "Progress..." : "Delete"}</button>
  
        </div>
        

      </div>


    </div>
  );
};

export default Page;
