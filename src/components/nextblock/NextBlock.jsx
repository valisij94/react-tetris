import React from 'react'
import './nextblock.css'
import '../common/boardStyles.css'

import Board from '../common/boardGrid/Board';
import { getShapeByIndexes } from '../common/Shapes';
import { useSelector } from 'react-redux';

// Represents a part of the screen (left), which contains an area with the next tetris block (which would be added)

export default function NextBlock( {setNextBlock, nextBlockIndex} ) {

  const shapeIndex = useSelector(state => state.game.nextShape.shapeIndex);
  const shapeRotation = useSelector(state => state.game.nextShape.shapeRotation);
  const shapeColor = useSelector(state => state.game.nextShape.color);

  const blockState = getShapeByIndexes(shapeIndex, shapeRotation, shapeColor);

  return (
    <div className="next-block-wrapper">
      <Board width={4} height={4} state={blockState} />
    </div>
  );
}