/**
 * Game Constants Configuration
 * All game-related constants and settings
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Hole Configuration
export const HOLE_RADIUS = 40;
export const HOLE_COLOR = '#000000';
export const HOLE_POSITION = {
  x: SCREEN_WIDTH / 2,
  y: SCREEN_HEIGHT - 150, // Position at bottom of screen
};

// Movement Configuration
export const MOVEMENT_SMOOTHING = 0.15; // Smoothing factor (0-1, higher = more responsive)
export const MIN_MOVEMENT_THRESHOLD = 0.1; // Minimum distance to move

// Car Configuration
export const CAR_MIN_SIZE = 40; // Minimum size for car icons
export const CAR_MAX_SIZE = 80; // Maximum size for car icons
export const INITIAL_CAR_COUNT = 8; // Number of cars to spawn initially

// Car Icons (variety of vehicle emojis)
export const CAR_ICONS = [
  '🚗', // Red car
  '🚕', // Taxi
  '🚙', // SUV
  '🚌', // Bus
  '🚎', // Trolleybus
  '🏎️', // Racing car
  '🚓', // Police car
  '🚑', // Ambulance
  '🚒', // Fire engine
  '🚐', // Minibus
  '🚚', // Delivery truck
  '🚛', // Articulated lorry
  '🚜', // Tractor
  '🛻', // Pickup truck
];

// Car Colors (for slight tint/background - optional)
export const CAR_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#FFA07A', // Light Salmon
  '#98D8C8', // Mint
  '#F7DC6F', // Yellow
  '#BB8FCE', // Purple
  '#EC7063', // Coral
  '#52B788', // Green
  '#FFB347', // Orange
];

// Game Colors
export const COLORS = {
  background: '#87CEEB', // Sky blue
  hole: '#000000',
  holeBorder: '#4B0082', // Purple/indigo
};
