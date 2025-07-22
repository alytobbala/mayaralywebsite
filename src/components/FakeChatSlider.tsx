// components/FakeChatSlider.tsx
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import FakeChat from "./FakeChat";

const allChats = [
  [
    {
      from: "them",
      text: "Ya Tobbala",
      delay: 1000,
      timestamp: new Date("2016-11-11T14:07:00"),
      type: "text",
    },
    {
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
  ],
  [
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
  ],
  [
    // Chat 3 messages
    {
      from: "them",
      text: "I love youuuuuuuuuuu!",
      timestamp: new Date(),
      delay: 1000,
      type: "text",
    },
    {
      from: "you",
      text: "eh dah, out of no where keda ?, well I love you tooooooooooo ❤️❤️❤️",
      timestamp: new Date(),
      delay: 2500,
      type: "text",
    },
  ],
  [
    // Chat 3 messages
    {
      from: "you",
      text: "خشي نامي يا ميورة",
      timestamp: new Date(),
      delay: 1000,
      type: "text",
    },
    {
      from: "them",
      text: "بحاول",
      timestamp: new Date(),
      delay: 2500,
      type: "text",
    },
    {
      from: "you",
      text: "ما طول ما انتي بتهزري كده, هتنامي ازاي 😂",
      timestamp: new Date(),
      delay: 1000,
      type: "text",
    },
    {
      from: "them",
      text: "طب و النبي ايه رايك في السايد بتاعي دا, ميورة للمتنوعات",
      timestamp: new Date(),
      delay: 1000,
      type: "text",
    },
    {
      from: "you",
      text: "I like all your sides",
      timestamp: new Date(),
      delay: 1000,
      type: "text",
    },
    {
      from: "you",
      src: "/images/hamdy.png",
      timestamp: new Date(),
      delay: 1000,
      type: "image",
    },
  ],
];

const FakeChatSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedRight: () => {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    },
    onSwipedLeft: () => {
      setCurrentIndex((prev) => Math.min(prev + 1, allChats.length - 1));
    },
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      style={{
        overflow: "hidden",
        width: "100vw",
        maxWidth: "100vw",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          width: `${allChats.length * 100}vw`,
          transition: "transform 0.5s ease",
          transform: `translateX(-${currentIndex * 100}vw)`,
        }}
      >
        {allChats.map((messages, i) => (
          <div
            key={i}
            style={{
              width: "100vw",
              flexShrink: 0,
              display: "flex",
              justifyContent: "center", // center horizontally
              alignItems: "center", // optional: center vertically too
              padding: "2rem 0", // spacing from top/bottom
            }}
          >
            <FakeChat key={i} messages={messages} />
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "0px", color: "beige" }}>
        {currentIndex + 1} / {allChats.length}
      </div>
    </div>
  );
};

export default FakeChatSlider;
