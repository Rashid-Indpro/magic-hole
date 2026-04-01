/**
 * Hole Entity Factory
 * Creates the hole entity for the game
 */

import Hole from '../components/Hole';
import { HOLE_RADIUS, HOLE_POSITION, COLORS } from '../config/constants';

/**
 * Creates a hole entity
 * @returns {object} Hole entity with body and renderer
 */
export const createHole = () => {
  return {
    body: {
      position: { ...HOLE_POSITION }, // Current position
      targetPosition: { ...HOLE_POSITION }, // Target position for smooth movement
      radius: HOLE_RADIUS,
      color: COLORS.hole,
      borderColor: COLORS.holeBorder,
    },
    renderer: Hole,
  };
};
