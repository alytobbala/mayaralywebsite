import React, { useEffect, useState } from "react";
import "./FakeChat.css";

const messages = [
  {
    from: "you",
    text: "How is life treating you?",
    delay: 1000,
    timestamp: new Date("2020-07-19T14:51:00"),
    type: "text",
  },
  {
    from: "you",
    text: "bete3melli eh ? Work from home wala eh ? ",
    delay: 1000,
    timestamp: new Date("2020-07-19T14:51:00"),
    type: "text",
  },
  {
    from: "them",
    text: "I go for 2 days/week",
    delay: 1500,
    timestamp: new Date("2016-11-11T14:07:00"),
    type: "text",
  },
  {
    from: "them",
    text: "and I applied for a Master since winter",
    delay: 1500,
    timestamp: new Date("2016-11-11T14:07:00"),
    type: "text",
  },
  {
    from: "them",
    text: "working on personal projects and life is going well elhmdullahh",
    delay: 1500,
    timestamp: new Date("2016-11-11T14:07:00"),
    type: "text",
  },
  {
    from: "you",
    text: "7elw awiii, Eh el personal projects",
    delay: 2500,
    timestamp: new Date("2016-11-11T14:07:00"),
    type: "text",
  },
  {
    from: "them",
    text: "Working on some skills of mine in field of typography",
    delay: 4000,
    timestamp: new Date("2023-02-10T20:41:00"),
    type: "text",
  },
  {
    from: "you",
    text: "edaaaah 7elw awii, tool 3omri ba7eb el typography",
    delay: 4000,
    timestamp: new Date("2023-02-10T20:41:00"),
    type: "text",
  },
  {
    from: "them",
    src: "/images/typo.jpg",
    delay: 5500,
    timestamp: new Date("2023-02-10T20:41:00"),
    type: "image",
  },
  {
    from: "them",
    text: "I'm still working on myself, yet want to grow in this field else where but for now I'm satisfied with my job(although no guidance in GUC tbh) so I had to dig my own way through that by myself, courses ba2a or discover it myself",
    delay: 7000,
    timestamp: new Date("2023-02-10T20:41:00"),
    type: "text",
  },
];

const FakeChatTwo = () => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);

  const formatTime = (date: Date) =>
    date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  useEffect(() => {
    messages.forEach((msg, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => prev + 1);
      }, msg.delay);
    });
  }, []);

  return (
    <div className="chat-container">
      {messages.slice(0, visibleMessages).map((msg, index) => (
        <div key={index} className={`message ${msg.from}`}>
          {msg.type === "text" ? (
            <div className="text">{msg.text}</div>
          ) : (
            <img className="chat-image" src={msg.src} alt="Shared memory" />
          )}
          <div className="timestamp">{formatTime(msg.timestamp)}</div>
        </div>
      ))}
    </div>
  );
};

export default FakeChatTwo;
