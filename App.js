/**
 * Hole City - Main App Component
 * Phase 6: Levels, Timer & Game Polish
 */

import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { setupEntities } from './src/entities';
import { 
  gameLoop, 
  TouchHandler, 
  createTouchSystem, 
  CollisionSystem,
  PhysicsSystem,
  initPhysics,
  TimerSystem,
  resetTimerSystem,
  LevelSystem,
  CarLifecycleSystem,
  resetCarLifecycleSystem,
} from './src/systems';
import { 
  COLORS, 
  INITIAL_SCORE, 
  LEVEL_TIME_LIMIT, 
  LEVEL_TARGET_CARS,
  LEVEL_TARGET_SCORE,
  GAME_STATE,
} from './src/config/constants';
import Score from './src/components/Score';
import Timer from './src/components/Timer';
import GameStatus from './src/components/GameStatus';
import RestartButton from './src/components/RestartButton';
import GameRules from './src/components/GameRules';

export default function App() {
  const gameEngineRef = useRef(null);
  const panResponder = useRef(createTouchSystem()).current;
  const [score, setScore] = useState(INITIAL_SCORE);
  const [gameState, setGameState] = useState(GAME_STATE.PLAYING);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [carsEaten, setCarsEaten] = useState(0);
  const [entities, setEntities] = useState(null);
  const [gameKey, setGameKey] = useState(0); // Key to force GameEngine remount

  /**
   * Initialize game on mount
   */
  useEffect(() => {
    initializeGame();
  }, []);

  /**
   * Check for win condition when score changes
   */
  useEffect(() => {
    if (gameState === GAME_STATE.PLAYING && score >= LEVEL_TARGET_SCORE) {
      // Player won - reached target score!
      setGameState(GAME_STATE.WIN);
      // Update entity game states
      if (gameEngineRef.current) {
        const currentEntities = gameEngineRef.current.state.entities;
        if (currentEntities.timer) {
          currentEntities.timer.gameState = GAME_STATE.WIN;
        }
        if (currentEntities.levelTracker) {
          currentEntities.levelTracker.gameState = GAME_STATE.WIN;
        }
      }
    }
  }, [score, gameState]);

  /**
   * Initialize or reset the game
   */
  const initializeGame = () => {
    // Initialize physics engine
    initPhysics();
    
    // Reset timer system
    resetTimerSystem();
    
    // Reset car lifecycle system
    resetCarLifecycleSystem();
    
    // Setup base entities
    const baseEntities = setupEntities();
    
    // Add timer entity
    const timerEntity = {
      timer: {
        timeElapsed: 0,
        timeLimit: LEVEL_TIME_LIMIT,
        gameState: GAME_STATE.PLAYING,
      }
    };
    
    // Add level tracker entity
    const levelTrackerEntity = {
      levelTracker: {
        targetCars: LEVEL_TARGET_CARS,
        carsEaten: 0,
        gameState: GAME_STATE.PLAYING,
      }
    };
    
    // Combine all entities
    const allEntities = {
      ...baseEntities,
      ...timerEntity,
      ...levelTrackerEntity,
    };
    
    setEntities(allEntities);
    setGameState(GAME_STATE.PLAYING);
    setTimeRemaining(0);
    setCarsEaten(0);
    setScore(INITIAL_SCORE);
  };

  /**
   * Handle touch move events
   */
  const handleTouchMove = (e) => {
    // Don't handle touch if game is over
    if (gameState !== GAME_STATE.PLAYING) {
      return;
    }
    
    const touch = e.nativeEvent.touches[0];
    if (touch && gameEngineRef.current) {
      gameEngineRef.current.dispatch({
        type: 'move',
        pageX: touch.pageX,
        pageY: touch.pageY,
      });
    }
  };

  /**
   * Handle touch start events
   */
  const handleTouchStart = (e) => {
    // Don't handle touch if game is over
    if (gameState !== GAME_STATE.PLAYING) {
      return;
    }
    
    const touch = e.nativeEvent.touches[0];
    if (touch && gameEngineRef.current) {
      gameEngineRef.current.dispatch({
        type: 'move',
        pageX: touch.pageX,
        pageY: touch.pageY,
      });
    }
  };

  /**
   * Handle game events
   */
  const handleEvent = (e) => {
    switch (e.type) {
      case 'score-update':
        setScore(prevScore => prevScore + e.points);
        setCarsEaten(prevCount => prevCount + e.carsEaten);
        break;
        
      case 'timerTick':
        setTimeRemaining(e.timeElapsed);
        break;
        
      case 'timeUp':
        // Game over - time ran out
        setGameState(GAME_STATE.LOSE);
        // Update entity game states
        if (gameEngineRef.current) {
          const currentEntities = gameEngineRef.current.state.entities;
          if (currentEntities.timer) {
            currentEntities.timer.gameState = GAME_STATE.LOSE;
          }
          if (currentEntities.levelTracker) {
            currentEntities.levelTracker.gameState = GAME_STATE.LOSE;
          }
        }
        break;
        
      case 'levelComplete':
        // Player won - ate all cars!
        setGameState(GAME_STATE.WIN);
        setCarsEaten(e.carsEaten);
        // Update entity game states
        if (gameEngineRef.current) {
          const currentEntities = gameEngineRef.current.state.entities;
          if (currentEntities.timer) {
            currentEntities.timer.gameState = GAME_STATE.WIN;
          }
          if (currentEntities.levelTracker) {
            currentEntities.levelTracker.gameState = GAME_STATE.WIN;
          }
        }
        break;
        
      default:
        break;
    }
  };

  /**
   * Restart the game
   */
  const handleRestart = () => {
    // Increment key to force GameEngine remount
    setGameKey(prevKey => prevKey + 1);
    
    // Reinitialize game state
    initializeGame();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Score score={score} />
      <Timer timeRemaining={timeRemaining} timeLimit={LEVEL_TIME_LIMIT} />
      <GameRules visible={gameState === GAME_STATE.PLAYING} />
      <GameStatus 
        gameState={gameState} 
        score={score} 
        carsEaten={carsEaten}
        onRestart={handleRestart}
      />
      <RestartButton 
        gameState={gameState} 
        onPress={handleRestart} 
      />
      <View
        style={styles.gameContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        {...panResponder.panHandlers}
      >
        {entities && (
          <GameEngine
            key={gameKey}
            ref={gameEngineRef}
            style={styles.gameEngine}
            systems={[TouchHandler, PhysicsSystem, TimerSystem, LevelSystem, CarLifecycleSystem, CollisionSystem, gameLoop]}
            entities={entities}
            onEvent={handleEvent}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gameEngine: {
    flex: 1,
  },
});
