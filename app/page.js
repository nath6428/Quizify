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
    <div className="text-4xl flex flex-col items-center justify-center p-16 md:text-6xl">
      {session && session.user ? (
          <h1 className="m-2">Hello, {session.user.name || 'User'}!</h1>
      ) : (
        <div>Hello, user!</div>
      )}
      <h2 className="text-xl m-2">Try a quiz:</h2>
      <a className="text-xl text-center m-1" href="https://quizify-self.vercel.app/play-quiz/zapVL2">https://quizify-self.vercel.app/play-quiz/zapVL2</a>
    </div>
  );
};

export default Homepage;