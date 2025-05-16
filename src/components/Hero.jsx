// // components/Hero.jsx
// import { useRef, useEffect, useState } from "react";
// import * as THREE from "three";
// import { gsap } from "gsap";
// import vertexShader from "./shaders/vertex.js";
// import fragmentShader from "./shaders/fragment.js";

// const images = [
//   "/images/hero-bg.jpg",
//   "/images/hero-bg-2.jpg",
//   "/images/hero-bg-3.jpg",
// ];

// function Hero() {
//   const containerRef = useRef(null);
//   const rendererRef = useRef();
//   const sceneRef = useRef();
//   const cameraRef = useRef();
//   const materialRef = useRef();
//   const frameId = useRef();
//   const texturesRef = useRef([]);
//   const currentIndexRef = useRef(0);
//   const nextIndexRef = useRef(1);
//   const transitionTimeout = useRef();
//   const [loaded, setLoaded] = useState(false);
//   const animationStateRef = useRef({
//     transitioning: false,
//     lastTime: 0,
//   });

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     // Scene setup
//     const scene = new THREE.Scene();
//     sceneRef.current = scene;
//     const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
//     camera.position.z = 1;
//     cameraRef.current = camera;

//     // High-quality renderer settings
//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//       powerPreference: "high-performance",
//       precision: "highp",
//     });
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance
//     renderer.setSize(container.offsetWidth, container.offsetHeight);
//     container.appendChild(renderer.domElement);
//     rendererRef.current = renderer;

//     // Texture loading with progress tracking
//     const loader = new THREE.TextureLoader();
//     let loadedCount = 0;
//     const totalImages = images.length;

//     // Create loading animation if desired
//     const startLoading = () => {
//       // Optional: Add a loading animation here
//     };

//     const finishLoading = () => {
//       setLoaded(true);
//       startShader();
//       // Optional: Fade out loading animation
//     };

//     startLoading();

//     // Load all textures with high quality settings
//     images.forEach((src, i) => {
//       loader.load(
//         src,
//         (texture) => {
//           // Apply texture settings for better quality
//           texture.minFilter = THREE.LinearFilter;
//           texture.magFilter = THREE.LinearFilter;
//           texture.generateMipmaps = false;
//           texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

//           texturesRef.current[i] = texture;
//           loadedCount++;

//           if (loadedCount === totalImages) {
//             finishLoading();
//           }
//         },
//         undefined, // Progress callback (optional)
//         (err) => console.error("Error loading texture", err)
//       );
//     });

//     function startShader() {
//       // Create shader material with enhanced uniforms
//       const material = new THREE.ShaderMaterial({
//         uniforms: {
//           uProgress: { value: 0 },
//           uTime: { value: 0 },
//           uTexture1: { value: texturesRef.current[0] },
//           uTexture2: { value: texturesRef.current[1] },
//           uResolution: {
//             value: new THREE.Vector2(
//               container.offsetWidth,
//               container.offsetHeight
//             ),
//           },
//         },
//         vertexShader,
//         fragmentShader,
//       });
//       materialRef.current = material;

//       // Plane geometry
//       const geometry = new THREE.PlaneGeometry(2, 2);
//       const mesh = new THREE.Mesh(geometry, material);
//       scene.add(mesh);

//       // Start animation loop
//       let start = null;
//       const animate = (now) => {
//         if (!start) start = now;
//         const elapsed = (now - start) / 1000;

//         // Smooth time value
//         material.uniforms.uTime.value = elapsed;

//         // Render scene
//         renderer.render(scene, camera);
//         frameId.current = requestAnimationFrame(animate);
//       };

//       frameId.current = requestAnimationFrame(animate);

//       // Start cycling images with delay for initial impact
//       setTimeout(() => {
//         cycleImages();
//       }, 1000);
//     }

//     function cycleImages() {
//       const material = materialRef.current;
//       if (!material || animationStateRef.current.transitioning) return;

//       // Set animation state
//       animationStateRef.current.transitioning = true;

//       // Update textures for transition
//       material.uniforms.uTexture1.value =
//         texturesRef.current[currentIndexRef.current];
//       material.uniforms.uTexture2.value =
//         texturesRef.current[nextIndexRef.current];

//       // Reset progress
//       material.uniforms.uProgress.value = 0;

//       // Create sophisticated animation timeline with GSAP
//       const timeline = gsap.timeline({
//         onComplete: () => {
//           // After transition completes
//           currentIndexRef.current = nextIndexRef.current;
//           nextIndexRef.current = (nextIndexRef.current + 1) % images.length;

//           // Reset animation state
//           animationStateRef.current.transitioning = false;

//           // Schedule next transition with variable timing for a more natural rhythm
//           const holdDuration = 3.5 + Math.random() * 1.0; // Between 3.5-4.5 seconds
//           transitionTimeout.current = setTimeout(
//             cycleImages,
//             holdDuration * 1000
//           );
//         },
//       });

//       // Create sophisticated animation sequence
//       timeline.to(material.uniforms.uProgress, {
//         value: 1,
//         duration: 2.5,
//         ease: "power2.inOut", // Smoother classical easing
//         onUpdate: () => {
//           // Ensure value stays within bounds for stability
//           material.uniforms.uProgress.value = Math.min(
//             1,
//             Math.max(0, material.uniforms.uProgress.value)
//           );
//         },
//       });
//     }

//     // Enhanced responsive handling with debounce
//     let resizeTimeout;
//     const handleResize = () => {
//       clearTimeout(resizeTimeout);
//       resizeTimeout = setTimeout(() => {
//         const width = container.offsetWidth;
//         const height = container.offsetHeight;

//         // Update renderer size
//         renderer.setSize(width, height);

//         // Update resolution uniform if material exists
//         if (materialRef.current) {
//           materialRef.current.uniforms.uResolution.value.set(width, height);
//         }
//       }, 100);
//     };

//     window.addEventListener("resize", handleResize);

//     // Clean up all resources properly
//     return () => {
//       cancelAnimationFrame(frameId.current);
//       window.removeEventListener("resize", handleResize);
//       clearTimeout(resizeTimeout);
//       clearTimeout(transitionTimeout.current);

//       // Dispose Three.js resources to prevent memory leaks
//       if (renderer) renderer.dispose();
//       if (materialRef.current) materialRef.current.dispose();
//       if (sceneRef.current) {
//         sceneRef.current.traverse((object) => {
//           if (object instanceof THREE.Mesh) {
//             if (object.geometry) object.geometry.dispose();
//             if (object.material) {
//               if (Array.isArray(object.material)) {
//                 object.material.forEach((material) => material.dispose());
//               } else {
//                 object.material.dispose();
//               }
//             }
//           }
//         });
//       }

//       // Clean up DOM
//       if (container && renderer && container.contains(renderer.domElement)) {
//         container.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   return (
//     <section
//       className="hero"
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "85vh", // Slightly taller for more impact
//         overflow: "hidden",
//       }}
//     >
//       {/* WebGL container */}
//       <div
//         ref={containerRef}
//         style={{
//           position: "absolute",
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           zIndex: 1,
//         }}
//       />

//       {/* Improved overlay with gradient */}
//       <div
//         className="hero-overlay"
//         style={{
//           position: "absolute",
//           inset: 0,
//           background:
//             "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
//           zIndex: 2,
//         }}
//       />

//       {/* Hero content with animation */}
//       <div
//         className="hero-content"
//         style={{
//           position: "relative",
//           zIndex: 3,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100%",
//           opacity: loaded ? 1 : 0,
//           transition: "opacity 1s ease-in-out",
//         }}
//       >
//         <h1
//           style={{
//             color: "#fff",
//             fontSize: "clamp(2rem, 6vw, 4rem)", // Responsive font size
//             textAlign: "center",
//             fontWeight: 700,
//             letterSpacing: "0.1em",
//             textShadow: "0 2px 10px rgba(0,0,0,0.3)",
//             lineHeight: 1.2,
//             margin: 0,
//             transform: loaded ? "translateY(0)" : "translateY(20px)",
//             transition:
//               "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1), opacity 1.2s ease",
//           }}
//         >
//           <span style={{ display: "block", marginBottom: "0.5rem" }}>
//             INNOVATE
//           </span>
//           <span style={{ display: "block", marginBottom: "0.5rem" }}>
//             THE STUDENT
//           </span>
//           <span style={{ display: "block" }}>WAY</span>
//         </h1>
//       </div>
//     </section>
//   );
// }

// export default Hero;

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

        // Render scene
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

          // Schedule next transition with variable timing for a more natural rhythm
          const holdDuration = 4.5 + Math.random() * 1.5; // Between 4.5-6 seconds (longer for dramatic effect)
          transitionTimeout.current = setTimeout(
            cycleImages,
            holdDuration * 1000
          );
        },
      });

      // Create sophisticated animation sequence
      timeline.to(material.uniforms.uProgress, {
        value: 1,
        duration: 3, // Slower transition for more dramatic effect
        ease: "power1.inOut", // Smoother classical easing
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

    // Clean up all resources properly
    return () => {
      cancelAnimationFrame(frameId.current);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      clearTimeout(transitionTimeout.current);

      // Dispose Three.js resources to prevent memory leaks
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

      // Clean up DOM
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
        <div className="logo">
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
        </div>

        {/* Navigation links */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            gap: "2rem",
          }}
        >
          {["ABOUT US", "EVENTS", "INNOVATIONS", "UPCOMING EVENTS"].map(
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
        </div>
      </div>

      {/* Left/right navigation arrows (optional) */}
      <div
        className="slider-navigation"
        style={{
          position: "absolute",
          bottom: "35vh", // Position in the middle section
          left: "3rem",
          display: "flex",
          gap: "1rem",
          zIndex: 4,
          opacity: 0.8,
        }}
      >
        <button
          className="nav-arrow prev"
          onClick={() => {
            // Implement previous slide functionality
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
              width: "2rem",
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
            // Implement next slide functionality
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
              width: "2rem",
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

      {/* Hero content - positioned at bottom left to match reference image */}
      <div
        className="hero-content"
        style={{
          position: "absolute",
          bottom: "10vh", // Position near bottom like in reference
          left: "3rem",
          zIndex: 3,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <h1
          className="scroll-animate-text"
          style={{
            color: "#fff",
            fontSize: "clamp(3rem, 8vw, 5.5rem)", // Larger text as in reference
            fontWeight: 700,
            letterSpacing: "0.05em",
            lineHeight: 1.1, // Tighter line height like in reference
            margin: 0,
            textTransform: "uppercase",
            fontFamily: "sans-serif",
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
