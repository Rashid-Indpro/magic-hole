/**
 * Score Component
 * Displays the current score on screen
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Score = ({ score }) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreBox}>
        <Text style={styles.label}>SCORE</Text>
        <Text style={styles.score}>{score}</Text>
      </View>
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
