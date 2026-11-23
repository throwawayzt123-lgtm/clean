import type { Control, MousePos } from "./gravityScene";

// Mutable singletons read every frame by the WebGL loop (no React re-renders).
export const control: Control = { progress: 0, started: false };
export const mousePos: MousePos = { x: 99, y: 99, isDown: false };

export const EASE = "cubic-bezier(0.16,1,0.3,1)";
