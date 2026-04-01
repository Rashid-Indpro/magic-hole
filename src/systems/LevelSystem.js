/**
 * Level System
 * Manages level objectives and win conditions
 */

import { LEVEL_TARGET_CARS } from '../config/constants';

/**
 * Level System - Tracks level progress and win conditions
 * Checks if player has met the win condition (eaten all cars)
 */
const LevelSystem = (entities, { events, dispatch }) => {
  // Only run if level tracker exists
  if (!entities.levelTracker) {
    return entities;
  }

  // Only check if game is playing
  if (entities.levelTracker.gameState !== 'playing') {
    return entities;
  }

  // Count remaining cars
  const carCount = Object.keys(entities).filter(
    key => key.startsWith('car_') && entities[key]
  ).length;

  // Update cars eaten count
  const carsEaten = LEVEL_TARGET_CARS - carCount;
  entities.levelTracker.carsEaten = carsEaten;

  // Check win condition - all cars eaten
  if (carCount === 0 && entities.levelTracker.gameState === 'playing') {
    if (dispatch) {
      dispatch({ type: 'levelComplete', carsEaten });
    }
  }

  return entities;
};

export default LevelSystem;
