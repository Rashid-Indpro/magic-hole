# 🚀 Phase 6 Quick Start

## What's New

**Complete Game!** Phase 6 adds:
- ⏱️ **25-second countdown timer**
- 🎯 **Level objective**: Eat all 8 cars in time
- 🏆 **Win/Lose conditions** with overlays
- 🔄 **Restart button** to play again
- ✨ **Polished animations** throughout
- 🎨 **Professional UI** improvements

## Running Phase 6

```powershell
npm start
```

Scan QR code with Expo Go app.

## How to Play

### Objective
**Eat all 8 cars in 25 seconds!**

### Controls
- **Tap** anywhere to move hole
- **Drag** to continuously move hole
- **Eat small cars first** to grow bigger
- **Watch the timer!** Don't run out of time

### Win Condition
- Eat all 8 cars before timer hits 0
- See "Level Complete!" screen
- View final score and stats
- Tap "Restart" to play again

### Lose Condition
- Timer reaches 0 with cars remaining
- See "Game Over!" screen
- View how many cars you ate
- Tap "Restart" to try again

## UI Elements

### Timer (Top-Left)
- Shows time remaining (MM:SS format)
- **Green**: Safe (>10 seconds)
- **Orange**: Warning (≤10 seconds, starts pulsing)
- **Red**: Critical (≤5 seconds, pulses faster)

### Score (Top-Center)
- Shows current score
- Pops when you eat a car (+10 points)
- Purple styling to match hole border

### Game Status (Overlay)
- Appears when you win or lose
- Shows:
  - Win/Lose icon and title
  - Final score
  - Cars eaten
  - Animated entrance

### Restart Button (Bottom)
- Only shows when game ends
- Fully resets the game
- Fresh timer, new cars, reset score

## New Features Explained

### Timer System
- Counts down from 25 seconds
- Updates every second
- Visual warnings at 10s and 5s
- Game ends automatically when time runs out

### Level System
- Tracks cars eaten vs. target (8 cars)
- Checks win condition every frame
- Triggers "Level Complete" when all cars eaten
- Only active while game is playing

### Game States
- **PLAYING**: Normal gameplay, timer running
- **WIN**: All cars eaten, game paused, overlay shown
- **LOSE**: Time ran out, game paused, overlay shown

### Animations
- **Hole**: Subtle continuous pulse
- **Score**: Pop when it increases
- **Timer**: Pulse when time is low
- **Game Status**: Fade-in + spring scale
- **Restart Button**: Press animation

## Configuration

Edit **[src/config/constants.js](src/config/constants.js)**:

### Make It Easier
```javascript
// More time
export const LEVEL_TIME_LIMIT = 45; // Default: 25

// Fewer cars
export const LEVEL_TARGET_CARS = 5; // Default: 8

// Bigger hole
export const HOLE_INITIAL_RADIUS = 60; // Default: 40

// Easier eating
export const HOLE_MIN_RADIUS_TO_EAT = 0.5; // Default: 0.7
```

### Make It Harder
```javascript
// Less time
export const LEVEL_TIME_LIMIT = 15; // Default: 25

// More cars
export const LEVEL_TARGET_CARS = 12; // Default: 8

// Smaller hole
export const HOLE_INITIAL_RADIUS = 30; // Default: 40

// Harder eating
export const HOLE_MIN_RADIUS_TO_EAT = 0.9; // Default: 0.7
```

### Adjust Timer Warnings
```javascript
// Earlier warnings
export const TIMER_WARNING_THRESHOLD = 15; // Default: 10
export const TIMER_CRITICAL_THRESHOLD = 8;  // Default: 5
```

### Adjust Animations
```javascript
// Slower animations
export const ANIMATION_DURATION = 500;    // Default: 300
export const FADE_DURATION = 1000;        // Default: 500

// Bigger pops
export const SCALE_ANIMATION_FACTOR = 1.5; // Default: 1.2
```

## Testing Checklist

### ✅ What to Check

**Timer:**
- Displays and counts down ✓
- Shows correct time (MM:SS) ✓
- Changes color at thresholds ✓
- Pulses when low ✓
- Game ends at 0:00 ✓

**Win Condition:**
- Eat all 8 cars → "Level Complete!" ✓
- Shows correct final score ✓
- Shows 8 cars eaten ✓
- Restart button appears ✓

**Lose Condition:**
- Time runs out → "Game Over!" ✓
- Shows partial cars eaten ✓
- Shows final score ✓
- Restart button appears ✓

**Restart:**
- Button only shows when game over ✓
- Clicking resets everything ✓
- New cars spawn ✓
- Timer resets to 25s ✓
- Score resets to 0 ✓
- Game is playable again ✓

**Animations:**
- Hole pulses continuously ✓
- Score pops on update ✓
- Timer pulses when low ✓
- Game status fades in ✓
- Restart button animates on press ✓
- Smooth 60 FPS ✓

**Gameplay:**
- Can move hole while playing ✓
- Can't move hole when game over ✓
- Eating cars grows hole ✓
- Eating cars increases score ✓
- Physics still working ✓
- No crashes or freezes ✓

## Troubleshooting

### Timer Not Counting Down
```javascript
// Check systems array in App.js
systems={[..., TimerSystem, ...]}

// Verify timer entity exists
timer: {
  timeRemaining: 25,
  gameState: 'playing'
}
```

### Game Doesn't End
```javascript
// Make sure event handlers are set up
const handleEvent = (e) => {
  if (e.type === 'timeUp') {
    setGameState(GAME_STATE.LOSE);
  }
  if (e.type === 'levelComplete') {
    setGameState(GAME_STATE.WIN);
  }
};
```

### Restart Doesn't Work
```javascript
// Check handleRestart function exists
const handleRestart = () => {
  if (gameEngineRef.current) {
    gameEngineRef.current.swap(null);
  }
  setTimeout(() => {
    initializeGame();
  }, 100);
};
```

### Animations Choppy
```javascript
// Ensure useNativeDriver is true
Animated.timing(value, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true, // IMPORTANT!
}).start();
```

## Game Flow

```
Start Game
    ↓
Playing (25 seconds)
    ↓
Move hole → Eat cars → Grow hole → Score increases
    ↓
Win: All 8 cars eaten!
  OR
Lose: Time ran out!
    ↓
Game Status Overlay
    ↓
Click Restart
    ↓
Start Game (repeat)
```

## Quick Tips

### For Testing
- **Easy win**: Set `LEVEL_TIME_LIMIT = 60`
- **Quick test**: Set `LEVEL_TARGET_CARS = 2`
- **Instant win**: Set `HOLE_INITIAL_RADIUS = 200`

### For Fun
- **Speed run**: Set `LEVEL_TIME_LIMIT = 10`
- **Chaos mode**: Set `GRAVITY = { x: 0, y: 2.0 }`
- **Tiny challenge**: Set `HOLE_INITIAL_RADIUS = 20`

### Strategy
1. **Eat small cars first** - they're easier to catch
2. **Grow quickly** - bigger hole = eat bigger cars
3. **Plan your path** - minimize travel time
4. **Watch physics** - chase bouncing cars
5. **Time management** - don't waste seconds!

## Files Overview

### New Components
- `Timer.js` - Countdown display
- `GameStatus.js` - Win/lose overlay
- `RestartButton.js` - Restart button

### New Systems
- `TimerSystem.js` - Countdown logic
- `LevelSystem.js` - Win condition tracking

### Updated Files
- `App.js` - Game state management
- `constants.js` - Level/timer config
- `Hole.js` - Pulse animation
- `Score.js` - Pop animation
- `systems/index.js` - New system exports

## What Makes Phase 6 Special

✅ **Complete Game Loop**
- Start → Play → Win/Lose → Restart → Repeat

✅ **Clear Objectives**
- Time limit creates urgency
- Target creates goal
- Win/lose creates closure

✅ **Visual Feedback**
- Timer colors show urgency
- Animations show actions
- Overlays show results

✅ **Polished Feel**
- Smooth animations everywhere
- Professional UI styling
- Responsive interactions
- No rough edges

## Documentation

For full details, see **[PHASE6_DOCUMENTATION.md](PHASE6_DOCUMENTATION.md)**

## Next Steps

Want to improve the game further?
- Add sound effects
- Create multiple levels
- Save high scores
- Add power-ups
- Create different themes
- Add achievements
- Implement social sharing

---

**Enjoy the complete game!** Race against time to eat all 8 cars! ⏱️🚗⚫🎉

