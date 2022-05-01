import React from 'react'

import './gameboard.css'

import GameField from '../gamefield/GameField';
import NextBlock from '../nextblock/NextBlock';
import ScoreBlock from '../score/ScoreBlock';
import MessagePopup from '../messagePopup/MessagePopup';

// Represents a gameboard (next block div, game board div and score div)

export default function GameBoard() {

  return (
    <div className='game-board'>
        <NextBlock />
        <GameField />
        <ScoreBlock />
        <MessagePopup />
    </div>
  );
}