import React from "react";

const WeddingDetails = () => {
  return (
    <section className="wedding-details">
      <h2>Wedding Venue</h2>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed/v1/place?q=Mariott+Zamalek"
          width="600"
          height="450"
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default WeddingDetails;
