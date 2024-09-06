"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/globals.css";
import { useSession } from "next-auth/react";
import { getSession } from "@/utils/getSession";

const Homepage = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const newSession = await getSession();
        setSession(newSession);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div className="text-4xl flex justify-center p-16 md:text-6xl">
      {session && session.user ? (
        <div>Hello, {session.user.name || 'User'}!</div>
      ) : (
        <div>Hello, user!</div>
      )}
    </div>
  );
};

export default Homepage;