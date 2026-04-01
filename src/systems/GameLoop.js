/**
 * GameLoop System
 * Main game loop that runs every frame
 * Handles smooth movement and updates entity positions
 */

import { MOVEMENT_SMOOTHING, MIN_MOVEMENT_THRESHOLD } from '../config/constants';
import { keepInBounds } from '../utils';

/**
 * Linear interpolation helper
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} factor - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 */
const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

/**
 * Game loop update function
 * @param {object} entities - Current game entities
 * @param {object} param1 - Time delta information
 * @returns {object} Updated entities
 */
export const gameLoop = (entities, { time }) => {
  // Update hole position with smooth interpolation
  if (entities.hole) {
    const hole = entities.hole.body;
    
    // Calculate distance to target
    const dx = hole.targetPosition.x - hole.position.x;
    const dy = hole.targetPosition.y - hole.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Only move if distance is above threshold (avoids jittering)
    if (distance > MIN_MOVEMENT_THRESHOLD) {
      // Smooth movement using linear interpolation
      hole.position.x = lerp(hole.position.x, hole.targetPosition.x, MOVEMENT_SMOOTHING);
      hole.position.y = lerp(hole.position.y, hole.targetPosition.y, MOVEMENT_SMOOTHING);
      
      // Keep within screen boundaries
      hole.position = keepInBounds(hole.position, hole.radius);
    }
  }
  
  return entities;
};
