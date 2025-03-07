import React, { useState, useEffect, useRef } from "react";
import "./Timeline.css"; // You can put the styles in a separate file if you prefer

interface Milestone {
  year: number;
  title: string;
  description: string;
  image: string;
}

const milestones: Milestone[] = [
  {
    year: 2022,
    title: "We Met",
    description: "We met for the first time at a friend's party.",
    image: "../../images/austria/1.jpg", // Sample image URL
  },
  {
    year: 2023,
    title: "Our First Trip",
    description: "We traveled to the mountains together.",
    image: "../../images/austria/2.jpg",
  },
  {
    year: 2024,
    title: "Engagement",
    description: "We got engaged on a beautiful beach.",
    image: "../../images/austria/3.jpg",
  },
  {
    year: 2025,
    title: "Wedding",
    description: "Our wedding is on December 26, 2025.",
    image: "../../images/austria/4.jpg",
  },
];

const Timeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    null
  );
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close the modal if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedMilestone(null); // Close the modal if clicked outside
      }
    };

    // Add event listener on mount
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickMilestone = (
    milestone: Milestone,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Prevent event propagation to the document level
    setSelectedMilestone(milestone); // Open the modal for the clicked milestone
  };

  const handleCloseModal = () => {
    setSelectedMilestone(null); // Close the modal
  };

  return (
    <div className="timeline-container">
      <div className="timeline">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.year}
            className="milestone"
            style={{
              left: `${(index / (milestones.length - 1)) * 90 + 2}% `,
            }}
            onClick={(event) => handleClickMilestone(milestone, event)}
          >
            <div className="milestone-year">{milestone.year}</div>
          </div>
        ))}
      </div>

      {selectedMilestone && (
        <div className="milestone-detail-modal" ref={modalRef}>
          <div className="modal-content">
            {/* Close button (X) */}
            <button className="close-btn" onClick={handleCloseModal}>
              X
            </button>

            <h3>{selectedMilestone.title}</h3>
            <img src={selectedMilestone.image} alt={selectedMilestone.title} />
            <p>{selectedMilestone.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
