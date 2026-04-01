/**
 * Collision System
 * Handles collision detection, size-based eating, and hole growth
 */

import { findCollisions } from '../utils';
import { 
  COLLISION_DISTANCE_THRESHOLD, 
  POINTS_PER_CAR,
  HOLE_MIN_RADIUS_TO_EAT,
} from '../config/constants';
import { growHole } from '../entities/Hole';
import { removeBodyFromWorld } from './PhysicsSystem';

/**
 * Checks if hole is big enough to eat a car
 * @param {number} holeRadius - Current hole radius
 * @param {number} carSize - Car size
 * @returns {boolean} True if hole can eat the car
 */
const canEatCar = (holeRadius, carSize) => {
  const carRadius = carSize / 2;
  return holeRadius >= carRadius * HOLE_MIN_RADIUS_TO_EAT;
};

/**
 * Collision Detection System
 * Checks for collisions between the hole and cars
 * Only eats cars if hole is big enough
 * Grows hole after eating
 * 
 * @param {object} entities - Current game entities
 * @param {object} param1 - System parameters (time, events, dispatch)
 * @returns {object} Updated entities
 */
export const CollisionSystem = (entities, { dispatch }) => {
  if (!entities.hole) {
    return entities;
  }

  const hole = entities.hole;

  // Find all entities that collide with the hole
  const collisions = findCollisions(
    { id: 'hole', body: hole.body },
    entities,
    COLLISION_DISTANCE_THRESHOLD
  );

  // Filter collisions - only keep cars that hole is big enough to eat
  const eatableCollisions = collisions.filter(entityId => {
    const entity = entities[entityId];
    if (entity && entity.body && entity.body.size) {
      return canEatCar(hole.body.radius, entity.body.size);
    }
    return false;
  });

  // If there are eatable collisions, remove entities, grow hole, and update score
  if (eatableCollisions.length > 0) {
    const updatedEntities = { ...entities };
    let totalPoints = 0;
    let carsEaten = 0;
    
    eatableCollisions.forEach(entityId => {
      const entity = updatedEntities[entityId];
      
      // Remove physics body if it exists
      if (entity.body && entity.body.physicsBody) {
        removeBodyFromWorld(entity.body.physicsBody);
      }
      
      // Accumulate points
      totalPoints += POINTS_PER_CAR;
      carsEaten++;
      
      // Remove the collided entity
      delete updatedEntities[entityId];
    });
    
    // Grow the hole based on number of cars eaten
    if (carsEaten > 0 && updatedEntities.hole) {
      updatedEntities.hole = {
        ...updatedEntities.hole,
        body: growHole(updatedEntities.hole.body, updatedEntities.hole.body.growthRate * carsEaten),
      };
    }
    
    // Dispatch score update event to App component
    if (dispatch && totalPoints > 0) {
      dispatch({
        type: 'score-update',
        points: totalPoints,
        carsEaten: carsEaten,
      });
    }
    
    return updatedEntities;
  }

  return entities;
};
