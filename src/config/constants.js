/**
 * Game Constants Configuration
 * All game-related constants and settings
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Hole Configuration
export const HOLE_RADIUS = 40; // Default/initial hole radius
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

// Collision Detection Configuration
export const COLLISION_DISTANCE_THRESHOLD = 1.2; // Multiplier for collision detection (1.0 = touching, >1.0 = more forgiving)

// Score Configuration
export const POINTS_PER_CAR = 10; // Points awarded for eating a car
export const INITIAL_SCORE = 0;

// Hole Growth Configuration
export const HOLE_MIN_RADIUS = 40; // Minimum hole size
export const HOLE_MAX_RADIUS = 120; // Maximum hole size
export const HOLE_GROWTH_RATE = 2; // How much hole grows per car eaten
export const HOLE_INITIAL_RADIUS = 40; // Starting hole size

// Physics Configuration (Matter.js)
export const PHYSICS_ENABLED = true;
export const GRAVITY = { x: 0, y: 0.3 }; // Light gravity for subtle downward drift
export const CAR_FRICTION = 0.05; // Surface friction
export const CAR_FRICTION_AIR = 0.01; // Air resistance
export const CAR_RESTITUTION = 0.6; // Bounciness (0-1)
export const CAR_DENSITY = 0.001; // Mass density
export const WALL_RESTITUTION = 0.8; // Wall bounciness

// Hole Growth & Size-Based Eating
export const HOLE_MIN_RADIUS_TO_EAT = 0.7; // Hole must be at least 70% size of car to eat it
