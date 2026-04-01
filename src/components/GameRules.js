/**
 * GameRules Component
 * Displays game objective and rules
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LEVEL_TARGET_SCORE, LEVEL_TIME_LIMIT } from '../config/constants';

const GameRules = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 OBJECTIVE</Text>
      <Text style={styles.rule}>
        Score <Text style={styles.highlight}>{LEVEL_TARGET_SCORE} points</Text> in{' '}
        <Text style={styles.highlight}>{LEVEL_TIME_LIMIT} seconds</Text>
      </Text>
      <Text style={styles.subtitle}>• Small cars = 3 pts (easy)</Text>
      <Text style={styles.subtitle}>• Medium cars = 10 pts (harder)</Text>
      <Text style={styles.subtitle}>• Large cars = 20 pts (hardest)</Text>
      <Text style={styles.hint}>⚠️ Your hole must be bigger than the car!</Text>
      <Text style={styles.hint}>Eat small cars first to grow your hole</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 200,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A1B9A',
    textAlign: 'center',
    marginBottom: 8,
  },
  rule: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 3,
  },
  hint: {
    fontSize: 12,
    color: '#6A1B9A',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  highlight: {
    color: '#6A1B9A',
    fontWeight: 'bold',
  },
});

export default GameRules;
