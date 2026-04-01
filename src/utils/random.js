/**
 * Random Utilities
 * Helper functions for generating random values
 */

/**
 * Generates a random number between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number between min and max
 */
export const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * Generates a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer between min and max
 */
export const randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Randomly selects an item from an array
 * @param {Array} array - Array to choose from
 * @returns {*} Random item from the array
 */
export const randomChoice = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Generates a random position within screen bounds
 * @param {number} screenWidth - Screen width
 * @param {number} screenHeight - Screen height
 * @param {number} margin - Margin from edges (default: 50)
 * @returns {object} Random position {x, y}
 */
export const randomPosition = (screenWidth, screenHeight, margin = 50) => {
  return {
    x: randomBetween(margin, screenWidth - margin),
    y: randomBetween(margin, screenHeight - margin),
  };
};

/**
 * Generates a unique ID
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
export const generateId = (prefix = 'item') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
