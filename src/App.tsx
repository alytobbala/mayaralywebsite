import React, { useEffect, useRef } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorEffect from "./components/CursorEffect";
import FlipCountdown from "./components/FlipCountdown";
import Lenis from "lenis";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import ThreeJSModel from "./components/ThreeJSModel";
import GalleryCarousel from "./components/GalleryCarousel";
import PhotoTimeline from "./components/PhotoTimeline";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenis = new Lenis();

  useEffect(() => {
    // Text scaling animation
    gsap.to("h2", {
      scale: 12000,
      x: "90000%",
      y: "200000%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".containerVideo",
        scrub: 2.5,
        start: "top top",
        end: "150% top",
        invalidateOnRefresh: true,
      },
    });

    gsap.from("video", {
      scale: 1.5,
    });

    // Video fade-out animation (starts when .textSection reaches middle of viewport)
    gsap.to("video", {
      y: "-100vh",
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero",
        start: "top 50%", // Starts fading out when top of textSection reaches the middle of the viewport
        end: "top top", // Fully faded out when top of textSection reaches top of viewport
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    // Fade video back in smoothly when scrolling up
    gsap.to("video", {
      opacity: 1,
      y: "-100",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".hero",
        start: "top 80%", // Starts bringing the video back earlier
        end: "top 20%bottom%", // Ensures a smooth transition before text fully exits
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    gsap.from("video", {
      scale: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    //window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <CursorEffect />
      <div className="containerVideo">
        <video id="boomerangVideo" autoPlay loop muted>
          <source
            src="../public/images/austria/editedDance.mp4"
            type="video/mp4"
          />
        </video>
        <div className="maskWord">
          <h2 style={{ textAlign: "center" }}>
            To my One and Only, the girl I love the most
          </h2>
        </div>
      </div>
      <div className="textSection">
        <section style={{ height: "300vh" }} className="hero">
          {" "}
          <br />
          <h1>Hi love </h1>{" "}
          <p style={{ width: "50%" }}>
            I am not as talented as you are, you are one of the most talented
            people I know, so I though I'd use my skills or what I know how to
            do to express my love to you. I hope you like it.{" "}
          </p>
          <h1> I am probably your biggest fan</h1>
          <div className="masonry">
            <img src="../public/images/work/prints.png" alt="4" />
            <img
              src="../public/images/work/abgad.png"
              style={{ height: "100.5%" }}
              alt="1"
            />
            <img
              src="../public/images/work/downtownAlex.gif"
              className="wide"
              alt="2"
            />
            <img
              src="../public/images/work/ensembles.jfif"
              alt="3"
              className="wide"
            />
            <img
              src="../public/images/work/tawagah.png"
              alt="3"
              className="wide"
            />
            <img
              src="../public/images/work/gallery.png"
              alt="3"
              className="wide"
            />
          </div>
          {/* Timeline Section - Fixes Placement */}
          <div className="phototimeparent">
            <h1>From the moment we first met ...</h1>
            <h1>to the day we tie the knot ...</h1>
            <h1>I have always known, you're the one</h1>
            <div className="phototime">
              <PhotoTimeline></PhotoTimeline>
            </div>
          </div>
        </section>
      </div>

      <section className="info">
        {" "}
        <div className="tags">
          <div className="gradient-bg">
            <p>
              Just like the soft olive green of a quiet forest and the warm
              embrace of a sunset, your love colors my world in the most
              beautiful pastel hues.
            </p>
          </div>
        </div>
      </section>

      <section className="scanner"></section>

      <section className="outro">
        <ThreeJSModel /> {/* This will display the 3D model */}
      </section>

      <section className="info">
        {" "}
        <div className="tags">
          {" "}
          <p>DAAAMNN</p>
          <p>DAAAMNN</p>
          <p>DAAAMNN</p>
        </div>
      </section>
    </div>
  );
}

export default App;
