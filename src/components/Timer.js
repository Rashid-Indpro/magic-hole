/**
 * Timer Component
 * Displays countdown timer with visual warnings
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { TIMER_WARNING_THRESHOLD, TIMER_CRITICAL_THRESHOLD } from '../config/constants';

const Timer = ({ timeRemaining, timeLimit = 25 }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timeLeft = timeLimit - timeRemaining;

  // Pulse animation when time is low
  useEffect(() => {
    if (timeLeft <= TIMER_CRITICAL_THRESHOLD && timeLeft > 0) {
      // Fast pulse for critical time
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (timeLeft <= TIMER_WARNING_THRESHOLD && timeLeft > 0) {
      // Slow pulse for warning
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Reset animation
      pulseAnim.setValue(1);
    }
  }, [timeLeft]);

  // Determine timer color based on time remaining
  const getTimerColor = () => {
    if (timeLeft <= TIMER_CRITICAL_THRESHOLD) {
      return '#FF0000'; // Red - Critical
    } else if (timeLeft <= TIMER_WARNING_THRESHOLD) {
      return '#FFA500'; // Orange - Warning
    }
    return '#4CAF50'; // Green - Safe
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        { transform: [{ scale: pulseAnim }] }
      ]}
    >
      <View style={[styles.timerBox, { borderColor: getTimerColor() }]}>
        <Text style={styles.label}>TIME</Text>
        <Text style={[styles.time, { color: getTimerColor() }]}>
          {formatTime(timeRemaining)} / {formatTime(timeLimit)}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    left: 20,
    zIndex: 1000,
  },
  timerBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    borderWidth: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  time: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default Timer;
