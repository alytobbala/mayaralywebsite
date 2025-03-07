import React, { useState, useEffect } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GalleryCarousel from "./components/GalleryCarousel";
import CursorEffect from "./components/CursorEffect";
import CountdownTimer from "./components/CountdownTimer";
import FlipCountdown from "./components/FlipCountdown";
import WeddingDetails from "./components/WeddingDetails";
import { FaLock, FaLockOpen } from "react-icons/fa"; // Import lock icons
import Timeline from "./components/Timeline"; // Import the Timeline Component

const CORRECT_PASSWORD = "ourwedding2025"; // Change this to your password

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false); // Track unlock animation
  const [isFadingIn, setIsFadingIn] = useState(false); // Track fade-in effect

  useEffect(() => {
    const storedAuth = localStorage.getItem("weddingAccess");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      setIsFadingIn(true); // If authenticated already, fade in immediately
    }
  }, []);

  useEffect(() => {
    // Reset any zoom or transform effects on page load
    document.body.style.transform = "none";
    document.body.style.zoom = "1";
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsUnlocking(true); // Trigger unlock animation
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsFadingIn(true); // Trigger fade-in effect after unlocking
        localStorage.setItem("weddingAccess", "true");
      }, 1000); // Wait 1 second before fading in
    } else {
      alert("Incorrect password. Please try again!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="password-container">
        <div className={`lock-icon ${isUnlocking ? "unlock" : ""}`}>
          {isUnlocking ? <FaLockOpen size={50} /> : <FaLock size={50} />}
        </div>
        <h2>Enter Password to Access</h2>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <button type="submit">Unlock</button>
        </form>
      </div>
    );
  }

  return (
    <div className={`App ${isFadingIn ? "fade-in" : ""}`}>
      <CursorEffect />
      <header className="header">
        <h1 style={{ color: "black" }}>Welcome to Our Wedding Website</h1>
        <FlipCountdown />
      </header>
      <div style={{ backgroundColor: "#f2f2f2" }}>
        <section className="how-it-started">
          <div className="background-image">
            <div className="overlay">
              <h2>How It All Started</h2>
              <p style={{ color: "white", backgroundColor: "#00000050" }}>
                School - the place where we met, where we laughed, where we
                cried, and where we fell in love. Our journey began in the
                classroom, but our love story has no end.
              </p>
            </div>
          </div>
        </section>
        <section className="wedding-vows">
          <h2>My Wedding Vow to You</h2>
          <p>
            My dearest Mayoora, from the moment I met you, my heart has been
            filled with love and joy. Today, I vow to be by your side, to
            support and cherish you, through every challenge and every victory.
          </p>
        </section>
        <Timeline /> {/* Add the timeline component here */}
        <GalleryCarousel />
      </div>
      <footer style={{ backgroundColor: "#f2f2f2" }} className="footer">
        <h2 style={{ marginTop: "0px" }}>Made with love - Save the Date</h2>
        <CountdownTimer />
      </footer>
    </div>
  );
}

export default App;
