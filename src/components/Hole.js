/**
 * Hole Component
 * Renders the hole (black circle) with subtle pulse animation
 */

import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const Hole = ({ body }) => {
  const { position, radius, color, borderColor } = body;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Subtle continuous pulse animation
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    
    pulse.start();
    
    return () => pulse.stop();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: position.x - radius,
        top: position.y - radius,
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        backgroundColor: color,
        borderWidth: 3,
        borderColor: borderColor,
        transform: [{ scale: pulseAnim }],
      }}
    />
  );
};

export default Hole;
