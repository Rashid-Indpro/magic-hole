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
} from '../config/constants';
import { randomBetween, randomChoice, randomPosition, generateId, randomIntBetween } from '../utils';
import { createCarBody, addBodyToWorld } from '../systems/PhysicsSystem';

/**
 * Creates a single car entity with random properties
 * @param {string} id - Optional custom ID for the car
 * @param {boolean} withPhysics - Whether to create physics body
 * @returns {object} Car entity with body and renderer
 */
export const createCar = (id = null, withPhysics = PHYSICS_ENABLED) => {
  const carId = id || generateId('car');
  const size = randomBetween(CAR_MIN_SIZE, CAR_MAX_SIZE);
  const icon = randomChoice(CAR_ICONS);
  const flipped = randomIntBetween(0, 1) === 1; // Randomly flip horizontally (50% chance)
  
  // Generate random position, avoiding edges
  // Use half of max size as margin to keep cars fully visible
  const margin = CAR_MAX_SIZE / 2;
  const position = randomPosition(SCREEN_WIDTH, SCREEN_HEIGHT, margin);

  const carEntity = {
    id: carId,
    body: {
      position: position,
      size: size,
      icon: icon,
      flipped: flipped, // true = facing left, false = facing right
      type: 'car',
      physicsBody: null, // Will be set if physics enabled
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
 * @returns {object} Object with car entities keyed by their IDs
 */
export const createCars = (count, withPhysics = PHYSICS_ENABLED) => {
  const cars = {};
  
  for (let i = 0; i < count; i++) {
    const car = createCar(null, withPhysics);
    cars[car.id] = car;
  }
  
  return cars;
};
