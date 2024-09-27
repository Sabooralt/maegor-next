"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Navbar } from "@/components/ui/navbar";

export const dynamic = "force-static";

function Introduction() {
  const { data } = useSession();

  return (
    <>
      <Navbar />
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col items-center justify-center gap-4 px-4 font-geist"
        >
          <div className="text-center text-3xl font-bold text-neutral-950 dark:text-white md:text-8xl">
            Welcome to Maegor
          </div>
          <div className="max-w-2xl py-4 text-center text-base font-extralight dark:text-neutral-200 md:text-2xl">
            Maegor is a center-specific app for students to communicate, share
            problems, and chat. Connect with your peers effortlessly and become
            part of a supportive student community.
          </div>
          {data ? (
            <Link href="/chat">
              <button className="w-fit rounded-full flex flex-row gap-2 items-center bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
                <ChatBubbleIcon className="size-4" />
                Chat
              </button>
            </Link>
          ) : (
            <Link href="/auth/register">
              <button className="w-fit rounded-full bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
                Sign up now
              </button>
            </Link>
          )}
        </motion.div>
      </AuroraBackground>
    </>
  );
}

export default Introduction;
