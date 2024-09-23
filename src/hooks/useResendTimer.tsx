"use client";

import { useRef, useState, useEffect } from "react";

export const useResendTimer = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer]); // Add timer as a dependency here

  // Update canResend when timer hits 0
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [timer]);

  return { canResend, timer, setCanResend, setTimer };
};
