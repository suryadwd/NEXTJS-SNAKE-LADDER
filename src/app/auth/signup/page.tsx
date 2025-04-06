"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState({
    email: "",
    password: "",
    username: "",
    gender: "",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(data);
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/signup", data);

      console.log(response.data);

      if (response.data.success) {
        router.push("/auth/home");
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || err.message || "Something went wrong";
      console.error(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="px-[7%] py-[1%] flex flex-col items-center justify-center border border-white rounded-3xl">
        <h1 className="text-3xl font-bold mb-5 mt-2">Signup</h1>

        <Input
          className="mb-5 px-10"
          placeholder="Username"
          type="text"
          value={data.username}
          name="username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <Input
          className="mb-5 px-10"
          placeholder="Email"
          type="email"
          value={data.email}
          name="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <Input
          className="mb-5 px-10"
          placeholder="Password"
          type="password"
          value={data.password}
          name="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <div className="flex gap-4 mb-4">
          <label>Gender:</label>

          <div className="flex items-center justify-between gap-5">
            <label className="flex items-center justify-between gap-5">
              <Input
                className="size-4"
                type="radio"
                value="male"
                name="gender"
                checked={data.gender === "male"}
                onChange={(e) => setData({ ...data, gender: e.target.value })}
              />
              Male
            </label>

            <label className="flex items-center justify-between gap-3">
              <Input
                className="size-4"
                type="radio"
                value="female"
                name="gender"
                checked={data.gender === "female"}
                onChange={(e) => setData({ ...data, gender: e.target.value })}
              />
              Female
            </label>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="px-8 py-1 bg-blue-400 hover:bg-green-400 rounded-3xl mb-5"
        >
          {loading ? "Loading..." : "Signup"}
        </Button>

        <Link href="/auth/login">
          <span className="text-sm font-extralight text-white/60 mb-5 hover:text-blue-300">
            Already have an account? Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
