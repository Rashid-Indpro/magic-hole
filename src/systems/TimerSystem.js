/**
 * Timer System
 * Manages countdown timer logic
 */

let lastUpdateTime = Date.now();
let accumulatedTime = 0;

/**
 * Reset timer system
 */
export const resetTimerSystem = () => {
  lastUpdateTime = Date.now();
  accumulatedTime = 0;
};

/**
 * Timer System - Updates countdown timer
 * Dispatches 'timerTick' event every second
 * Dispatches 'timeUp' event when timer reaches 0
 */
const TimerSystem = (entities, { events, dispatch }) => {
  const currentTime = Date.now();
  const deltaTime = currentTime - lastUpdateTime;
  lastUpdateTime = currentTime;

  // Only run if timer exists
  if (!entities.timer) {
    return entities;
  }

  // Only tick if game is playing
  if (entities.timer.gameState !== 'playing') {
    return entities;
  }

  // Accumulate time
  accumulatedTime += deltaTime;

  // Check if one second has passed
  if (accumulatedTime >= 1000) {
    accumulatedTime -= 1000;

    // Increase elapsed time
    if (entities.timer.timeElapsed < entities.timer.timeLimit) {
      entities.timer.timeElapsed += 1;

      // Dispatch timer tick event
      if (dispatch) {
        dispatch({ type: 'timerTick', timeElapsed: entities.timer.timeElapsed });
      }

      // Check if time is up
      if (entities.timer.timeElapsed >= entities.timer.timeLimit) {
        if (dispatch) {
          dispatch({ type: 'timeUp' });
        }
      }
    }
  }

  return entities;
};

export default TimerSystem;
