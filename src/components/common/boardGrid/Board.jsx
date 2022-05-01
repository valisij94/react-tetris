import React from 'react'
import '../../common/boardStyles.css'

import BoardGrid from './BoardGrid'

// Universal block which can be used for "next block" and "game field" areas.

export default function Board( {width, height, state} ) {

    const composeBoard = () => {
        let rowsArray = [];
        for (let i = 0; i < height; i++) {
            let columnsArray = [];
            for (let j = 0; j < width; j++) {
                columnsArray.push(<BoardGrid key={'item'+i+j} color={state[i][j]} /> );
            }
            let rowsContainer = (
                <div className='tetris-block-row' key={'row'+i}>
                    {columnsArray}
                </div>
            );
            rowsArray.push(rowsContainer);
        }
        return rowsArray;
    }

    return (
        <div className='tetris-block-container'>
            {
                composeBoard()
            }
        </div>
    );
}