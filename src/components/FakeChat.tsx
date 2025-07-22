import React, { useEffect, useState } from "react";
import "./FakeChat.css";
/*
const messages = [
  {
    from: "them",
    text: "Ya Tobbala",
    delay: 1000,
    timestamp: new Date("2016-11-11T14:07:00"),
    type: "text",
  },
  {
  --
    from: "them",
    text: "eh akhbarak fl ghorba?",
    delay: 1500,
    timestamp: new Date("2016-11-11T14:07:00"),
    type: "text",
  },
  {
    from: "you",
    text: "enti eh a5barek f masr",
    delay: 2500,
    timestamp: new Date("2016-11-11T14:07:00"),
    type: "text",
  },
  {
    from: "them",
    text: "masr helwa :P",
    delay: 4000,
    timestamp: new Date("2023-02-10T20:41:00"),
    type: "text",
  },
  {
    from: "them",
    text: "betsalem 3alek",
    delay: 4000,
    timestamp: new Date("2023-02-10T20:41:00"),
    type: "text",
  },
  {
    from: "you",
    text: "betew7ashni masr awi wallahy ❤️",
    delay: 5500,
    timestamp: new Date("2023-02-10T20:41:00"),
    type: "text",
  },
  {
    from: "them",
    text: "يا حبيبتي يا مصر يا مصر ",
    delay: 7000,
    timestamp: new Date("2023-02-10T20:41:00"),
    type: "text",
  },
];

const FakeChat = () => {
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
          <div className="text">{msg.text}</div>
          <div className="timestamp">{formatTime(msg.timestamp)}</div>
        </div>
      ))}
    </div>
  );
};

export default FakeChat;
 */
interface Message {
  from: string;
  text?: string;
  delay?: number;
  timestamp: Date;
  type: string;
  src?: string;
}

interface FakeChatProps {
  messages: Message[];
}

const FakeChat = ({ messages }: FakeChatProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);

  useEffect(() => {
    setVisibleMessages(0);
    messages.forEach((msg: any, index: any) => {
      setTimeout(() => {
        setVisibleMessages((prev) => prev + 1);
      }, msg.delay || 1000 * index);
    });
  }, [messages]);

  const formatTime = (date: Date) =>
    date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="chat-container">
      {messages.slice(0, visibleMessages).map((msg: any, index: any) => (
        <div key={index} className={`message ${msg.from}`}>
          {msg.type === "text" ? (
            <div className="text">{msg.text}</div>
          ) : (
            <img className="chat-image" src={msg.src} alt="Shared" />
          )}
          <div className="timestamp">{formatTime(msg.timestamp)}</div>
        </div>
      ))}
    </div>
  );
};
export default FakeChat;
