import React, { Component } from 'react';
import './App.css';
import ControlButton from './Components/ControlButton';
import GameArea, { GameState } from './Components/GameArea';
import GameStatus from './Components/GameStatus';
import MySound from './Components/MySound';

class App extends Component {
  render() {
    const gameStates = GameState;
    return (
      <div className="App">
        <GameArea gameState = {gameStates}/>
        <GameStatus gameState = {gameStates} />
        <ControlButton gameState = {gameStates} />
        <MySound gameState = {gameStates} />
      </div>
    );
  }
}

export default App;
