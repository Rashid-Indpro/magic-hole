/**
 * Physics System
 * Integrates Matter.js physics engine for realistic object behavior
 */

import Matter from 'matter-js';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  GRAVITY,
  CAR_FRICTION,
  CAR_FRICTION_AIR,
  CAR_DENSITY,
  CAR_RESTITUTION,
} from '../config/constants';

// Create the physics engine
let engine = null;
let world = null;

/**
 * Initialize the physics engine
 * @returns {object} Physics engine and world
 */
export const initPhysics = () => {
  // Clear previous engine if it exists
  if (engine) {
    Matter.Engine.clear(engine);
    if (world) {
      Matter.World.clear(world, false);
    }
  }
  
  // Create engine
  engine = Matter.Engine.create({
    enableSleeping: false,
  });
  
  world = engine.world;
  
  // Set gravity
  engine.gravity.x = GRAVITY.x;
  engine.gravity.y = GRAVITY.y;
  
  // Create invisible walls to keep objects on screen
  const wallOptions = {
    isStatic: true,
    friction: 0.1,
    restitution: 0.6,
  };
  
  const walls = [
    // Top wall
    Matter.Bodies.rectangle(SCREEN_WIDTH / 2, -25, SCREEN_WIDTH, 50, wallOptions),
    // No bottom wall - cars exit at bottom
    // Left wall
    Matter.Bodies.rectangle(-25, SCREEN_HEIGHT / 2, 50, SCREEN_HEIGHT, wallOptions),
    // Right wall
    Matter.Bodies.rectangle(SCREEN_WIDTH + 25, SCREEN_HEIGHT / 2, 50, SCREEN_HEIGHT, wallOptions),
  ];
  
  Matter.World.add(world, walls);
  
  return { engine, world };
};

/**
 * Get the current physics engine
 * @returns {object} Physics engine
 */
export const getPhysicsEngine = () => engine;

/**
 * Get the current physics world
 * @returns {object} Physics world
 */
export const getPhysicsWorld = () => world;

/**
 * Create a physics body for a car
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {number} size - Car size
 * @returns {object} Matter.js body
 */
export const createCarBody = (x, y, size) => {
  const body = Matter.Bodies.circle(x, y, size / 2, {
    friction: CAR_FRICTION,
    frictionAir: CAR_FRICTION_AIR,
    density: CAR_DENSITY,
    restitution: CAR_RESTITUTION,
    label: 'car',
  });
  
  // Add slight random velocity for natural movement
  const randomVelocity = {
    x: (Math.random() - 0.5) * 0.5,
    y: (Math.random() - 0.5) * 0.5,
  };
  Matter.Body.setVelocity(body, randomVelocity);
  
  return body;
};

/**
 * Add a body to the physics world
 * @param {object} body - Matter.js body
 */
export const addBodyToWorld = (body) => {
  if (world && body) {
    Matter.World.add(world, body);
  }
};

/**
 * Remove a body from the physics world
 * @param {object} body - Matter.js body
 */
export const removeBodyFromWorld = (body) => {
  if (world && body) {
    Matter.World.remove(world, body);
  }
};

/**
 * Physics System
 * Updates the physics engine and syncs entities with physics bodies
 * @param {object} entities - Current game entities
 * @param {object} param1 - System parameters
 * @returns {object} Updated entities
 */
export const PhysicsSystem = (entities, { time }) => {
  if (!engine) {
    return entities;
  }
  
  // Update the physics engine
  Matter.Engine.update(engine, time.delta);
  
  // Sync entity positions with physics bodies
  Object.keys(entities).forEach(key => {
    const entity = entities[key];
    
    if (entity.body && entity.body.physicsBody) {
      // Update entity position from physics body
      const physicsBody = entity.body.physicsBody;
      entity.body.position = {
        x: physicsBody.position.x,
        y: physicsBody.position.y,
      };
      
      // Store rotation for future use (if needed)
      entity.body.angle = physicsBody.angle;
    }
  });
  
  return entities;
};
