// Basic vertex shader for full screen quad
// export default `
// varying vec2 vUv;
// void main() {
//   vUv = uv;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `;

// Enhanced shader code for more sophisticated transitions
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export default vertexShader;
