import React from "react";
import Slider from "react-slick";
import "./GalleryCarousel.css"; // Import custom styles for carousel

const GalleryCarousel: React.FC = () => {
  // List of images for the carousel
  const images = [
    "/images/austria/1.jpg", // Replace with your image paths
    "/images/austria/2.jpg",
    "/images/austria/3.jpg",
    "/images/austria/4.jpg",
    "/images/austria/5.jpg",
    "/images/austria/6.jpg",
    "/images/austria/7.jpg",
    "/images/austria/8.jpg",
    "/images/austria/9.jpg",
    "/images/austria/10.jpg",
    "/images/austria/11.jpg",
  ];

  // Slick carousel settings
  const settings = {
    dots: true, // Show dots at the bottom
    infinite: true, // Loop the images infinitely
    speed: 500, // Transition speed
    slidesToShow: 1, // Show 1 image at a time
    slidesToScroll: 1, // Scroll 1 image at a time
    autoplay: true, // Automatically scroll
    autoplaySpeed: 3000, // Speed of auto scroll
  };

  return (
    <div className="gallery-carousel">
      <h2>Our Memories</h2>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Wedding Photo ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GalleryCarousel;
