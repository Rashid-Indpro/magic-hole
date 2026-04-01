/**
 * Entities Index
 * Exports all game entities
 */

import { createHole } from './Hole';
import { createCars } from './Car';
import { INITIAL_CAR_COUNT } from '../config/constants';

/**
 * Creates and returns all game entities
 * @returns {object} Object containing all entities
 */
export const setupEntities = () => {
  // Create the hole
  const hole = createHole();
  
  // Create multiple cars
  const cars = createCars(INITIAL_CAR_COUNT);
  
  // Return all entities in a flat object structure
  // GameEngine expects a flat object with all entities
  return {
    hole: hole,
    ...cars, // Spread cars into the entities object
  };
};
