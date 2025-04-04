import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SmoothScroll.css";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = gsap.utils.toArray<HTMLElement>(".section");

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${sections.length * window.innerHeight}`,
      pin: true, // Keeps sections in place while scrolling
      scrub: 1, // Smooth scroll effect
      snap: { snapTo: 1 / (sections.length - 1), duration: 0.5, delay: 0 },
      markers: true, // Debugging markers (REMOVE after testing)
    });
  }, []);

  return (
    <div ref={containerRef} className="scroll-container">
      {children}
    </div>
  );
};

export default SmoothScroll;
