import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ThreeJSModel = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<any>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    // ✅ Setup Three.js Scene
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

    // ✅ Add Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 5, 2);
    scene.add(directionalLight);

    // ✅ Load 3D Model
    const loader = new GLTFLoader();
    loader.load(
      "../public/images/sunflower.glb",
      (gltf) => {
        console.log("✅ Model loaded successfully", gltf);
        modelRef.current = gltf.scene;
        scene.add(gltf.scene);

        // ✅ Set the initial scale and position
        gltf.scene.scale.set(0.6, 0.6, 0.6);
        gltf.scene.position.set(0, 4.2, 0);

        // ✅ Apply Glow Effect (Emissive Material)

        let scrollProgress = { value: 0 };

        gsap.to(scrollProgress, {
          value: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".containerVideo",
            start: "top top",
            endTrigger: ".masonry",
            end: "top 70%",
            scrub: true,
            onUpdate: () => {
              if (modelRef.current) {
                const easedProgress = Math.pow(scrollProgress.value, 1.5);
                modelRef.current.position.y = 4.2 - easedProgress * 6;
                const windFactor = Math.sin(scrollProgress.value * Math.PI * 3);
                modelRef.current.position.x =
                  windFactor * 0.8 + easedProgress * 2;
                modelRef.current.position.z =
                  Math.cos(scrollProgress.value * Math.PI * 2) * 0.4;
                modelRef.current.rotation.x =
                  Math.sin(scrollProgress.value * Math.PI * 2) * 0.6;
                modelRef.current.rotation.y =
                  Math.sin(scrollProgress.value * Math.PI) * 0.3;
                modelRef.current.rotation.z =
                  scrollProgress.value * Math.PI * 3;
                const scaleFactor = 0.6 - easedProgress * 0.6;
                modelRef.current.scale.set(
                  scaleFactor,
                  scaleFactor,
                  scaleFactor
                );
              }
            },
          },
          onReverseComplete: () => {
            gsap.to(modelRef.current.rotation, {
              x: 0,
              y: 0,
              z: 0,
              duration: 1.2,
              ease: "power2.out",
            });
            gsap.to(modelRef.current.scale, {
              x: 0.6,
              y: 0.6,
              z: 0.6,
              duration: 1.2,
              zIndex: 3,
              ease: "power2.out",
            });
          },
        });

        // ✅ Play animations if available
        if (gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
          mixerRef.current = mixer;
        }
      },
      undefined,
      (error) => console.error("❌ Error loading model:", error)
    );

    // ✅ Handle Mouse Movement (Tilt Effect)
    window.addEventListener("mousemove", (event) => {
      if (!modelRef.current) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 0.3;
      const y = (event.clientY / window.innerHeight - 0.5) * 0.3;
      gsap.to(modelRef.current.rotation, { x: -y, y: x, duration: 0.5 });
    });

    // ✅ Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (mixerRef.current) mixerRef.current.update(clock.getDelta());
      renderer.render(scene, camera);
    };
    animate();

    // ✅ Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", () => {});
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="threejs-container"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ThreeJSModel;
