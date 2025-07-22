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
import FakeChat from "./components/FakeChat";
import FakeChatTwo from "./components/FakeChatTwo";
import FakeChatSlider from "./components/FakeChatSlider";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenis = new Lenis();

  const audioRefA = useRef<HTMLAudioElement>(null);
  const audioRefB = useRef<HTMLAudioElement>(null);
  const currentAudioRef = useRef<"A" | "B">("A");
  const isTransitioning = useRef(false);
  const triggeredRef = useRef(false); // persists across renders

  const songIndexRef = useRef(0);
  const playbackLoopStarted = useRef(false);

  const [audioAllowed, setAudioAllowed] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false); // Prevent retriggering
  const [autoScrollStarted, setAutoScrollStarted] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<any>();
  const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollYRef = useRef(0);
  const lastScrollTop = useRef(0);
  const lastTimestamp = useRef(performance.now());

  const songList = [
    {
      url: "https://archive.org/download/grover-washington-jr.-feat.-bill-withers-just-the-two-of-us-hq_202202/Grover%20Washington%20Jr.%20feat.%20Bill%20Withers%20-%20Just%20The%20Two%20of%20Us%20%5BHQ%5D.mp3",
      startTime: 38,
      duration: 19000, // 40 seconds      duration: 20000, // 40 seconds
    },
    {
      url: "https://www.matb3aa.com/music/Amir-Eid/Album-Roxi-2024/07-ElDonia.Hoss-MaTb3aa.Com.mp3",
      startTime: 58,
      duration: 35000, // 30 seconds
    },
    {
      url: "https://archive.org/download/coldplay-yellow-acoustic-cover_20210323/Coldplay - Yellow Acoustic Cover.mp3",
      startTime: 29,
      duration: 1000000,
    },
  ];

  const startPlayback = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const activeRef = currentAudioRef.current === "A" ? audioRefA : audioRefB;
    const nextRef = currentAudioRef.current === "A" ? audioRefB : audioRefA;

    if (!activeRef.current || !nextRef.current) {
      isTransitioning.current = false;
      return;
    }

    const activeAudio = activeRef.current;
    const nextAudio = nextRef.current;

    const index = songIndexRef.current;
    const { url, startTime, duration } = songList[index];

    const loadAndPlayAudio = (
      audio: HTMLAudioElement,
      url: string,
      startTime: number
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
        audio.pause();
        audio.src = url;
        audio.load();
        audio.volume = 0;

        const handleMetadata = () => {
          audio.currentTime = startTime;
          audio.play().then(resolve).catch(reject);
        };

        if (audio.readyState >= 1) {
          handleMetadata();
        } else {
          audio.onloadedmetadata = handleMetadata;
          audio.onerror = reject;
        }
      });
    };

    const transitionToNext = () => {
      const nextIndex = (songIndexRef.current + 1) % songList.length;
      const { url: nextUrl, startTime: nextStart } = songList[nextIndex];

      const nextRefNow =
        currentAudioRef.current === "A" ? audioRefB : audioRefA;
      const activeRefNow =
        currentAudioRef.current === "A" ? audioRefA : audioRefB;

      if (!nextRefNow.current || !activeRefNow.current) return;

      const nextAudio = nextRefNow.current;
      const activeAudio = activeRefNow.current;

      loadAndPlayAudio(nextAudio, nextUrl, nextStart)
        .then(() => {
          gsap.to(activeAudio, {
            volume: 0,
            duration: 3,
            ease: "power2.inOut",
          });

          gsap.to(nextAudio, {
            volume: 0.3,
            duration: 3,
            ease: "power2.inOut",
            onComplete: () => {
              currentAudioRef.current =
                currentAudioRef.current === "A" ? "B" : "A";
              songIndexRef.current = nextIndex;
              if (nextIndex === 2) {
                setIsNightMode(true);
              } else {
                setIsNightMode(false);
              }
              isTransitioning.current = false;

              console.log(
                "Switched to audio",
                currentAudioRef.current,
                "at index",
                nextIndex
              );

              // Schedule next transition based on new song's duration
              const nextDuration = songList[nextIndex].duration;
              setTimeout(transitionToNext, nextDuration);
            },
          });
        })
        .catch((err) => {
          console.error("Next audio playback error:", err);
          isTransitioning.current = false;
        });
    };

    loadAndPlayAudio(activeAudio, url, startTime)
      .then(() => {
        gsap.to(activeAudio, {
          volume: 0.3,
          duration: 3,
          ease: "power2.inOut",
        });

        // Schedule first transition
        setTimeout(transitionToNext, duration);
      })
      .catch((err) => {
        console.error("Initial audio playback error:", err);
        isTransitioning.current = false;
      });
  };
  // 🔄 Play + Crossfade Logic
  useEffect(() => {
    if (!audioAllowed || playbackLoopStarted.current) return;
    playbackLoopStarted.current = true;
    startPlayback();
  }, [audioAllowed]);

  useEffect(() => {
    if (!isNightMode) return;

    const createStar = () => {
      const star = document.createElement("div");
      const size = 6 + Math.random() * 6;
      const duration = 2 + Math.random() * 2;

      star.className = "falling-star";
      star.style.left = `${Math.random() * 100}vw`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDuration = `${duration}s`;
      star.style.opacity = `${0.6 + Math.random() * 0.4}`;

      document.body.appendChild(star);
      setTimeout(() => document.body.removeChild(star), duration * 1000);
    };

    const interval = setInterval(createStar, 300);
    return () => clearInterval(interval);
  }, [isNightMode]);

  // 🚀 Trigger audio on scroll
  useEffect(() => {
    const playAudio = () => {
      if (triggeredRef.current) return;
      console.log("Audio play triggered");

      triggeredRef.current = true; // guard against re-trigger
      setAudioAllowed(true);
      songIndexRef.current = 0;
      setHasPlayed(true);
    };
    const triggerElement = document.querySelector(".containerVideoTwo");

    if (triggerElement) {
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "bottom bottom",
        once: true,
        onEnter: () => {
          console.log("Video is fully in view – pausing scroll");

          // Pause Lenis and auto-scroll
          lenis.stop();
          if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
          }
          document.body.style.overflow = "hidden";

          setTimeout(() => {
            lenis.start();
            document.body.style.overflow = "";
            console.log("Resumed scrolling after 2 minutes");

            // ✅ Restart auto scroll
            startAutoScroll();
          }, 95000);
        },
      });
    }

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
        onEnter: playAudio,
      },
    });

    // Other GSAP scroll animations
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

    gsap.to("#boomerangVideo", {
      scale: 1.5,
      opacity: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero",
        start: "top 50%",
        end: "top top",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    gsap.to("video", {
      scale: 1.5,
      opacity: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".hero",
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }, [audioAllowed, hasPlayed]);

  const startAutoScroll = () => {
    if (autoScrollStarted) return;
    setAutoScrollStarted(true);

    const scrollLoop = () => {
      const now = performance.now();
      const deltaY = window.scrollY - lastScrollTop.current;
      const deltaT = now - lastTimestamp.current;
      const speed = deltaY / (deltaT / 1000);
      setScrollSpeed(Number(speed.toFixed(2)));
      lastScrollTop.current = window.scrollY;
      lastTimestamp.current = now;

      const divs = document.querySelectorAll("div[data-scroll-speed]");
      let currentSpeed = 1;
      divs.forEach((div) => {
        const rect = div.getBoundingClientRect();
        const inView =
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2;
        if (inView) {
          const speedAttr = div.getAttribute("data-scroll-speed");
          const parsed = parseFloat(speedAttr ?? "0.5");
          if (!isNaN(parsed)) currentSpeed = parsed;
        }
      });

      scrollYRef.current += currentSpeed;

      lenis.scrollTo(scrollYRef.current, {
        duration: 1.2,
        easing: (t) => t,
        immediate: true,
      });

      if (
        scrollYRef.current >=
        document.body.scrollHeight - window.innerHeight
      ) {
        clearInterval(scrollIntervalRef.current!);
        scrollIntervalRef.current = null;
      }
    };

    scrollIntervalRef.current = setInterval(scrollLoop, 20);
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      setAutoScrollStarted(true);
      startAutoScroll();
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("touchstart", handleFirstInteraction, {
      once: true,
    });
    window.addEventListener("click", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className={isNightMode ? "night-mode" : ""} data-scroll-speed="0.7">
      {isNightMode && <img src="/images/moon.png" className="moon" />}
      {/* 🎵 Two crossfading audio elements */}
      <audio ref={audioRefA} />
      <audio ref={audioRefB} />
      {/* 📣 Audio Fallback */}
      {!audioAllowed && (
        <button
          onClick={() => {
            setAudioAllowed(true);
            songIndexRef.current = 0;
          }}
          style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
        >
          🔊 Enable Audio
        </button>
      )}
      <ThreeJSModel /> {/* This will display the 3D model */}
      <CursorEffect />
      <div className="containerVideo" data-scroll-speed="0.7">
        <video id="boomerangVideo" autoPlay loop muted>
          <source src="/images/austria/editedDance.mp4" type="video/mp4" />
        </video>
        <div className="maskWord" data-scroll-speed="0.7">
          <h2 style={{ textAlign: "center" }}>
            To my One and Only, the girl I love the most
          </h2>
        </div>
      </div>
      <div className="textSection" data-scroll-speed="2">
        <section
          style={{ height: "300vh" }}
          className="hero"
          data-scroll-speed="0.8"
        >
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
        <div className="photo-stack" data-scroll-speed="1.5">
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
      <section className="info" data-scroll-speed="0.5">
        {" "}
        <div className="tags" style={{ scale: "0.69" }} data-scroll-speed="0.9">
          <div className="containerVideoTwo">
            <video
              autoPlay
              loop
              muted
              style={{
                position: "relative",
                zIndex: 100,
                opacity: 1.0,
                transform: "0",
                translate: "0",
                scale: 0.69,
              }}
            >
              <source
                id="videoTwo"
                className="videoTwo"
                src="/images/austria/WholeVideo.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <p>DAAAMNN</p>
        </div>
        {/* Timeline Section - Fixes Placement */}
        <div className="phototimeparent" data-scroll-speed="0.7">
          <h1>We went from this</h1>
          <div className="phototime">
            <PhotoTimelineTwo></PhotoTimelineTwo>
          </div>
          <h1>To this</h1>
          <div className="phototime">
            <PhotoTimeline></PhotoTimeline>
          </div>
        </div>
        <div data-scroll-speed="2">
          <span style={{ fontSize: "36px" }}>
            Some snippets of our conversations
          </span>
          <div>
            <FakeChatSlider />
          </div>
        </div>
      </section>
      <section className="mapReveal" style={{}} data-scroll-speed="0.5">
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
          data-scroll-speed="1"
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
      <section data-scroll-speed="0.5">
        <div
          style={{
            backgroundColor: "#FFFFFF80",
            borderRadius: "20px",
            textAlign: "center",
            padding: "2rem",
            margin: "1rem",
          }}
          data-scroll-speed="1"
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
