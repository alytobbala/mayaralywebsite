import React, { useEffect } from "react";
import "./CursorEffect.css";

const CursorEffect: React.FC = () => {
  useEffect(() => {
    const flowerContainer: HTMLDivElement | null =
      document.querySelector(".cursor-container");
    const maxFlowers = 20; // Limit to 100 sunflowers in the trail at any time
    let flowers: HTMLImageElement[] = [];
    let flowerDelay = 0; // Initial delay for the first sunflower

    // Function to create sunflower elements using an image
    const createSunflower = (x: number, y: number) => {
      const flower = document.createElement("img");
      flower.classList.add("sunflower");

      // Set the image source for the sunflower
      flower.src =
        "https://images.vexels.com/media/users/3/315689/isolated/preview/870d4ad140d7a67f5d86aa372d8b8167-marvelous-sunflower-view.png"; // Replace with your sunflower image URL or local path
      flower.alt = "Sunflower";

      // Set the position of the sunflower image
      flower.style.left = `${x}px`; // Adjust for centering (use the size of the image)
      flower.style.top = `${y}px`; // Adjust for centering (use the size of the image)

      flower.style.animationDelay = `${flowerDelay}ms`; // Delay each sunflower slightly
      flowerContainer?.appendChild(flower);
      flowers.push(flower);

      // Remove the sunflower after the animation is complete (2s to match animation duration)
      setTimeout(() => {
        flower.remove();
        flowers = flowers.filter((f) => f !== flower); // Remove from the flowers array
      }, 2000); // Match animation duration

      // If there are more than `maxFlowers`, remove the oldest one
      if (flowers.length > maxFlowers) {
        const oldestFlower = flowers.shift();
        if (oldestFlower) {
          oldestFlower.remove();
        }
      }

      // Increase delay for the next sunflower to create a smooth trail effect
      flowerDelay += 1; // Delay next sunflower by 100ms (you can adjust this for longer trails)
    };

    // Throttle sunflower creation to avoid too many sunflowers being generated
    let lastFlowerTime = 0;
    const mouseMoveHandler = (event: MouseEvent) => {
      const now = Date.now();
      // Create a new sunflower only every 200ms
      if (now - lastFlowerTime > 75) {
        createSunflower(event.clientX, event.clientY); // Use clientX and clientY for relative positioning
        lastFlowerTime = now;
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
