import React, { useState, useEffect } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import "./FlipCountdown.css";

const FlipCountdown: React.FC = () => {
  const targetDate = new Date("2025-12-26T00:00:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0)
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };

    // console.log("difference: ", difference);
    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      ),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      ),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
        2,
        "0"
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <h3>Countdown to Our Wedding 💍</h3>
      <div className="countdown">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="time-box">
            <Flipper flipKey={value}>
              <Flipped flipId={label}>
                <div className="flip-card2">
                  <span>{value}</span>
                </div>
              </Flipped>
            </Flipper>
            <small>{label.toUpperCase()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlipCountdown;
