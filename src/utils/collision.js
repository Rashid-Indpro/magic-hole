/**
 * Collision Detection Utilities
 * Helper functions for detecting collisions between entities
 */

/**
 * Calculates distance between two points
 * @param {object} pos1 - First position {x, y}
 * @param {object} pos2 - Second position {x, y}
 * @returns {number} Distance between the two points
 */
export const getDistance = (pos1, pos2) => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Checks if a circular object (hole) collides with a square object (car)
 * Uses distance-based collision detection for circles
 * @param {object} circle - Circular object with position {x, y} and radius
 * @param {object} square - Square object with position {x, y} and size
 * @param {number} threshold - Distance threshold multiplier (default: 1.0)
 * @returns {boolean} True if collision detected
 */
export const checkCircleSquareCollision = (circle, square, threshold = 1.0) => {
  const distance = getDistance(circle.position, square.position);
  
  // For simplicity, treat the square as a circle with radius = size/2
  // This makes collision detection fast and works well for emoji icons
  const squareRadius = square.size / 2;
  const collisionDistance = (circle.radius + squareRadius) * threshold;
  
  return distance < collisionDistance;
};

/**
 * Checks if two circular objects collide
 * @param {object} circle1 - First circular object with position {x, y} and radius
 * @param {object} circle2 - Second circular object with position {x, y} and radius
 * @param {number} threshold - Distance threshold multiplier (default: 1.0)
 * @returns {boolean} True if collision detected
 */
export const checkCircleCollision = (circle1, circle2, threshold = 1.0) => {
  const distance = getDistance(circle1.position, circle2.position);
  const collisionDistance = (circle1.radius + circle2.radius) * threshold;
  
  return distance < collisionDistance;
};

/**
 * Finds all entities that collide with a given entity
 * @param {object} entity - The entity to check collisions for
 * @param {object} entities - All game entities
 * @param {number} threshold - Distance threshold multiplier
 * @returns {array} Array of entity IDs that collide with the given entity
 */
export const findCollisions = (entity, entities, threshold = 1.0) => {
  const collisions = [];
  
  Object.keys(entities).forEach(key => {
    if (key === entity.id || key === 'hole') {
      return; // Skip self and hole
    }
    
    const otherEntity = entities[key];
    
    // Check collision based on entity types
    if (entity.body.radius && otherEntity.body.size) {
      // Circle (hole) vs Square (car)
      if (checkCircleSquareCollision(entity.body, otherEntity.body, threshold)) {
        collisions.push(key);
      }
    }
  });
  
  return collisions;
};
