import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./PhotoTimeline.css";

const images = [
  "/images/old/baack.jfif",
  "/images/old/back.jfif",
  "/images/old/back3.jfif",
  "/images/old/back4.jfif",
  "/images/old/baack.jfif",
  "/images/old/back.jfif",
  "/images/old/back3.jfif",
  "/images/old/back4.jfif",
  "/images/old/baack.jfif",
  "/images/old/back.jfif",
  "/images/old/back3.jfif",
  "/images/old/back4.jfif",
];

const PhotoTimelineOld = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;

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

export default PhotoTimelineOld;
