import React from 'react'
import Square from '../Square/Square'

import './Board.css'

export default function Board(props) {

  const boardStyle = {
    display: "grid",
    gridTemplate: `repeat(${props.height},1fr)/repeat(${props.width},1fr)`
  };
  return (
    <div style={boardStyle}>
      {props.squares.map((square, i) => {
        return <Square
          key={i}
          clickHandler={() => { props.clickHandler(i) }}
          value={square}
          isWinLine={props.winLine.includes(i) ? true : false}
        />
      })}
    </div>
  )
}
