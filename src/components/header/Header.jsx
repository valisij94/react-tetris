import React from 'react'
import './header.css'

// Represents a header of the game

export default function GameHeader({headerText}) {
  return (
    <div className="header">
      <p>{headerText}</p>
    </div>
  );
}