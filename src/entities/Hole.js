/**
 * Hole Entity Factory
 * Creates the hole entity for the game with growth capabilities
 */

import Hole from '../components/Hole';
import { 
  HOLE_RADIUS, 
  HOLE_POSITION, 
  COLORS,
  HOLE_INITIAL_RADIUS,
  HOLE_MAX_RADIUS,
  HOLE_GROWTH_RATE,
} from '../config/constants';

/**
 * Creates a hole entity
 * @returns {object} Hole entity with body and renderer
 */
export const createHole = () => {
  return {
    id: 'hole',
    body: {
      position: { ...HOLE_POSITION }, // Current position
      targetPosition: { ...HOLE_POSITION }, // Target position for smooth movement
      radius: HOLE_INITIAL_RADIUS,
      maxRadius: HOLE_MAX_RADIUS,
      growthRate: HOLE_GROWTH_RATE,
      color: COLORS.hole,
      borderColor: COLORS.holeBorder,
      type: 'hole',
    },
    renderer: Hole,
  };
};

/**
 * Grows the hole by a certain amount
 * @param {object} holeBody - The hole's body object
 * @param {number} amount - Amount to grow (default: HOLE_GROWTH_RATE)
 * @returns {object} Updated hole body
 */
export const growHole = (holeBody, amount = HOLE_GROWTH_RATE) => {
  const newRadius = Math.min(holeBody.radius + amount, holeBody.maxRadius);
  return {
    ...holeBody,
    radius: newRadius,
  };
};
