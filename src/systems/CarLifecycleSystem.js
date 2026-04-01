/**
 * Car Lifecycle System
 * Manages car spawning, exit animations, and removal
 */

import { 
  SCREEN_HEIGHT, 
  CAR_EXIT_THRESHOLD, 
  CAR_EXIT_DURATION,
  INITIAL_CAR_COUNT,
} from '../config/constants';
import { createCar } from '../entities/Car';
import { removeBodyFromWorld } from './PhysicsSystem';

// Track exit timers for each car
const exitTimers = {};

/**
 * Car Lifecycle System
 * - Detects when cars reach the bottom
 * - Triggers exit animation
 * - Removes exited cars
 * - Spawns new cars to maintain count (only when playing)
 */
const CarLifecycleSystem = (entities, { time }) => {
  const currentTime = Date.now();
  const carsToRemove = [];
  const carsToAdd = [];
  
  // Check if game is playing (from timer or levelTracker entity)
  const isPlaying = entities.timer?.gameState === 'playing' || 
                    entities.levelTracker?.gameState === 'playing';
  
  // Check all car entities
  Object.keys(entities).forEach(key => {
    const entity = entities[key];
    
    // Skip non-car entities
    if (!entity.body || entity.body.type !== 'car') {
      return;
    }
    
    const car = entity;
    
    // Check if car reached bottom (not already exiting)
    if (!car.body.exiting && car.body.position.y >= SCREEN_HEIGHT - CAR_EXIT_THRESHOLD) {
      // Start exit animation
      car.body.exiting = true;
      car.body.exitStartTime = currentTime;
      exitTimers[key] = currentTime;
    }
    
    // Update exit animation
    if (car.body.exiting) {
      // Use exitStartTime from collision or set from timer
      const exitStartTime = car.body.exitStartTime || exitTimers[key];
      if (!exitTimers[key]) {
        exitTimers[key] = exitStartTime;
      }
      
      const elapsed = currentTime - exitStartTime;
      const progress = Math.min(elapsed / CAR_EXIT_DURATION, 1);
      
      // Fade out opacity
      car.body.opacity = 1 - progress;
      
      // Move down slightly during exit (only if not eaten)
      // Eaten cars fade in place (no physics body)
      if (car.body.physicsBody) {
        car.body.physicsBody.position.y += 2;
      } else if (!car.body.physicsBody && car.body.position.y < SCREEN_HEIGHT) {
        // Car was eaten, fade in place (or could shrink/move toward hole)
        car.body.position.y += 1;
      }
      
      // Remove car when animation completes
      if (progress >= 1) {
        carsToRemove.push(key);
      }
    }
  });
  
  // Remove exited cars
  carsToRemove.forEach(key => {
    const car = entities[key];
    
    // Remove physics body if exists
    if (car.body && car.body.physicsBody) {
      removeBodyFromWorld(car.body.physicsBody);
    }
    
    // Clean up timer
    delete exitTimers[key];
    
    // Remove entity
    delete entities[key];
    
    // Spawn replacement car only if game is still playing
    if (isPlaying) {
      carsToAdd.push(createCar(null, true, false));
    }
  });
  
  // Add new cars
  carsToAdd.forEach(car => {
    entities[car.id] = car;
  });
  
  return entities;
};

/**
 * Reset the lifecycle system (clear timers)
 */
export const resetCarLifecycleSystem = () => {
  Object.keys(exitTimers).forEach(key => {
    delete exitTimers[key];
  });
};

export default CarLifecycleSystem;
