/**
 * Hole City - Main App Component
 * Phase 2: Player Movement (Hole Control)
 */

import React, { useRef } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { setupEntities } from './src/entities';
import { gameLoop, TouchHandler, createTouchSystem } from './src/systems';
import { COLORS } from './src/config/constants';

export default function App() {
  const gameEngineRef = useRef(null);
  const panResponder = useRef(createTouchSystem()).current;

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

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View
        style={styles.gameContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        {...panResponder.panHandlers}
      >
        <GameEngine
          ref={gameEngineRef}
          style={styles.gameEngine}
          systems={[TouchHandler, gameLoop]}
          entities={setupEntities()}
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
