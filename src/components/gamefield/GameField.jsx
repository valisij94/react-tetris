import React, { useEffect, useState } from 'react'
import './gameField.css'
import '../common/boardStyles.css'
import Board from '../common/boardGrid/Board';
import Button from '../button/Button'
import { useDispatch, useSelector } from 'react-redux';
import { MOVE_DOWN, ROTATE, MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN_FAST } from '../../redux/actions';

// Block which represents the main game field

let intervalId = null;

export default function GameField() {

  const { grid, speed, isRunning, gameOver } = useSelector( state => state.game );
  const dispatch = useDispatch();

  /** Event handler for keyboard arrows */
  useEffect( () => {
    const listener = (e) => {
      if (e.keyCode == '38') {
        dispatch( {type: ROTATE} );
      }
      else if (e.keyCode == '40') {
        dispatch( {type: MOVE_DOWN_FAST} );
      }
      else if (e.keyCode == '37') {
        dispatch( {type: MOVE_LEFT} );
      }
      else if (e.keyCode == '39') {
        dispatch( {type: MOVE_RIGHT} );
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    }
  }, []);

  useEffect( () => {
    if (gameOver || !isRunning) {
      clearInterval(intervalId);
    }
    else
      intervalId = setInterval( () => {
        dispatch( {type: MOVE_DOWN} );
      }, speed);
    return () => {
      clearInterval(intervalId);
    }
  }, [speed, dispatch, isRunning, gameOver] )

  return (
    <div className="game-field-wrapper">
      <Board width={10} height={18} state={grid} />
      <div className='controls-block-container'>
        <Button buttonText='Left' clickHandler={ () => { dispatch( {type: MOVE_LEFT} ); } } />
        <Button buttonText='Right' clickHandler={ () => { dispatch( {type: MOVE_RIGHT} ); } }/>
        <Button buttonText='Rotate' clickHandler={ () => { dispatch( {type: ROTATE} ); } }/>
        <Button buttonText='Down' clickHandler={ () => { dispatch( {type: MOVE_DOWN_FAST} ); } }/>
      </div>
    </div>
  );
}