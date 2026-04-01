/**
 * Collision System
 * Handles collision detection, size-based eating, and hole growth
 */

import { findCollisions } from '../utils';
import { 
  COLLISION_DISTANCE_THRESHOLD, 
  POINTS_PER_CAR,
  HOLE_MIN_RADIUS_TO_EAT,
  SMALL_CAR_SIZE,
  MEDIUM_CAR_SIZE,
  SMALL_CAR_POINTS,
  MEDIUM_CAR_POINTS,
  LARGE_CAR_POINTS,
} from '../config/constants';
import { growHole } from '../entities/Hole';
import { removeBodyFromWorld } from './PhysicsSystem';

/**
 * Calculate points based on car size
 * @param {number} carSize - Size of the car
 * @returns {number} Points awarded
 */
const getPointsForCarSize = (carSize) => {
  if (carSize < SMALL_CAR_SIZE) {
    return SMALL_CAR_POINTS; // 10 points
  } else if (carSize < MEDIUM_CAR_SIZE) {
    return MEDIUM_CAR_POINTS; // 25 points
  } else {
    return LARGE_CAR_POINTS; // 50 points
  }
};

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

  // Only process collisions if game is playing
  const isPlaying = entities.timer?.gameState === 'playing' || 
                    entities.levelTracker?.gameState === 'playing';
  
  if (!isPlaying) {
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

  // If there are eatable collisions, mark cars for exit, grow hole, and update score
  if (eatableCollisions.length > 0) {
    const updatedEntities = { ...entities };
    let totalPoints = 0;
    let carsEaten = 0;
    
    eatableCollisions.forEach(entityId => {
      const entity = updatedEntities[entityId];
      
      // Mark car as exiting instead of immediate removal
      // CarLifecycleSystem will handle the exit animation and removal
      if (entity.body && !entity.body.exiting) {
        entity.body.exiting = true;
        entity.body.exitStartTime = Date.now();
        
        // Remove physics body immediately so it stops interacting
        if (entity.body.physicsBody) {
          removeBodyFromWorld(entity.body.physicsBody);
          entity.body.physicsBody = null;
        }
        
        // Calculate points based on car size
        const carSize = entity.body.size || 0;
        const points = getPointsForCarSize(carSize);
        
        // Accumulate points
        totalPoints += points;
        carsEaten++;
      }
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
