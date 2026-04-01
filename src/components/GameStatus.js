/**
 * GameStatus Component
 * Displays win/lose overlay with animations
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { GAME_STATE, FADE_DURATION, SCREEN_WIDTH, SCREEN_HEIGHT } from '../config/constants';

const GameStatus = ({ gameState, score, carsEaten, onRestart }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (gameState === GAME_STATE.WIN || gameState === GAME_STATE.LOSE) {
      // Fade in and scale up animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: FADE_DURATION,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [gameState]);

  if (gameState !== GAME_STATE.WIN && gameState !== GAME_STATE.LOSE) {
    return null;
  }

  const isWin = gameState === GAME_STATE.WIN;

  return (
    <Animated.View 
      style={[
        styles.overlay,
        { opacity: fadeAnim }
      ]}
    >
      <Animated.View 
        style={[
          styles.statusBox,
          isWin ? styles.winBox : styles.loseBox,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        {/* Status Icon */}
        <Text style={styles.icon}>
          {isWin ? '🎉' : '😢'}
        </Text>

        {/* Status Title */}
        <Text style={[styles.title, isWin ? styles.winText : styles.loseText]}>
          {isWin ? 'LEVEL COMPLETE!' : 'GAME OVER!'}
        </Text>

        {/* Status Message */}
        <Text style={styles.message}>
          {isWin 
            ? `You ate all ${carsEaten} cars!` 
            : 'Time ran out!'}
        </Text>

        {/* Score Display */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>FINAL SCORE</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Cars Eaten</Text>
            <Text style={styles.statValue}>{carsEaten}</Text>
          </View>
        </View>

        {/* Restart Hint */}
        <Text style={styles.hint}>
          Tap "Restart" to try again!
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  statusBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.85,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  winBox: {
    borderWidth: 5,
    borderColor: '#4CAF50',
  },
  loseBox: {
    borderWidth: 5,
    borderColor: '#F44336',
  },
  icon: {
    fontSize: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
  },
  winText: {
    color: '#4CAF50',
  },
  loseText: {
    color: '#F44336',
  },
  message: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  hint: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default GameStatus;
