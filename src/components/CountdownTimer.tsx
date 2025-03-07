import React, { useState, useEffect } from "react";

const CountdownTimer: React.FC = () => {
  const targetDate = new Date("2025-12-26T00:00:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
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
      <h2>Countdown to Our Wedding 💍</h2>
      <div className="countdown">
        <div className="time-box">
          <span>{timeLeft.days}</span> Days
        </div>
        <div className="time-box">
          <span>{timeLeft.hours}</span> Hours
        </div>
        <div className="time-box">
          <span>{timeLeft.minutes}</span> Minutes
        </div>
        <div className="time-box">
          <span>{timeLeft.seconds}</span> Seconds
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
