import React, { useEffect, useRef, useState } from "react";
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
import PhotoTimelineTwo from "./components/PhotoTimelineOld";
import WebARScene from "./components/WebARScene";
import FirstMeetMap from "./components/FirstMeetMap";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenis = new Lenis();
  const audioRef: any = useRef(null); // Ref for the audio
  const [audioAllowed, setAudioAllowed] = useState(true);
  const [showAR, setShowAR] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      if (audioAllowed && audioRef.current) {
        audioRef.current.currentTime = 39; // Start at 39 seconds
        audioRef.current.volume = 0; // Start muted

        audioRef.current
          .play()
          .then(() => {
            // 🟢 Ensure GSAP starts AFTER playback has begun
            gsap.to(audioRef.current, {
              volume: 0.3,
              duration: 3,
              ease: "power2.inOut",
            });
          })
          .catch((err: any) => console.error("Audio play failed", err));

        // 🔥 Fade out after 20 seconds
        setTimeout(() => {
          gsap.to(audioRef.current, {
            volume: 0,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => audioRef.current.pause(),
          });
        }, 20000);
      }
    };

    const pauseAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
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
        onEnter: playAudio, // Play song when animation starts
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

  const enableAudio = () => {
    setAudioAllowed(true);
    if (audioRef.current) {
      console.log("Playing audio");
      audioRef.current
        .play()
        .catch((err: any) => console.error("Audio play failed", err));
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="https://archive.org/download/grover-washington-jr.-feat.-bill-withers-just-the-two-of-us-hq_202202/Grover%20Washington%20Jr.%20feat.%20Bill%20Withers%20-%20Just%20The%20Two%20of%20Us%20%5BHQ%5D.mp3"
        preload="auto"
      ></audio>
      {!audioAllowed && (
        <button
          onClick={enableAudio}
          style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
        >
          🔊 Enable Audio
        </button>
      )}
      <ThreeJSModel /> {/* This will display the 3D model */}
      <CursorEffect />
      <div className="containerVideo">
        <video id="boomerangVideo" autoPlay loop muted>
          <source src="/images/austria/editedDance.mp4" type="video/mp4" />
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
          <h1 style={{ color: "black" }}> From your biggest fan</h1>
          <div className="masonry">
            <img src="/images/work/prints.png" alt="4" />
            <img
              src="/images/work/abgad.png"
              style={{ height: "100.5%" }}
              alt="1"
            />
            <img src="/images/work/downtownAlex.gif" className="wide" alt="2" />
            <img src="/images/work/ensembles.jfif" alt="3" className="wide" />
            <img src="/images/work/tawagah.png" alt="3" className="wide" />
            <img src="/images/work/gallery.png" alt="3" className="wide" />
          </div>
        </section>
      </div>
      <section style={{ height: "100vh" }} className="info">
        {" "}
        <h1 style={{ color: "black", width: "90%" }}>
          Maybe, you arent here yet, but I have you around me all the time
        </h1>
        <div className="photo-stack">
          <div className="flip-card photo1">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/images/withMe/6.jpg" alt="1" />
              </div>
              <div className="flip-card-back">
                <p>My little Journal ❤️</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo2">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/images/withMe/1.jpg" alt="2" />
              </div>
              <div className="flip-card-back">
                <p>انت عالمي 😊</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo3">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/images/withMe/3.jpg" alt="3" />
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
                <img src="/images/withMe/5.jpg" alt="5" />
              </div>
              <div className="flip-card-back">
                <p>بارك الله لنا و بارك علينا و جمع بيننا في خير</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo5">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/images/withMe/8.jpg" alt="6" />
              </div>
              <div className="flip-card-back">
                <p>My first surprise with how much you know me</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo6">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/images/withMe/9.jpg" alt="7" />
              </div>
              <div className="flip-card-back">
                <p>My favourite TOTEEEEE bag</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo7">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/images/withMe/4.jpg" alt="4" />
              </div>
              <div className="flip-card-back">
                <p>One of our first dates</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo8">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/images/withMe/10.jpg" alt="10" />
              </div>
              <div className="flip-card-back">
                <p>Love my blanket</p>
              </div>
            </div>
          </div>

          <div className="flip-card photo9">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/images/withMe/11.jpg" alt="11" />
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
        </div>
        {/* Timeline Section - Fixes Placement */}
        <div className="phototimeparent">
          <h1>We went from this</h1>
          <div className="phototime">
            <PhotoTimelineTwo></PhotoTimelineTwo>
          </div>
          <h1>To this</h1>
          <div className="phototime">
            <PhotoTimeline></PhotoTimeline>
          </div>
        </div>
      </section>
      <section className="mapReveal">
        <FirstMeetMap />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.8)",
            padding: "1.5rem",
            borderRadius: "15px",
            width: "85%",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            maxHeight: "30vh",
            overflowY: "auto",
          }}
        >
          <p
            style={{
              fontSize: "1.2rem",
              color: "#222",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            I’ll never forget the way you looked at me when I told you I see a
            future with you. The surge of different feelings that showed on your
            face. It turns out, that decision, on that day, was probably the
            best decision I’ve ever made. I can’t imagine my life without you.
            You are my everything, and I am so grateful for every moment we
            share. I love you more than words can express.
          </p>
        </div>
      </section>
      <section>
        <div
          style={{
            backgroundColor: "#FFFFFF80",
            borderRadius: "20px",
            textAlign: "center",
            padding: "2rem",
            margin: "1rem",
          }}
        >
          <p>
            I can’t wait to see what the future holds for us. I can't wait to
            spend the rest of my life with you.
          </p>
          <FlipCountdown />
        </div>
      </section>
    </div>
  );
}

export default App;
