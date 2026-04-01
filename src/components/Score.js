/**
 * Score Component
 * Displays the current score with pop animation on update
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Score = ({ score }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const previousScore = useRef(score);

  // Animate when score changes
  useEffect(() => {
    if (score !== previousScore.current) {
      previousScore.current = score;
      
      // Pop animation
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [score]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.scoreBox,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <Text style={styles.label}>SCORE</Text>
        <Text style={styles.score}>{score}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  scoreBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#4B0082',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B0082',
    textAlign: 'center',
    letterSpacing: 1,
  },
  score: {
    fontSize: 32,
    fontWeight: '800',
    color: '#4B0082',
    textAlign: 'center',
    marginTop: 2,
  },
});

export default Score;
