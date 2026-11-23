// Tiny event bus so any component can trigger canvas effects without prop-drilling.
type Handlers = {
  splash?: (x: number, y: number, count: number, power: number) => void;
  curtain?: () => void;
  sparkle?: (x: number, y: number, count: number) => void;
};

export const fxHandlers: Handlers = {};

export const fx = {
  splash: (x: number, y: number, count = 24, power = 1) => fxHandlers.splash?.(x, y, count, power),
  curtain: () => fxHandlers.curtain?.(),
  sparkle: (x: number, y: number, count = 6) => fxHandlers.sparkle?.(x, y, count),
};
