import React from 'react'
import './boardGrid.css'
import '../../../App.css'
// Represents a grid square with a color

export default function BoardGrid( { color = 0 } ) {
  const classes = `grid-square color-${color}`
  return <div className={classes} />
}