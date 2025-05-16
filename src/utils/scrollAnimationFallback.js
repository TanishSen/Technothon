/**
 * Fallback implementation for browsers that don't support CSS scroll-driven animations
 * This will use Intersection Observer to apply animations to elements
 */

// Check if the browser supports CSS scroll-driven animations
const supportsScrollDrivenAnimations = () => {
  return (
    CSS.supports("animation-timeline: scroll()") ||
    CSS.supports("animation-timeline: view()")
  );
};

/**
 * Initialize fallback animations using Intersection Observer
 */
export const initScrollAnimationFallback = () => {
  // If browser supports scroll-driven animations, no need for fallback
  if (supportsScrollDrivenAnimations()) {
    return;
  }

  // Options for the Intersection Observer
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  // Create the observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Only handle elements with our animation classes
      const element = entry.target;

      // Check if element has an animation class
      const hasAnimationClass =
        element.classList.contains("scroll-animate-text") ||
        element.classList.contains("scroll-animate-image") ||
        element.classList.contains("scroll-animate-card") ||
        element.classList.contains("scroll-animate-left") ||
        element.classList.contains("scroll-animate-right") ||
        element.classList.contains("scroll-animate-stagger");

      if (!hasAnimationClass) {
        return;
      }

      // Apply animation when element enters viewport
      if (entry.isIntersecting) {
        // Get animation delay if set
        const delay = element.style.animationDelay
          ? parseFloat(element.style.animationDelay) * 1000
          : 0;

        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translate(0, 0)";
          element.style.filter = "none";
          element.style.scale = "1";
        }, delay);

        // Stop observing once animation is applied
        observer.unobserve(element);
      }
    });
  }, options);

  // Observe all elements with animation classes
  document
    .querySelectorAll(
      ".scroll-animate-text, .scroll-animate-image, .scroll-animate-card, .scroll-animate-left, .scroll-animate-right, .scroll-animate-stagger"
    )
    .forEach((element) => {
      // Set initial styles
      element.style.opacity = "0";

      // Set transform based on animation type
      if (element.classList.contains("scroll-animate-left")) {
        element.style.transform = "translate(-4rem, 0)";
      } else if (element.classList.contains("scroll-animate-right")) {
        element.style.transform = "translate(4rem, 0)";
      } else if (element.classList.contains("scroll-animate-image")) {
        element.style.transform = "translate(0, 3rem)";
        element.style.filter =
          "saturate(0.5) contrast(1.2) brightness(0.8) blur(2px)";
        element.style.scale = "0.97";
      } else if (element.classList.contains("scroll-animate-card")) {
        element.style.transform = "translate(0, 2rem)";
        element.style.scale = "0.95";
        element.style.filter = "blur(1px)";
      } else {
        element.style.transform = "translate(0, 4rem)";
      }

      // Set transition for smooth animation
      element.style.transition =
        "opacity 0.6s ease-out, transform 0.8s ease-out, filter 0.8s ease-out, scale 0.8s ease-out";

      // Start observing
      observer.observe(element);
    });
};

export default initScrollAnimationFallback;
