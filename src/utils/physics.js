/**
 * Physics Engine Setup
 * Matter.js physics engine configuration and utilities
 */

import Matter from 'matter-js';
import { SCREEN_WIDTH, SCREEN_HEIGHT, GRAVITY, WALL_RESTITUTION } from '../config/constants';

/**
 * Creates and configures Matter.js physics engine
 * @returns {object} Matter.js engine instance
 */
export const createPhysicsEngine = () => {
  const engine = Matter.Engine.create({
    gravity: GRAVITY,
  });

  // Enable sleeping for better performance
  engine.enableSleeping = false;

  return engine;
};

/**
 * Creates invisible walls around the screen boundaries
 * @param {object} world - Matter.js world
 */
export const createBoundaryWalls = (world) => {
  const wallThickness = 50;
  const options = {
    isStatic: true,
    restitution: WALL_RESTITUTION,
    friction: 0,
  };

  // Top wall
  const topWall = Matter.Bodies.rectangle(
    SCREEN_WIDTH / 2,
    -wallThickness / 2,
    SCREEN_WIDTH,
    wallThickness,
    options
  );

  // Bottom wall
  const bottomWall = Matter.Bodies.rectangle(
    SCREEN_WIDTH / 2,
    SCREEN_HEIGHT + wallThickness / 2,
    SCREEN_WIDTH,
    wallThickness,
    options
  );

  // Left wall
  const leftWall = Matter.Bodies.rectangle(
    -wallThickness / 2,
    SCREEN_HEIGHT / 2,
    wallThickness,
    SCREEN_HEIGHT,
    options
  );

  // Right wall
  const rightWall = Matter.Bodies.rectangle(
    SCREEN_WIDTH + wallThickness / 2,
    SCREEN_HEIGHT / 2,
    wallThickness,
    SCREEN_HEIGHT,
    options
  );

  Matter.World.add(world, [topWall, bottomWall, leftWall, rightWall]);

  return { topWall, bottomWall, leftWall, rightWall };
};

/**
 * Creates a physics body for a car
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {number} size - Car size
 * @param {object} options - Additional Matter.js body options
 * @returns {object} Matter.js body
 */
export const createCarBody = (x, y, size, options = {}) => {
  return Matter.Bodies.rectangle(x, y, size, size, {
    frictionAir: options.frictionAir || 0.01,
    friction: options.friction || 0.05,
    restitution: options.restitution || 0.6,
    density: options.density || 0.001,
    ...options,
  });
};

/**
 * Updates Matter.js engine
 * @param {object} engine - Matter.js engine
 * @param {number} delta - Time delta in milliseconds
 */
export const updatePhysics = (engine, delta = 16.67) => {
  Matter.Engine.update(engine, delta);
};

/**
 * Removes a body from the physics world
 * @param {object} world - Matter.js world
 * @param {object} body - Body to remove
 */
export const removeBody = (world, body) => {
  if (body) {
    Matter.World.remove(world, body);
  }
};
