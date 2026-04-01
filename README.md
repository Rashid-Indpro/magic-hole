# 🕳️ Hole City - React Native Game

A mobile game built with React Native, Expo, react-native-game-engine, and matter-js.

## 📋 Project Overview

**Current Phase:** Phase 3 - Objects (Cars) ✅

### Completed Phases:

**Phase 1** - Project Setup & Basic Game Loop
- ✅ Expo project setup
- ✅ Required dependencies installed
- ✅ Basic GameEngine configured
- ✅ Static circle (hole) rendered on screen
- ✅ Game loop running continuously

**Phase 2** - Player Movement (Hole Control)
- ✅ Touch-based movement system
- ✅ Smooth interpolation movement
- ✅ Boundary detection
- ✅ 60 FPS performance
- ✅ Responsive touch controls (tap & drag)

**Phase 3** - Objects (Cars)
- ✅ Car entity creation with random properties
- ✅ Multiple objects (8 cars) spawning on screen
- ✅ Random position, size, and color generation
- ✅ Unique ID system for each object
- ✅ Clean rendering with shadows and borders

## 🛠️ Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **react-native-game-engine** - Game loop and entity management
- **matter-js** - Physics engine (will be used in later phases)

## 📁 Project Structure

```
hole/
├── App.js                          # Main app entry point with GameEngine & touch handling
├── src/
│   ├── components/                 # Rendering components
│   │   ├── Hole.js                # Hole/circle rendering component
│   │   └── Car.js                 # Car rendering component (NEW in Phase 3)
│   ├── entities/                   # Game entities
│   │   ├── Hole.js                # Hole entity factory
│   │   ├── Car.js                 # Car entity factory (NEW in Phase 3)
│   │   └── index.js               # Entities setup/export
│   ├── systems/                    # Game systems (logic)
│   │   ├── GameLoop.js            # Main game loop with smooth movement
│   │   ├── TouchSystem.js         # Touch handling system
│   │   └── index.js               # Systems export
│   ├── utils/                      # Utility functions
│   │   ├── boundary.js            # Boundary checking utilities
│   │   ├── random.js              # Random generation utilities (NEW in Phase 3)
│   │   └── index.js               # Utils export
│   └── config/                     # Configuration
│       └── constants.js           # Game constants and settings
├── package.json
├── README.md                       # Main documentation
├── PHASE2_DOCUMENTATION.md         # Detailed Phase 2 docs
├── PHASE3_DOCUMENTATION.md         # Detailed Phase 3 docs (NEW)
└── FILE_PLACEMENT.js              # File structure guide
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Install Dependencies

```bash
npm install
```

### Run the Project

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS (requires macOS)
npm run ios

# Run on web
npm run web
```

## 🎮 Current Features (Phase 3)

### What's Implemented:

**Phase 1 Features:**
1. **Basic Game Engine**: GameEngine running with continuous update loop at 60 FPS
2. **Hole Entity**: Black circle with purple border rendered on screen
3. **Modular Structure**: Clean, organized folder structure following React Native best practices
4. **Functional Components**: All components use React hooks (no class components)

**Phase 2 Features:**
5. **Touch Controls**: Full-screen touch detection with PanResponder
6. **Smooth Movement**: Linear interpolation for natural, smooth motion
7. **Boundary Detection**: Hole automatically stays within screen bounds
8. **Responsive Input**: Works with both tap and drag gestures
9. **Performance Optimized**: Maintains 60 FPS with efficient movement calculations

**Phase 3 Features (NEW):**
10. **Car Objects**: 8 cars with random properties spawn on screen
11. **Random Generation**: Position, size, and color randomization
12. **Unique IDs**: Each object has a unique identifier
13. **Visual Variety**: 10 different vibrant colors for cars
14. **Size Variation**: Cars have different widths (40-80px) and heights (60-100px)

### How to Play:
- **Tap anywhere**: Hole smoothly moves to that location
- **Drag your finger**: Hole follows your touch
- **See the cars**: 8 colorful cars are placed randomly on screen
- **Try the edges**: Notice how the hole stays within bounds

### What's NOT Implemented Yet:
- ❌ Physics simulation with matter-js (Phase 4)
- ❌ Collision detection (Phase 4)
- ❌ Object absorption mechanics (Phase 4)
- ❌ Dynamic object spawning (Phase 4+)
- ❌ Scoring system (Phase 4+)

## 📝 File Descriptions

### Core Files

#### [App.js](App.js)
- Main entry point of the application
- Sets up GameEngine with entities and systems
- Handles touch events (onTouchStart, onTouchMove)
- Dispatches touch events to GameEngine
- **Phase 2**: Added PanResponder integration

#### [src/config/constants.js](src/config/constants.js)
- Contains all game configuration constants
- Screen dimensions
- Hole properties (radius, color, position)
- **Phase 2**: Added movement settings (MOVEMENT_SMOOTHING, MIN_MOVEMENT_THRESHOLD)
- **Phase 3**: Added car configuration (size ranges, colors, spawn count)
- Color scheme

#### [src/components/Hole.js](src/components/Hole.js)
- Functional component that renders the hole
- Takes body properties and renders a circular View
- Handles positioning and styling

#### [src/components/Car.js](src/components/Car.js) **NEW in Phase 3**
- Functional component that renders a car
- Rectangular shape with rounded corners
- White border and drop shadow for depth
- Positioned absolutely based on body properties

#### [src/entities/Hole.js](src/entities/Hole.js)
- Factory function to create the hole entity
- Defines the hole's properties (position, radius, colors)
- **Phase 2**: Added targetPosition for smooth movement
- Links the entity to its renderer component

#### [src/entities/Car.js](src/entities/Car.js) **NEW in Phase 3**
- Factory functions to create car entities
- `createCar(id)`: Creates single car with random properties
- `createCars(count)`: Creates multiple cars
- Random position, size, and color generation

#### [src/entities/index.js](src/entities/index.js)
- Central place to create and export all game entities
- `setupEntities()` function initializes all entities for the game
- **Phase 3**: Now creates hole + multiple cars (default: 8)

#### [src/systems/GameLoop.js](src/systems/GameLoop.js)
- Main game loop that runs every frame
- Receives entities and time delta
- **Phase 2**: Added smooth movement with linear interpolation
- **Phase 2**: Integrated boundary checking

#### [src/systems/TouchSystem.js](src/systems/TouchSystem.js)
- Handles touch input with PanResponder
- `createTouchSystem()`: Creates PanResponder instance
- `TouchHandler()`: System that updates hole's target position from touch events

#### [src/utils/boundary.js](src/utils/boundary.js)
- Utility functions for boundary checking
- `clamp()`: Restricts values between min/max
- `keepInBounds()`: Keeps entities within screen bounds
- `isInBounds()`: Checks if position is within bounds

#### [src/utils/random.js](src/utils/random.js) **NEW in Phase 3**
- Random value generation utilities
- `randomBetween()`: Random float between min/max
- `randomIntBetween()`: Random integer between min/max
- `randomChoice()`: Pick random item from array
- `randomPosition()`: Random position within bounds
- `generateId()`: Unique ID generator

#### [src/systems/index.js](src/systems/index.js)
- Exports all game systems
- Exports TouchHandler and createTouchSystem

#### [src/utils/index.js](src/utils/index.js)
- Exports all utility functions
- **Phase 3**: Now exports random utilities

## 🔧 How It Works

### Game Engine Architecture

```
App.js (Touch Handlers)
  └─ GameEngine
      ├─ entities (from setupEntities())
      │   ├─ hole
      │   │   ├─ body
      │   │   │   ├─ position {x, y}        (current position)
      │   │   │   ├─ targetPosition {x, y}  (touch target)
      │   │   │   ├─ radius
      │   │   │   └─ colors
      │   │   └─ renderer (Hole component)
      │   │
      │   ├─ car_1234... (Phase 3)
      │   │   ├─ body
      │   │   │   ├─ position {x, y}
      │   │   │   ├─ width, height
      │   │   │   ├─ color
      │   │   │   └─ type: 'car'
      │   │   └─ renderer (Car component)
      │   │
      │   ├─ car_5678... (Phase 3)
      │   └─ ... (6 more cars)
      │
      └─ systems (run every frame in order)
          ├─ TouchHandler (updates targetPosition from touch events)
          └─ gameLoop (interpolates position → targetPosition)
```

### Game Loop Flow (Phase 2)

1. **Initialization**: `setupEntities()` creates the hole entity with position and targetPosition
2. **Touch Input**: User touches/drags screen
3. **Touch Handling**: App.js captures touch and dispatches event to GameEngine
4. **TouchHandler System**: Updates hole's targetPosition to touch coordinates
5. **GameLoop System**: 
   - Smoothly interpolates current position toward targetPosition (lerp)
   - Applies boundary checking to keep hole on screen
6. **Render**: GameEngine re-renders hole at new position
7. **Repeat**: Steps 2-6 repeat at 60 FPS

### Movement Algorithm

```javascript
// Smooth movement with linear interpolation
distance = targetPosition - currentPosition
newPosition = currentPosition + (distance * MOVEMENT_SMOOTHING)
finalPosition = keepInBounds(newPosition, radius)
```

This creates smooth, natural movement without sudden jumps.

### Entity Structure

Each entity in the game follows this structure:

```javascript
// Hole entity
{
  body: {
    position: {x, y},        // Current rendered position
    targetPosition: {x, y},  // Where entity is moving to
    radius: 40,              // Size
    color: '#000000',        // Appearance
    // ... other properties
  },
  renderer: Hole // React component to render the entity
}

// Car entity (Phase 3)
{
  id: 'car_1234567890_abc',
  body: {
    position: {x, y},
    width: 65,
    height: 85,
    color: '#FF6B6B',
    type: 'car',
  },
  renderer: Car
}
```

## 🎯 Next Steps (Phase 4)

The next phase will include:
- Integrating matter-js physics engine
- Collision detection between hole and cars
- Object absorption mechanics (cars disappear when touching hole)
- Hole growth system (hole gets bigger as it eats cars)
- Scoring system

## 📱 Testing

### Running the Game

1. Start the development server: `npm start`
2. Scan the QR code with Expo Go app on your phone
3. You should see:
   - A light blue background (sky)
   - A black circle with purple border (the hole)
   - **8 colorful cars** randomly placed on screen (Phase 3)
   - **Try tapping anywhere** - the hole should smoothly move there
   - **Try dragging** - the hole should follow your finger
   - **Try the edges** - the hole should stay within screen bounds

### Testing Checklist

- ✅ App loads without errors
- ✅ Hole renders on screen
- ✅ **8 cars appear with different colors** (Phase 3)
- ✅ **Cars have different sizes** (Phase 3)
- ✅ **All cars fully visible (not cut off)** (Phase 3)
- ✅ Tapping moves the hole smoothly
- ✅ Dragging moves the hole smoothly
- ✅ Movement is smooth (no jittering)
- ✅ Hole stays within screen boundaries
- ✅ No lag or stuttering (60 FPS maintained)

## 🐛 Troubleshooting

### Phase 2 Issues

**Issue: Hole doesn't move when touching**
- Verify touch events are working (check console)
- Ensure TouchHandler is in the systems array before gameLoop
- Check that targetPosition is being updated in TouchSystem

**Issue: Movement is too fast or too slow**
- Adjust `MOVEMENT_SMOOTHING` in [src/config/constants.js](src/config/constants.js)
- Higher value (0.2-0.3) = more responsive
- Lower value (0.05-0.1) = smoother/floatier

**Issue: Jittery or stuttering movement**
- Increase `MIN_MOVEMENT_THRESHOLD` in constants.js
- Lower `MOVEMENT_SMOOTHING` for smoother motion
- Check device performance

**Issue: Hole goes off screen**
- Verify `keepInBounds` is working in GameLoop.js
- Check that SCREEN_WIDTH and SCREEN_HEIGHT are correct

### General Issues

**Issue: App won't start**
- Make sure all dependencies are installed: `npm install`
- Clear cache: `npx expo start -c`

**Issue: Black screen**
- Check Metro bundler console for errors
- Make sure all files are saved
- Try restarting the Expo server

## 📚 Documentation

- **[README.md](README.md)** - Main project documentation (this file)
- **[PHASE2_DOCUMENTATION.md](PHASE2_DOCUMENTATION.md)** - Detailed Phase 2 implementation docs
- **[PHASE3_DOCUMENTATION.md](PHASE3_DOCUMENTATION.md)** - Detailed Phase 3 implementation docs
- **[FILE_PLACEMENT.js](FILE_PLACEMENT.js)** - File structure reference guide

## 📄 License

This is a tutorial/learning project.

---

## ✅ Progress Status

**Phase 1 Complete!** ✅ - Basic game loop and rendering  
**Phase 2 Complete!** ✅ - Touch-based player movement  
**Phase 3 Complete!** ✅ - Multiple objects (cars) on screen  

**Ready for Phase 4:** Collision Detection & Object Absorption

---

### 🎉 Try It Now!

Run `npm start` and see 8 colorful cars on screen! Move the hole by tapping/dragging! 🚗✨
