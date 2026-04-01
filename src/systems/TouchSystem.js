/**
 * Touch System
 * Handles touch input and updates hole target position
 */

import { PanResponder } from 'react-native';

/**
 * Creates a PanResponder for handling touch input
 * Updates the hole's target position based on user touch
 */
export const createTouchSystem = () => {
  return PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    
    onPanResponderGrant: (evt, gestureState) => {
      // Touch started
      return true;
    },
    
    onPanResponderMove: (evt, gestureState) => {
      // Touch is moving - handled by TouchHandler system
      return true;
    },
    
    onPanResponderRelease: () => {
      // Touch ended
      return true;
    },
  });
};

/**
 * Touch Handler System
 * Processes touch events and updates hole's target position
 * The gameLoop will smoothly interpolate to this target
 */
export const TouchHandler = (entities, { events }) => {
  if (events && events.length > 0) {
    events.forEach(event => {
      if (event.type === 'move' && entities.hole) {
        // Update hole's TARGET position (not direct position)
        // GameLoop will handle smooth interpolation
        const { pageX, pageY } = event;
        entities.hole.body.targetPosition = {
          x: pageX,
          y: pageY,
        };
      }
    });
  }
  
  return entities;
};
