// components/shaders/fragment.js
export default `
precision highp float;

uniform float uProgress;
uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec2 uResolution;
varying vec2 vUv;

// Classic smooth step function with custom easing
float customSmoothStep(float edge0, float edge1, float x) {
  float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

void main() {
  // Improved displacement calculation with multiple sine waves for more organic feel
  float displacementStrength = 0.06;
  float timeScale = 0.5;
  float progressFactor = sin(uProgress * 3.14159); // Smoother progression
  
  // Multiple frequency displacement for more organic motion
  float disp1 = sin(uTime * timeScale + vUv.x * 5.0) * displacementStrength * progressFactor;
  float disp2 = sin(uTime * timeScale * 1.5 + vUv.y * 3.0) * displacementStrength * 0.3 * progressFactor;
  
  // Combine displacements for more dynamic effect
  vec2 displacement = vec2(disp1, disp2);
  
  // Apply distortion to sampling coordinates
  vec2 uv1 = vUv + displacement * uProgress;
  vec2 uv2 = vUv - displacement * (1.0 - uProgress);
  
  // Sample textures with distorted coordinates
  vec4 tex1 = texture2D(uTexture1, clamp(uv1, 0.0, 1.0));
  vec4 tex2 = texture2D(uTexture2, clamp(uv2, 0.0, 1.0));
  
  // Create a subtle vignette effect
  vec2 center = vec2(0.5, 0.5);
  float dist = distance(vUv, center);
  float vignette = 1.0 - smoothstep(0.4, 0.7, dist);

  // Create a radial progress mask
  float radialProgress = length(vUv - center) * 2.0;
  float mask = smoothstep(uProgress - 0.3, uProgress + 0.3, radialProgress);
  
  // Improved transition with custom easing
  float p = customSmoothStep(0.0, 1.0, uProgress);
  
  // Blend textures with vignette effect
  vec4 finalColor = mix(tex1, tex2, p);
  finalColor.rgb *= 0.9 + 0.1 * vignette; // Subtle vignette
  
  gl_FragColor = finalColor;
}
`;
