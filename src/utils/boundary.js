/**
 * Boundary Utilities
 * Helper functions for keeping entities within screen bounds
 */

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../config/constants';

/**
 * Clamps a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Keeps a position within screen boundaries
 * @param {object} position - Position object {x, y}
 * @param {number} radius - Radius of the circular object
 * @returns {object} Bounded position {x, y}
 */
export const keepInBounds = (position, radius) => {
  return {
    x: clamp(position.x, radius, SCREEN_WIDTH - radius),
    y: clamp(position.y, radius, SCREEN_HEIGHT - radius),
  };
};

/**
 * Checks if a position is within screen boundaries
 * @param {object} position - Position object {x, y}
 * @param {number} radius - Radius of the circular object
 * @returns {boolean} True if within bounds
 */
export const isInBounds = (position, radius) => {
  return (
    position.x >= radius &&
    position.x <= SCREEN_WIDTH - radius &&
    position.y >= radius &&
    position.y <= SCREEN_HEIGHT - radius
  );
};
