import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./PhotoTimeline.css";

const images = [
  "/images/austria/1.jpg",
  "/images/austria/2.jpg",
  "/images/austria/3.jpg",
  "/images/austria/4.jpg",
  "/images/austria/5.jpg",
  "/images/austria/6.jpg",
  "/images/austria/7.jpg",
  "/images/austria/8.jpg",
  "/images/austria/9.jpg",
  "/images/austria/10.jpg",
  "/images/austria/11.jpg",
];

const PhotoTimeline = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;

    // Duplicate images to create infinite scrolling effect
    const duplicatedImages = [...images, ...images];

    // Apply infinite horizontal scrolling animation
    gsap.to(timeline, {
      xPercent: -50, // Moves left infinitely
      ease: "linear",
      duration: 30, // Adjust speed of scrolling
      repeat: -1, // Infinite loop
    });
  }, []);

  return (
    <div className="photo-timeline-container">
      <div className="photo-timeline" ref={timelineRef}>
        {[...images, ...images].map((src, index) => (
          <img key={index} src={src} alt={`Memory ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default PhotoTimeline;
