import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import '../../App.css'
import './button.css'

// Represents a button

export default function Button( { buttonText, clickHandler, width, allowedAlways = false } ) {
  const { isRunning, gameOver } = useSelector( state => state.game );

  return (
    <button disabled={allowedAlways ? !allowedAlways : (gameOver || !isRunning)} className='control-button' onClick={clickHandler} style={{ width: width}} >{buttonText}</button>
  );
}