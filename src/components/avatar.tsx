import { useEffect, useRef, useState } from "react";

const minBlinkInterval = 2000,
  maxBlinkInterval = 5000,
  blinkDuration = 200;

export function Avatar({ approvalRating }: { approvalRating: number }) {
  const imageNumber = 2; // Math.floor(approvalRating / 4);

  const [isBlinking, setIsBlinking] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startBlinkTimer = () => {
    const randomInterval =
      Math.random() * (maxBlinkInterval - minBlinkInterval) + minBlinkInterval;

    timeoutRef.current = setTimeout(() => {
      setIsBlinking(true);

      // Schedule the return to the normal avatar
      setTimeout(() => {
        setIsBlinking(false);
        // Start the timer for the next blink
        startBlinkTimer();
      }, blinkDuration);
    }, randomInterval);
  };

  // useEffect(() => {
  //   // Start the initial blink timer when the component mounts
  //   startBlinkTimer();

  //   // Cleanup function to clear the timeout when the component unmounts
  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-lg"
      src={`/neckbeard-avatar-${imageNumber}${isBlinking ? "-blink" : ""}.png`}
      alt="Neckbeard Avatar"
    />
  );
}
