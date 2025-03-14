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
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".containerVideo",
        scrub: 2.5,
        start: "top top",
        end: "150% top",
        invalidateOnRefresh: true,
      },
    });

    gsap.to(".maskWord", {
      backgroundColor: "transparent",
      scrollTrigger: {
        trigger: ".containerVideo",
        scrub: 2.5,
        start: "top top",
        end: "50% top",
        invalidateOnRefresh: true,
      },
    });

    gsap.from("video", {
      scale: 1.5,
    });

    // Video fade-out animation (starts when .textSection reaches middle of viewport)
    gsap.to("video", {
      scale: 1.5,
      opacity: 0.3,
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
      scale: 1.5,
      opacity: 1,
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
      <ThreeJSModel /> {/* This will display the 3D model */}
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
          <h1 style={{ color: "black" }}>Hi love </h1>{" "}
          <p style={{ width: "50%", color: "black" }}>
            I am not as talented as you are, you are one of the most talented
            people I know, so I though I'd use my skills or what I know how to
            do to express my love to you. I hope you like it.{" "}
          </p>
          <h1 style={{ color: "black" }}> I am probably your biggest fan</h1>
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
        </section>
      </div>
      <section style={{ height: "150vh" }} className="info">
        {" "}
        <h1 style={{ color: "black", width: "90%" }}>
          {" "}
          Maybe, you arent here yet, but I have you around me me all the time
        </h1>
        <div className="photo-stack">
          <div className="flip-card photo1">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="../public/images/withMe/6.jpg" alt="1" />
              </div>
              <div className="flip-card-back">
                <p>My little Journal ❤️</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo2">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="../public/images/withMe/1.jpg" alt="2" />
              </div>
              <div className="flip-card-back">
                <p>انت عالمي 😊</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo3">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="../public/images/withMe/3.jpg" alt="3" />
              </div>
              <div className="flip-card-back">
                <p>
                  إذا شققت صدري, ستجد قلبي, وإذا شققت قلبي ستجد بابا, افتح الباب
                  ستجد كرسيا و علي الكرسي تجلس انت , هناك يقع الحب{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="flip-card photo4">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="../public/images/withMe/5.jpg" alt="5" />
              </div>
              <div className="flip-card-back">
                <p>بارك الله لنا و بارك علينا و جمع بيننا في خير</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo5">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="../public/images/withMe/8.jpg" alt="6" />
              </div>
              <div className="flip-card-back">
                <p>My first surprise with how much you know me</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo6">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="../public/images/withMe/9.jpg" alt="7" />
              </div>
              <div className="flip-card-back">
                <p>My favourite TOTEEEEE bag</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo7">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="../public/images/withMe/4.jpg" alt="4" />
              </div>
              <div className="flip-card-back">
                <p>One of our first dates</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo8">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="../public/images/withMe/10.jpg" alt="10" />
              </div>
              <div className="flip-card-back">
                <p>Love my blanket</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo9">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="../public/images/withMe/11.jpg" alt="11" />
              </div>
              <div className="flip-card-back">
                <p>
                  ِAlways right there on my phone screen with our playlist
                  running in the background ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="scanner"></section>
      <section className="outro"></section>
      <section className="info">
        {" "}
        <div className="tags">
          {" "}
          <p>DAAAMNN</p>
          <p>DAAAMNN</p>
          <p>DAAAMNN</p>
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
  );
}

export default App;
