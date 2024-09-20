"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import axios from "axios";

export default function Home() {
  const { data, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      console.log(data);
    }
  }, [data, status]);

  // Handle loading state to avoid rendering before session is available
  if (status === "loading") {
    return <p>Loading...</p>; // Show loading message while session is being fetched
  }

  const sendEmail = async () => {
    startTransition(async () => {
      try {
        const res = await axios.post("/api/send");

        if (res.data) {
          setEmailSent(true); // Set a state to indicate email was sent
          console.log(res.data);
        }
      } catch (err) {
        console.error("Failed to send email:", err);
      }
    });
  };

  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome {data?.user?.username || "User"} to Our Website
        </h1>
        <p>Email: {data?.user?.email}</p>
        {data?.user?.verified && <p>Your account is verified.</p>}
        
        {/* Display the loading state or success message */}
        {isPending && <p>Sending email...</p>}
        {!isPending && emailSent && <p>Email sent successfully!</p>}
        
        <button
          onClick={sendEmail}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={isPending} // Disable the button while email is being sent
        >
          {isPending ? "Sending..." : "Get Started"}
        </button>
        
        <Link
          href="/about"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign in Page
        </Link>
      </div>
    </main>
  );
}
