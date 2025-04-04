import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./FirstMeetMap.css"; // We'll do basic styles here

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWx5dG9iYmFsYSIsImEiOiJjbTkzMTlnNngwZzF6MnNzNTJqZ3MzdnJnIn0.alpZsZ8mKmNT50XOUsmUnQ"; // Replace this!

const FirstMeetMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapInView, setMapInView] = useState(false);

  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [13.3423514, 52.5117491], // Example: Berlin coordinates
        zoom: 1.5,
        pitch: 45,
        bearing: 0,
        antialias: true,
      });

      mapRef.current = map;

      map.on("load", () => {
        setMapReady(true);
      });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapInView(true);
          }
        });
      },
      {
        threshold: 0.4, // Trigger when ~40% of map is visible
      }
    );

    if (mapContainer.current) {
      observer.observe(mapContainer.current);
    }

    return () => {
      if (mapContainer.current) observer.unobserve(mapContainer.current);
    };
  }, []);

  // 3. Trigger flyTo and marker once in view and map is ready
  useEffect(() => {
    if (mapReady && mapInView && mapRef.current) {
      const map = mapRef.current;

      map.flyTo({
        center: [13.3423514, 52.5117491],
        zoom: 15,
        speed: 0.95,
        curve: 1.5,
        easing: (t) => t,
      });

      const marker = document.createElement("div");
      marker.className = "heart-marker";

      new mapboxgl.Marker({ color: "red" })
        .setLngLat([13.3423514, 52.5117491])
        .addTo(map);
    }
  }, [mapReady, mapInView]);

  return <div ref={mapContainer} className="map-container" />;
};

export default FirstMeetMap;
