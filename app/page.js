"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import "@/styles/globals.css";
import { useSession } from "next-auth/react";

const Homepage = () => {
  const { data: session, status } = useSession();
  
  return (
    <div className="text-5xl flex justify-center p-16">
      {session ? (
        <div>Hello, {session.user.name}!</div>
      ) : (
        <div>Hello, user!</div>
      )}
    </div>
  );
};

export default Homepage;
