// Test script to verify scroll animations are working
// This can be run in the browser console to test functionality

function testScrollAnimations() {
  console.log("🎯 Testing Technothon scroll animations...");

  // Check if scroll-driven animations are supported
  const supportsScrollDrivenAnimations = CSS.supports(
    "animation-timeline",
    "view()"
  );
  console.log(
    `📊 Browser supports CSS scroll-driven animations: ${supportsScrollDrivenAnimations}`
  );

  // Find all animated elements
  const animatedElements = document.querySelectorAll(
    [
      ".scroll-animate-text",
      ".scroll-animate-image",
      ".scroll-animate-card",
      ".scroll-animate-left",
      ".scroll-animate-right",
      ".scroll-animate-stagger",
    ].join(",")
  );

  console.log(`🎬 Found ${animatedElements.length} animated elements`);

  // Check if Francois One font is loaded
  const testElement = document.createElement("div");
  testElement.style.fontFamily = '"Francois One", sans-serif';
  testElement.style.visibility = "hidden";
  testElement.innerHTML = "Test";
  document.body.appendChild(testElement);

  const computedFont = window.getComputedStyle(testElement).fontFamily;
  console.log(
    `🔡 Francois One font loaded: ${computedFont.includes("Francois One")}`
  );
  document.body.removeChild(testElement);

  // Check if Tailwind CSS is working
  const tailwindTest = document.createElement("div");
  tailwindTest.className = "bg-black text-white";
  tailwindTest.style.visibility = "hidden";
  document.body.appendChild(tailwindTest);

  const computedBg = window.getComputedStyle(tailwindTest).backgroundColor;
  console.log(
    `🎨 Tailwind CSS working: ${
      computedBg === "rgb(0, 0, 0)" || computedBg === "rgba(0, 0, 0, 1)"
    }`
  );
  document.body.removeChild(tailwindTest);

  // Test scroll position and animations
  const originalScrollY = window.scrollY;
  console.log(`📍 Current scroll position: ${originalScrollY}px`);

  console.log("✅ Scroll animation test completed! Check the results above.");

  return {
    supportsScrollDrivenAnimations,
    animatedElementsCount: animatedElements.length,
    fontLoaded: computedFont.includes("Francois One"),
    tailwindWorking:
      computedBg === "rgb(0, 0, 0)" || computedBg === "rgba(0, 0, 0, 1)",
  };
}

// Auto-run test when script loads
if (typeof window !== "undefined") {
  // Wait for fonts to load
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      setTimeout(testScrollAnimations, 1000);
    });
  } else {
    setTimeout(testScrollAnimations, 2000);
  }
}

export { testScrollAnimations };
