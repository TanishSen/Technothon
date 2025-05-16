import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import vertexShader from "./shaders/vertex.js";
import fragmentShader from "./shaders/fragment.js";

const images = [
  "/images/hero-bg.jpg",
  "/images/hero-bg-2.jpg",
  "/images/hero-bg-3.jpg",
];

function Hero() {
  const containerRef = useRef(null);
  const rendererRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const materialRef = useRef();
  const frameId = useRef();
  const texturesRef = useRef([]);
  const currentIndexRef = useRef(0);
  const nextIndexRef = useRef(1);
  const transitionTimeout = useRef();
  const [loaded, setLoaded] = useState(false);
  const animationStateRef = useRef({
    transitioning: false,
    lastTime: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    // High-quality renderer settings
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      precision: "highp",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Texture loading with progress tracking
    const loader = new THREE.TextureLoader();
    let loadedCount = 0;
    const totalImages = images.length;

    // Create loading animation if desired
    const startLoading = () => {
      // Optional: Add a loading animation here
    };

    const finishLoading = () => {
      setLoaded(true);
      startShader();
      // Optional: Fade out loading animation
    };

    startLoading();

    // Load all textures with high quality settings
    images.forEach((src, i) => {
      loader.load(
        src,
        (texture) => {
          // Apply texture settings for better quality
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

          texturesRef.current[i] = texture;
          loadedCount++;

          if (loadedCount === totalImages) {
            finishLoading();
          }
        },
        undefined, // Progress callback (optional)
        (err) => console.error("Error loading texture", err)
      );
    });

    function startShader() {
      // Create shader material with enhanced uniforms
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uTexture1: { value: texturesRef.current[0] },
          uTexture2: { value: texturesRef.current[1] },
          uResolution: {
            value: new THREE.Vector2(
              container.offsetWidth,
              container.offsetHeight
            ),
          },
        },
        vertexShader,
        fragmentShader,
      });
      materialRef.current = material;

      // Plane geometry
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Start animation loop
      let start = null;
      const animate = (now) => {
        if (!start) start = now;
        const elapsed = (now - start) / 1000;

        // Smooth time value
        material.uniforms.uTime.value = elapsed;

        // Only render when needed for better performance
        renderer.render(scene, camera);
        frameId.current = requestAnimationFrame(animate);
      };

      frameId.current = requestAnimationFrame(animate);

      // Start cycling images with delay for initial impact
      setTimeout(() => {
        cycleImages();
      }, 1000);
    }

    function cycleImages() {
      const material = materialRef.current;
      if (!material || animationStateRef.current.transitioning) return;

      // Set animation state
      animationStateRef.current.transitioning = true;

      // Update textures for transition
      material.uniforms.uTexture1.value =
        texturesRef.current[currentIndexRef.current];
      material.uniforms.uTexture2.value =
        texturesRef.current[nextIndexRef.current];

      // Reset progress
      material.uniforms.uProgress.value = 0;

      // Create sophisticated animation timeline with GSAP
      const timeline = gsap.timeline({
        onComplete: () => {
          // After transition completes
          currentIndexRef.current = nextIndexRef.current;
          nextIndexRef.current = (nextIndexRef.current + 1) % images.length;

          // Reset animation state
          animationStateRef.current.transitioning = false;

          // Schedule next transition with variable timing for more natural rhythm
          const holdDuration = 3.5 + Math.random() * 1.0; // Between 3.5-4.5 seconds
          transitionTimeout.current = setTimeout(
            cycleImages,
            holdDuration * 1000
          );
        },
      });

      // Create sophisticated animation sequence
      timeline.to(material.uniforms.uProgress, {
        value: 1,
        duration: 2.5,
        ease: "power2.inOut", // Smoother classical easing
        onUpdate: () => {
          // Ensure value stays within bounds for stability
          material.uniforms.uProgress.value = Math.min(
            1,
            Math.max(0, material.uniforms.uProgress.value)
          );
        },
      });
    }

    // Enhanced responsive handling with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        // Update renderer size
        renderer.setSize(width, height);

        // Update resolution uniform if material exists
        if (materialRef.current) {
          materialRef.current.uniforms.uResolution.value.set(width, height);
        }
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    // Store geometry reference for cleanup
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Clean up all resources properly
    return () => {
      cancelAnimationFrame(frameId.current);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      clearTimeout(transitionTimeout.current);

      // Dispose Three.js resources to prevent memory leaks
      if (rendererRef.current) rendererRef.current.dispose();
      if (materialRef.current) materialRef.current.dispose();
      if (geometry) geometry.dispose();

      // Clean up DOM
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      className="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "85vh", // Slightly taller for more impact
        overflow: "hidden",
      }}
    >
      {/* WebGL container */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />

      {/* Improved overlay with gradient */}
      <div
        className="hero-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
          zIndex: 2,
        }}
      />

      {/* Hero content with animation */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "clamp(2rem, 6vw, 4rem)", // Responsive font size
            textAlign: "center",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            lineHeight: 1.2,
            margin: 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition:
              "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1), opacity 1.2s ease",
          }}
        >
          <span style={{ display: "block", marginBottom: "0.5rem" }}>
            INNOVATE
          </span>
          <span style={{ display: "block", marginBottom: "0.5rem" }}>
            THE STUDENT
          </span>
          <span style={{ display: "block" }}>WAY</span>
        </h1>
      </div>
    </section>
  );
}

export default Hero;
