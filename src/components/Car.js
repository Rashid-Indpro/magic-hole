/**
 * Car Component
 * Renders a car using emoji icons
 */

import React from 'react';
import { Text, View } from 'react-native';

const Car = ({ body }) => {
  const { position, size, icon, flipped, opacity = 1 } = body;

  return (
    <View
      style={{
        position: 'absolute',
        left: position.x - size / 2,
        top: position.y - size / 2,
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scaleX: flipped ? -1 : 1 }], // Flip horizontally, not rotate
        opacity: opacity, // Support fade animation
      }}
    >
      <Text
        style={{
          fontSize: size,
          textAlign: 'center',
          // Add subtle shadow for depth
          textShadowColor: 'rgba(0, 0, 0, 0.3)',
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 4,
        }}
      >
        {icon}
      </Text>
    </View>
  );
};

export default Car;
