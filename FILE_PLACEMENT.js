/**
 * FILE PLACEMENT GUIDE - PHASE 3
 * Quick reference for all project files
 */

/*
PROJECT ROOT (d:\games\hole\)
├── App.js                                    ← MAIN APP (GameEngine + Touch handling)
├── package.json                              ← Dependencies
├── README.md                                 ← Main documentation
├── PHASE2_DOCUMENTATION.md                   ← Phase 2 detailed docs
├── PHASE3_DOCUMENTATION.md                   ← Phase 3 detailed docs (NEW)
├── PHASE3_QUICK_START.md                     ← Phase 3 quick guide (NEW)
├── FILE_PLACEMENT.js                         ← This file
│
└── src/                                      ← SOURCE CODE FOLDER
    │
    ├── components/                           ← RENDERING COMPONENTS
    │   ├── Hole.js                          ← Renders the hole circle
    │   └── Car.js                           ← Renders car objects (NEW in Phase 3)
    │
    ├── entities/                             ← GAME ENTITIES
    │   ├── Hole.js                          ← Hole entity factory
    │   ├── Car.js                           ← Car entity factory (NEW in Phase 3)
    │   └── index.js                         ← Entity setup/export
    │
    ├── systems/                              ← GAME LOGIC SYSTEMS
    │   ├── GameLoop.js                      ← Main game loop with smooth movement
    │   ├── TouchSystem.js                   ← Touch handling
    │   └── index.js                         ← Systems export
    │
    ├── config/                               ← CONFIGURATION
    │   └── constants.js                     ← Game constants (car config added!)
    │
    └── utils/                                ← UTILITY FUNCTIONS
        ├── boundary.js                      ← Boundary checking
        ├── random.js                        ← Random generation (NEW in Phase 3)
        └── index.js                         ← Utils export


WHAT EACH FOLDER CONTAINS:
==========================

📁 components/
  - React components that render game entities
  - Pure presentational components
  - Receive props and display visuals
  - Example: Hole.js renders a circular view

📁 entities/
  - Entity factory functions
  - Define game object properties
  - Link entities to their renderer components
  - Export setupEntities() to initialize all entities
  - Phase 2: Now includes position and targetPosition

📁 systems/
  - Game logic systems
  - Update functions that run every frame
  - Modify entity state over time
  - Example: gameLoop (smooth movement), TouchHandler (input)

📁 config/
  - Configuration constants
  - Screen dimensions, colors, sizes
  - Movement settings (Phase 2)
  - Game settings
  - Easy to modify without touching code

📁 utils/
  - Helper/utility functions
  - Reusable code
  - Phase 2: Boundary checking utilities
  - Phase 3: Random generation utilities


DATA FLOW (PHASE 3):
===================

INITIALIZATION:
1. App starts → setupEntities() called
2. createHole() → creates hole entity
3. createCars(8) → creates 8 car entities
   - For each car:
     * generateId() → unique ID
     * randomPosition() → random x, y
     * randomBetween() → random width, height
     * randomChoice() → random color
4. All entities returned to GameEngine as flat object

RUNTIME (60 FPS):
1. User touches screen
2. App.js captures touch event (onTouchStart/onTouchMove)
3. Event dispatched to GameEngine
4. TouchHandler system updates hole.body.targetPosition
5. gameLoop system smoothly interpolates position → targetPosition
6. keepInBounds() ensures hole stays on screen
7. GameEngine re-renders ALL entities (hole + 8 cars)
8. Repeat steps 1-7 at 60 FPS


PHASE 3 FILES:
==============

✅ App.js                        - Main app with GameEngine + Touch handlers
✅ src/components/Hole.js        - Hole renderer component
✅ src/components/Car.js         - Car renderer component (NEW in Phase 3)
✅ src/entities/Hole.js          - Hole entity factory
✅ src/entities/Car.js           - Car entity factory (NEW in Phase 3)
✅ src/entities/index.js         - Setup entities (now creates 8 cars!)
✅ src/systems/GameLoop.js       - Game loop with smooth movement
✅ src/systems/TouchSystem.js    - Touch handling
✅ src/systems/index.js          - Export systems
✅ src/utils/boundary.js         - Boundary utilities
✅ src/utils/random.js           - Random utilities (NEW in Phase 3)
✅ src/utils/index.js            - Export utils
✅ src/config/constants.js       - Game constants (car config added!)
✅ README.md                     - Full documentation
✅ PHASE2_DOCUMENTATION.md       - Phase 2 details
✅ PHASE3_DOCUMENTATION.md       - Phase 3 details (NEW)
✅ PHASE3_QUICK_START.md         - Phase 3 quick guide (NEW)
✅ FILE_PLACEMENT.js             - This guide


HOW TO ADD NEW ENTITIES:
========================

EXAMPLE: Adding cars in Phase 3

HOW TO ADD NEW ENTITIES:
========================

EXAMPLE: Adding cars in Phase 3

1. Create renderer component in src/components/Car.js
   - Takes body props (position, width, height, color)
   - Returns View with styling
   
2. Create entity factory in src/entities/Car.js
   - createCar() - creates single car with random properties
   - createCars(count) - creates multiple cars
   
3. Add to setupEntities() in src/entities/index.js
   - Import createCars
   - Call createCars(8) to create 8 cars
   - Spread cars into returned object: { hole, ...cars }
   
4. Cars automatically render in GameEngine!


HOW TO ADD NEW GAME LOGIC:
=========================

1. Create system file in src/systems/YourSystem.js
2. Export system function: (entities, { time, events }) => entities
3. Add to systems array in App.js: systems={[TouchHandler, gameLoop, yourSystem]}
4. System will run every frame!
5. Remember: System order matters! TouchHandler should run before gameLoop


PHASE 3 KEY CONCEPTS:
====================

🎲 Random Generation:
  - randomBetween(min, max): Random float value
  - randomIntBetween(min, max): Random integer
  - randomChoice(array): Pick random item from array
  - randomPosition(width, height, margin): Safe position within bounds
  - generateId(prefix): Unique ID using timestamp + random string

🆔 Unique IDs:
  - Each car has unique ID (e.g., "car_1680123456789_abc123")
  - Used as entity key in GameEngine
  - Allows easy entity removal (future collision detection)
  - Format: prefix_timestamp_randomString

📦 Flat Entity Structure:
  - All entities in one flat object (not nested)
  - Good: { hole: {...}, car_1: {...}, car_2: {...} }
  - Bad: { hole: {...}, cars: { car_1: {...} } }
  - Benefits: Easy iteration, better performance

🎨 Entity Variety:
  - Size: Random width (40-80px) and height (60-100px)
  - Color: Random from 10 vibrant colors
  - Position: Random within safe margins
  - Each car is visually unique

📏 Safe Positioning:
  - Margin = max(CAR_MAX_WIDTH, CAR_MAX_HEIGHT) / 2
  - Ensures cars never cut off at screen edges
  - Position always within: (margin, SCREEN - margin)

PHASE 2 KEY CONCEPTS:
====================

🎯 Target Position vs Current Position:
  - targetPosition: Where user touched (updated instantly)
  - position: Where hole is rendered (interpolates smoothly)
  - This separation creates smooth movement

📏 Boundary Checking:
  - keepInBounds() keeps entities within screen
  - Applied after movement calculation
  - Prevents off-screen rendering

🎨 Linear Interpolation (lerp):
  - Smoothly transitions from current to target position
  - Formula: current + (target - current) * smoothingFactor
  - Creates natural, smooth movement

⚡ Performance:
  - Efficient calculations
  - Runs at 60 FPS
  - No unnecessary re-renders
  - Optimized for mobile

*/
