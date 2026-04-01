/**
 * RestartButton Component
 * Button to restart the game
 */

import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

const RestartButton = ({ onPress, gameState }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Only show button when game is over or won
  if (gameState !== 'win' && gameState !== 'lose') {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Text style={styles.icon}>🔄</Text>
        <Text style={styles.text}>RESTART</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    zIndex: 10000,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default RestartButton;
