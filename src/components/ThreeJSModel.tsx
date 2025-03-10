import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ThreeJSModel = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 5, 2);
    scene.add(directionalLight);

    // Load GLTF Model
    const loader = new GLTFLoader();
    // Load GLTF Model
    loader.load(
      "../public/images/sunflower.glb",
      (gltf) => {
        console.log("✅ Model loaded successfully", gltf);
        modelRef.current = gltf.scene;
        scene.add(gltf.scene);

        // Set model position high up
        gltf.scene.scale.set(0.7, 0.7, 0.7);
        gltf.scene.position.set(0, 5, 0); // Ensure it starts at y=5
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);

        // If the model has animations, start playing them
        if (gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
          mixerRef.current = mixer;
        }

        // Setup ScrollTrigger after model is loaded
        setupScrollTrigger();
      },
      undefined,
      (error) => console.error("❌ Error loading model:", error)
    );

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005; // Continue rotation
      }

      if (mixerRef.current) {
        mixerRef.current.update(clock.getDelta());
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Falling animation on scroll
  const setupScrollTrigger = () => {
    if (!modelRef.current) return;

    let targetY = -1; // Target position for the model to fall to

    ScrollTrigger.create({
      trigger: ".textSection",
      start: "top 80%",
      end: "top 20%",
      scrub: true,
      onUpdate: (self) => {
        if (modelRef.current) {
          const progress = self.progress; // Scroll progress (0 to 1)
          modelRef.current.position.y = 5 - 6 * progress; // Gradually move from y=5 to y=-1
        }
      },
      invalidateOnRefresh: true,
    });

    ScrollTrigger.refresh();
  };

  return (
    <div
      ref={mountRef}
      className="threejs-container"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ThreeJSModel;
