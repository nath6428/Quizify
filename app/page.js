"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className='flex justify-between flex-col h-2/3'>
      <div className="text-4xl mb-72 flex flex-col items-center justify-center p-16 md:text-6xl">
        {session && session.user ? (
            <h1 className="m-2">Hello, {session.user.name || 'User'}!</h1>
        ) : (
          <div>Hello, user!</div>
        )}
        <h2 className="text-xl m-2">Try a quiz:</h2>
        <a className="text-xl text-center m-1" href="https://quizify-self.vercel.app/play-quiz/zapVL2">https://quizify-self.vercel.app/play-quiz/zapVL2</a>
      </div>
      <div className="flex flex-col">
        <p className="text-center">
          Developed by Nathan Crasto
        </p>
        <div className="flex justify-center items-center">
          <a href="https://github.com/nath6428" target="_blank" rel="noopener noreferrer">
            <Image
              src="/github.png"
              alt="GitHub Logo"
              width={40}
              height={40}
            />
          </a>
          <a href="https://www.linkedin.com/in/nathancrasto" target="_blank" rel="noopener noreferrer">
            <Image
              src="/linkedin.png"
              alt="LinkedIn Logo"
              width={40}
              height={40}
              className="bg-red"
            />
          </a>
      </div>
      </div>
    </div>
  );
};

export default Homepage;