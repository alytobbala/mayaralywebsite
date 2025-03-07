import React, { useEffect } from "react";
import "./CursorEffect.css";

const CursorEffect: React.FC = () => {
  useEffect(() => {
    const heartContainer: HTMLDivElement | null =
      document.querySelector(".cursor-container");
    const maxHearts = 100; // Limit to 3 hearts in the trail at any time
    let hearts: HTMLDivElement[] = [];
    let heartDelay = 0; // Initial delay for the first heart

    // Function to create heart elements
    const createHeart = (x: number, y: number) => {
      const heart = document.createElement("div");
      heart.classList.add("heart");

      // Position the heart at the cursor position
      heart.style.left = `${x - 12}px`; // Adjust for centering
      heart.style.top = `${y - 12}px`; // Adjust for centering

      heart.style.animationDelay = `${heartDelay}ms`; // Delay each heart slightly
      heartContainer?.appendChild(heart);
      hearts.push(heart);

      // Remove the heart after the animation is complete (1.5s to match animation duration)
      setTimeout(() => {
        heart.remove();
        hearts = hearts.filter((h) => h !== heart); // Remove from the hearts array
      }, 1500); // Match animation duration

      // If there are more than `maxHearts`, remove the oldest one
      if (hearts.length > maxHearts) {
        const oldestHeart = hearts.shift();
        if (oldestHeart) {
          oldestHeart.remove();
        }
      }

      // Increase delay for the next heart to create a smooth trail effect
      heartDelay += 1; // Delay next heart by 300ms (you can adjust this for longer trails)
    };

    // Throttle heart creation to avoid too many hearts being generated
    let lastHeartTime = 0;
    const mouseMoveHandler = (event: MouseEvent) => {
      const now = Date.now();
      // Create a new heart only every 200ms (slower heart generation)
      if (now - lastHeartTime > 100) {
        createHeart(event.clientX, event.clientY); // Use clientX and clientY for relative positioning
        lastHeartTime = now;
      }
    };

    // Listen to the mouse movement
    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return <div className="cursor-container" />;
};

export default CursorEffect;
