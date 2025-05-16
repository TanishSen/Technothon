// components/Hero.jsx
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

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      precision: "highp",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const loader = new THREE.TextureLoader();
    let loadedCount = 0;
    const totalImages = images.length;

    const startLoading = () => {};

    const finishLoading = () => {
      setLoaded(true);
      startShader();
    };

    startLoading();

    images.forEach((src, i) => {
      loader.load(
        src,
        (texture) => {
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
        undefined,
        (err) => console.error("Error loading texture", err)
      );
    });

    function startShader() {
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

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      let start = null;
      const animate = (now) => {
        if (!start) start = now;
        const elapsed = (now - start) / 1000;

        material.uniforms.uTime.value = elapsed;

        renderer.render(scene, camera);
        frameId.current = requestAnimationFrame(animate);
      };

      frameId.current = requestAnimationFrame(animate);

      setTimeout(() => {
        cycleImages();
      }, 1000);
    }

    function cycleImages() {
      const material = materialRef.current;
      if (!material || animationStateRef.current.transitioning) return;

      animationStateRef.current.transitioning = true;

      material.uniforms.uTexture1.value =
        texturesRef.current[currentIndexRef.current];
      material.uniforms.uTexture2.value =
        texturesRef.current[nextIndexRef.current];

      material.uniforms.uProgress.value = 0;

      const timeline = gsap.timeline({
        onComplete: () => {
          currentIndexRef.current = nextIndexRef.current;
          nextIndexRef.current = (nextIndexRef.current + 1) % images.length;

          animationStateRef.current.transitioning = false;

          const holdDuration = 4.5 + Math.random() * 1.5;
          transitionTimeout.current = setTimeout(
            cycleImages,
            holdDuration * 1000
          );
        },
      });

      timeline.to(material.uniforms.uProgress, {
        value: 1,
        duration: 3,
        ease: "power1.inOut",
        onUpdate: () => {
          material.uniforms.uProgress.value = Math.min(
            1,
            Math.max(0, material.uniforms.uProgress.value)
          );
        },
      });
    }

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        renderer.setSize(width, height);

        if (materialRef.current) {
          materialRef.current.uniforms.uResolution.value.set(width, height);
        }
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId.current);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      clearTimeout(transitionTimeout.current);

      if (renderer) renderer.dispose();
      if (materialRef.current) materialRef.current.dispose();
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }

      if (container && renderer && container.contains(renderer.domElement)) {
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
        height: "100vh", // Full height for dramatic effect
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

      {/* Darker overlay with gradient - matches reference */}
      <div
        className="hero-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.45))",
          zIndex: 2,
        }}
      />

      {/* Navigation bar */}
      <div
        className="navbar"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          padding: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Logo/Brand */}
        {/* <div className="logo">
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              margin: 0,
              fontFamily: "sans-serif",
            }}
          >
            TECHNOTHON
          </h2>
        </div> */}

        {/* Navigation links */}
        {/* <div
          className="nav-links"
          style={{
            display: "flex",
            gap: "2rem",
          }}
        > */}
        {/* {["ABOUT US", "EVENTS", "INNOVATIONS", "UPCOMING EVENTS"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  transition: "opacity 0.3s ease",
                  opacity: 0.9,
                  fontFamily: "sans-serif",
                }}
                onMouseOver={(e) => (e.target.style.opacity = 1)}
                onMouseOut={(e) => (e.target.style.opacity = 0.9)}
              >
                {item}
              </a>
            )
          )}
        </div> */}
      </div>

      {/* Left/right navigation arrows (optional) */}
      <div
        className="slider-navigation"
        style={{
          position: "absolute",
          bottom: "45vh",
          left: "6rem",
          display: "flex",
          gap: "1rem",
          zIndex: 4,
          opacity: 0.8,
        }}
      >
        <button
          className="nav-arrow prev"
          onClick={() => {
            if (animationStateRef.current.transitioning) return;
            clearTimeout(transitionTimeout.current);
            nextIndexRef.current =
              (currentIndexRef.current - 1 + images.length) % images.length;
            cycleImages();
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <div
            style={{
              width: "6rem",
              height: "2px",
              background: "#fff",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "0.7rem",
                height: "2px",
                background: "#fff",
                position: "absolute",
                left: 0,
                top: "-3px",
                transform: "rotate(45deg)",
                transformOrigin: "left center",
              }}
            />
            <div
              style={{
                width: "0.7rem",
                height: "2px",
                background: "#fff",
                position: "absolute",
                left: 0,
                bottom: "-3px",
                transform: "rotate(-45deg)",
                transformOrigin: "left center",
              }}
            />
          </div>
        </button>
        <button
          className="nav-arrow next"
          onClick={() => {
            if (animationStateRef.current.transitioning) return;
            clearTimeout(transitionTimeout.current);
            nextIndexRef.current =
              (currentIndexRef.current + 1) % images.length;
            cycleImages();
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <div
            style={{
              width: "6rem",
              height: "2px",
              background: "#fff",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "0.7rem",
                height: "2px",
                background: "#fff",
                position: "absolute",
                right: 0,
                top: "-3px",
                transform: "rotate(-45deg)",
                transformOrigin: "right center",
              }}
            />
            <div
              style={{
                width: "0.7rem",
                height: "2px",
                background: "#fff",
                position: "absolute",
                right: 0,
                bottom: "-3px",
                transform: "rotate(45deg)",
                transformOrigin: "right center",
              }}
            />
          </div>
        </button>
      </div>

      <div
        className="hero-content"
        style={{
          position: "absolute",
          bottom: "10vh",
          left: "3rem",
          zIndex: 3,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <h1
          className="scroll-animate-text francois-font"
          style={{
            color: "#fff",
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            fontWeight: 400,
            letterSpacing: "0.05em",
            lineHeight: 1.1,
            margin: 0,
            textTransform: "uppercase",
            transition:
              "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1), opacity 1.2s ease",
          }}
        >
          <span style={{ display: "block" }}>Innovate</span>
          <span style={{ display: "block" }}>The Student</span>
          <span style={{ display: "block" }}>Way</span>
        </h1>
      </div>
    </section>
  );
}

export default Hero;
