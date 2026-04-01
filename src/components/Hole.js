/**
 * Hole Component
 * Renders the hole (black circle) on the screen
 */

import React from 'react';
import { View } from 'react-native';

const Hole = ({ body }) => {
  const { position, radius, color, borderColor } = body;

  return (
    <View
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
      }}
    />
  );
};

export default Hole;
