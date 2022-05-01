import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PAUSE, RESTART, RESUME } from '../../redux/actions';
import './scoreblock.css'
import Button from '../button/Button';

// Universal block which can be used for "next block" and "game field" areas.

export default function ScoreBlock() {

    const { score, gameOver, isRunning } = useSelector( state => state.game );
    const dispatch = useDispatch();

    return (
        <div className='score-block-container'>
            <p className='score-text-field'>{'Score: '+score}</p>
            <div className='score-buttons-container'>
              <Button allowedAlways={true} buttonText={isRunning ? 'Pause' : 'Start'} clickHandler={ () => { dispatch( {type: isRunning ? PAUSE : RESUME} ); } } />
              <Button allowedAlways={true} buttonText='Restart' width='auto' clickHandler={ () => { dispatch( {type: RESTART} ); } } />
            </div>
        </div>
    );
}