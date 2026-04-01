/**
 * Car Entity Factory
 * Creates car entities for the game with optional physics
 */

import Car from '../components/Car';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  CAR_MIN_SIZE,
  CAR_MAX_SIZE,
  CAR_ICONS,
  PHYSICS_ENABLED,
  CAR_SPAWN_Y,
} from '../config/constants';
import { randomBetween, randomChoice, randomPosition, generateId, randomIntBetween } from '../utils';
import { createCarBody, addBodyToWorld } from '../systems/PhysicsSystem';

/**
 * Creates a single car entity with random properties
 * @param {string} id - Optional custom ID for the car
 * @param {boolean} withPhysics - Whether to create physics body
 * @param {boolean} fromTop - Whether to spawn from top (default: true)
 * @returns {object} Car entity with body and renderer
 */
export const createCar = (id = null, withPhysics = PHYSICS_ENABLED, fromTop = true) => {
  const carId = id || generateId('car');
  const size = randomBetween(CAR_MIN_SIZE, CAR_MAX_SIZE);
  const icon = randomChoice(CAR_ICONS);
  const flipped = randomIntBetween(0, 1) === 1; // Randomly flip horizontally (50% chance)
  
  // Generate position
  let position;
  if (fromTop) {
    // Spawn from top of screen with random X position
    const margin = size / 2;
    position = {
      x: randomBetween(margin, SCREEN_WIDTH - margin),
      y: CAR_SPAWN_Y,
    };
  } else {
    // Random position (for backward compatibility)
    const margin = CAR_MAX_SIZE / 2;
    position = randomPosition(SCREEN_WIDTH, SCREEN_HEIGHT, margin);
  }

  const carEntity = {
    id: carId,
    body: {
      position: position,
      size: size,
      icon: icon,
      flipped: flipped, // true = facing left, false = facing right
      type: 'car',
      physicsBody: null, // Will be set if physics enabled
      exiting: false, // Whether car is in exit animation
      opacity: 1, // For exit animation
    },
    renderer: Car,
  };
  
  // Add physics body if enabled
  if (withPhysics) {
    const physicsBody = createCarBody(position.x, position.y, size);
    carEntity.body.physicsBody = physicsBody;
    addBodyToWorld(physicsBody);
  }

  return carEntity;
};

/**
 * Creates multiple car entities
 * @param {number} count - Number of cars to create
 * @param {boolean} withPhysics - Whether to create physics bodies
 * @param {boolean} fromTop - Whether to spawn from top (default: true)
 * @returns {object} Object with car entities keyed by their IDs
 */
export const createCars = (count, withPhysics = PHYSICS_ENABLED, fromTop = true) => {
  const cars = {};
  
  for (let i = 0; i < count; i++) {
    const car = createCar(null, withPhysics, fromTop);
    
    // Stagger initial spawn positions for visual variety
    if (fromTop) {
      // Space cars closer together (60px apart) going downward from spawn point
      car.body.position.y = CAR_SPAWN_Y + (i * 60);
      if (car.body.physicsBody) {
        car.body.physicsBody.position.y = car.body.position.y;
      }
    }
    
    cars[car.id] = car;
  }
  
  return cars;
};
