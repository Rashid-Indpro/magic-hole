# 🚀 Phase 5 Quick Start

## What Changed

**Physics + Growth!** The game now has:
- 🎱 **Matter.js Physics**: Cars drift and bounce realistically
- 📈 **Hole Growth**: Hole gets bigger as you eat cars
- 🎯 **Size-Based Eating**: Must grow hole to eat bigger cars

## Running Phase 5

```powershell
npm start
```

Then scan QR code with Expo Go app.

## New Gameplay

### The Challenge
1. **Start small**: Hole radius = 40px
2. **Eat small cars first**: Build up your size
3. **Grow bigger**: Each car adds 2px to radius
4. **Eat bigger cars**: Once you're large enough
5. **Max out**: Reach 120px radius maximum

### Physics Behavior
- Cars drift slowly downward (gravity)
- Cars bounce off screen edges
- Cars rotate naturally
- Smooth, realistic movement

### Size Rules
- Small hole (40px) → Can eat cars up to ~57px
- Medium hole (60px) → Can eat cars up to ~86px
- Large hole (80px+) → Can eat ALL default cars

**Try to touch a big car with small hole** → Nothing happens! Growth required first.

## Key Files

### New Files
- **[src/systems/PhysicsSystem.js](src/systems/PhysicsSystem.js)** - Matter.js integration
- **[src/utils/physics.js](src/utils/physics.js)** - Physics utilities

### Updated Files
- **[App.js](App.js)** - Initializes physics, adds PhysicsSystem
- **[src/config/constants.js](src/config/constants.js)** - Physics/growth settings
- **[src/entities/Hole.js](src/entities/Hole.js)** - Growth logic
- **[src/entities/Car.js](src/entities/Car.js)** - Physics bodies
- **[src/systems/CollisionSystem.js](src/systems/CollisionSystem.js)** - Size-based eating

## Configuration

Edit **[src/config/constants.js](src/config/constants.js)**:

### Make It Easier
```javascript
// Grow faster
export const HOLE_GROWTH_RATE = 5; // Default: 2

// Easier eating
export const HOLE_MIN_RADIUS_TO_EAT = 0.5; // Default: 0.7

// Start bigger
export const HOLE_INITIAL_RADIUS = 60; // Default: 40
```

### Make It Harder
```javascript
// Grow slower
export const HOLE_GROWTH_RATE = 1; // Default: 2

// Harder eating
export const HOLE_MIN_RADIUS_TO_EAT = 0.9; // Default: 0.7

// Start smaller
export const HOLE_INITIAL_RADIUS = 30; // Default: 40
```

### Adjust Physics
```javascript
// More gravity (faster falling)
export const GRAVITY = { x: 0, y: 1.0 }; // Default: 0.3

// Less friction (more sliding)
export const CAR_FRICTION = 0.01; // Default: 0.05

// More bounce
export const CAR_RESTITUTION = 0.9; // Default: 0.6
```

### Disable Physics
```javascript
// Back to Phase 4 behavior
export const PHYSICS_ENABLED = false; // Default: true
```

## Testing

### ✅ What to Check

**Physics Working:**
- Cars drift slowly downward ✓
- Cars bounce off screen edges ✓
- Cars rotate naturally ✓

**Hole Growth:**
- Hole starts at 40px ✓
- Hole gets bigger after eating ✓
- Hole stops at 120px max ✓

**Size-Based Eating:**
- Small hole can't eat big cars ✓
- Growing hole can eat bigger cars ✓
- Large hole eats everything ✓

**Performance:**
- Smooth 60 FPS ✓
- No lag when eating ✓
- Physics runs smoothly ✓

## Troubleshooting

### Cars Fly Off Screen
```javascript
// In constants.js
export const GRAVITY = { x: 0, y: 0.1 }; // Reduce gravity
export const WALL_RESTITUTION = 1.0; // Bouncier walls
```

### Can't Eat Anything
```javascript
// In constants.js
export const HOLE_MIN_RADIUS_TO_EAT = 0.5; // Lower threshold
export const HOLE_INITIAL_RADIUS = 60; // Start bigger
```

### Hole Doesn't Grow
- Check console for errors
- Verify collision system is running
- Make sure cars are being eaten (score increasing?)

### Performance Issues
```javascript
// In constants.js
export const PHYSICS_ENABLED = false; // Disable physics
export const INITIAL_CAR_COUNT = 4; // Fewer cars
```

## System Flow

```
Touch Screen → Move Hole
     ↓
Physics Update → Cars drift/bounce
     ↓
Collision Check → Hole touching car?
     ↓
Size Check → Hole big enough?
     ↓
YES → Eat car + Grow hole + Add score
     ↓
NO → Nothing happens (need to grow more!)
```

## Quick Tweaks

### Easy Mode
```javascript
HOLE_GROWTH_RATE = 10
HOLE_INITIAL_RADIUS = 80
HOLE_MIN_RADIUS_TO_EAT = 0.3
GRAVITY = { x: 0, y: 0.1 }
```

### Hard Mode
```javascript
HOLE_GROWTH_RATE = 1
HOLE_INITIAL_RADIUS = 30
HOLE_MIN_RADIUS_TO_EAT = 0.9
GRAVITY = { x: 0, y: 0.8 }
```

### Chaos Mode
```javascript
GRAVITY = { x: 0, y: 2.0 }
CAR_FRICTION = 0.001
CAR_RESTITUTION = 1.5
WALL_RESTITUTION = 2.0
// Cars bounce EVERYWHERE!
```

### No Physics Mode
```javascript
PHYSICS_ENABLED = false
// Back to static cars (Phase 4)
```

## What's in constants.js

```javascript
// Hole Growth
HOLE_MIN_RADIUS = 40        // Starting size
HOLE_MAX_RADIUS = 120       // Maximum size
HOLE_GROWTH_RATE = 2        // Pixels per car
HOLE_MIN_RADIUS_TO_EAT = 0.7  // Size ratio to eat (70%)

// Physics
PHYSICS_ENABLED = true
GRAVITY = { x: 0, y: 0.3 }  // Light downward
CAR_FRICTION = 0.05         // Surface drag
CAR_FRICTION_AIR = 0.01     // Air resistance
CAR_RESTITUTION = 0.6       // Bounciness (0-1)
CAR_DENSITY = 0.001         // Mass
WALL_RESTITUTION = 0.8      // Wall bounce
```

## How Growth Works

```
Eat Car #1:  40px → 42px  (+2px)
Eat Car #2:  42px → 44px  (+2px)
Eat Car #3:  44px → 46px  (+2px)
...
Eat Car #20: 78px → 80px  (+2px)
...
Eat Car #40: 118px → 120px (+2px, then capped at MAX)
Eat Car #41: 120px → 120px (no more growth, at max!)
```

## Documentation

For full details, see **[PHASE5_DOCUMENTATION.md](PHASE5_DOCUMENTATION.md)**

## Next Steps (Ideas)

- Add continuous car spawning
- Add eating animation
- Add sound effects
- Add particle effects
- Save high score
- Add difficulty levels
- Add new object types
- Add power-ups

---

**Enjoy the physics!** Watch those cars drift and bounce! 🚗💨⚫✨

