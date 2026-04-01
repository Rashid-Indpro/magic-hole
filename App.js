/**
 * Hole City - Main App Component
 * Phase 5: Physics & Hole Growth
 */

import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { setupEntities } from './src/entities';
import { 
  gameLoop, 
  TouchHandler, 
  createTouchSystem, 
  CollisionSystem,
  PhysicsSystem,
  initPhysics,
} from './src/systems';
import { COLORS, INITIAL_SCORE } from './src/config/constants';
import Score from './src/components/Score';

export default function App() {
  const gameEngineRef = useRef(null);
  const panResponder = useRef(createTouchSystem()).current;
  const [score, setScore] = useState(INITIAL_SCORE);

  /**
   * Initialize physics engine on mount
   */
  useEffect(() => {
    initPhysics();
  }, []);

  /**
   * Handle touch move events
   */
  const handleTouchMove = (e) => {
    const touch = e.nativeEvent.touches[0];
    if (touch && gameEngineRef.current) {
      gameEngineRef.current.dispatch({
        type: 'move',
        pageX: touch.pageX,
        pageY: touch.pageY,
      });
    }
  };

  /**
   * Handle touch start events
   */
  const handleTouchStart = (e) => {
    const touch = e.nativeEvent.touches[0];
    if (touch && gameEngineRef.current) {
      gameEngineRef.current.dispatch({
        type: 'move',
        pageX: touch.pageX,
        pageY: touch.pageY,
      });
    }
  };

  /**
   * Handle game events (collisions, score updates)
   */
  const handleEvent = (e) => {
    if (e.type === 'score-update') {
      setScore(prevScore => prevScore + e.points);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Score score={score} />
      <View
        style={styles.gameContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        {...panResponder.panHandlers}
      >
        <GameEngine
          ref={gameEngineRef}
          style={styles.gameEngine}
          systems={[TouchHandler, PhysicsSystem, CollisionSystem, gameLoop]}
          entities={setupEntities()}
          onEvent={handleEvent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gameEngine: {
    flex: 1,
  },
});
