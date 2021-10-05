import React, { useState } from 'react'
import Board from '../Board/Board';

import './Game.css'

export default function Game() {
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [squares, setSquares] = useState(Array);
  const [xIsNext, setXIsNext] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   setSquares(Array(width * height).fill(null));
  // }, [height, width])

  const submitSizeBoard = (e) => {
    e.preventDefault();
    setSquares(Array(width * height).fill(null));
    setXIsNext(true);
    setIsPlaying(true);
  }

  const settingSizeHandler = () => {
    setIsPlaying(false);
    setSquares([]);
  }

  const calcWinner1 = (squares, width, height) => {
    let i = 0;
    let j = 1;
    while (i < width * height) {
      if (squares[i] && squares[i] === squares[i + 1] && squares[i] === squares[i + 2] && squares[i] === squares[i + 3] && squares[i] === squares[i + 4]) {
        return [i, i + 1, i + 2, i + 3, i + 4];
      } else {
        if (Number(width) * j - i === 5) {
          i = width * j;
          j++;
        }
        else {
          i++;
        }
      }
    }
    return null;
  }

  const calcWinner2 = (squares, width, height) => {
    let i = 0;
    while (i < width * (height - 4)) {
      if (squares[i] &&
        squares[i] === squares[i + Number(width)] &&
        squares[i] === squares[i + Number(width) * 2] &&
        squares[i] === squares[i + Number(width) * 3] &&
        squares[i] === squares[i + Number(width) * 4]
      ) {
        return [i, i + Number(width), i + Number(width) * 2, i + Number(width) * 3, i + Number(width) * 4];
      }
      else {
        i++;
      }
    }
    return null;
  }

  const calcWinner3 = (squares, width, height) => {
    let i = 0;
    let j = 1;
    while (i < width * (height - 4)) {
      if (squares[i] &&
        squares[i] === squares[i + Number(width) * 1 + 1] &&
        squares[i] === squares[i + Number(width) * 2 + 2] &&
        squares[i] === squares[i + Number(width) * 3 + 3] &&
        squares[i] === squares[i + Number(width) * 4 + 4]
      ) {
        return [i, i + Number(width) * 1 + 1, i + Number(width) * 2 + 2, i + Number(width) * 3 + 3, i + Number(width) * 4 + 4]
      }
      else {
        if (Number(width) * j - i === 5) {
          i = width * j;
          j++;
        }
        else {
          i++;
        }
      }
    }
    return null;
  }

  const calcWinner4 = (squares, width, height) => {
    let i = 4;
    let j = 1;
    while (i < width * (height - 4)) {
      if (squares[i] &&
        squares[i] === squares[i + Number(width) * 1 - 1] &&
        squares[i] === squares[i + Number(width) * 2 - 2] &&
        squares[i] === squares[i + Number(width) * 3 - 3] &&
        squares[i] === squares[i + Number(width) * 4 - 4]
      ) {
        return [i, i + Number(width) * 1 - 1, i + Number(width) * 2 - 2, i + Number(width) * 3 - 3, i + Number(width) * 4 - 4];
      }
      else {
        if (i % Number(width) === 0) {
          i = width * j + 4;
          j++;
        }
        else {
          i++;
        }
      }
    }
    return null;
  }

  const calcDraw = (squares, winLine1, winLine2, winLine3, winLine4) => {
    if (!squares.includes(null) && squares.length !== 0 && !winLine1 && !winLine2 && !winLine3 && !winLine4) {
      return true;
    }
    else return false;
  }

  const winLine1 = calcWinner1(squares, width, height);
  const winLine2 = calcWinner2(squares, width, height);
  const winLine3 = calcWinner3(squares, width, height);
  const winLine4 = calcWinner4(squares, width, height);
  const isDraw = calcDraw(squares, winLine1, winLine2, winLine3, winLine4);

  const clickHandler = (i) => {
    const current = squares;

    if (winLine1 || winLine2 || winLine3 || winLine4 || squares[i]) {
      winLine1 && console.log(winLine1);
      winLine2 && console.log(winLine2);
      winLine3 && console.log(winLine3);
      winLine4 && console.log(winLine4);
      return;
    }

    if (isDraw) {
      return;
    }
    current[i] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    setSquares(current);
  }

  const playAgainHanlder = () => {
    setSquares(Array(width * height).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game">
      <div className="game-info">
        <h1>Caro</h1>
        <form className="game-setting" onSubmit={submitSizeBoard}>
          <h3>Setting</h3>
          <div>
            <label htmlFor="width">Width: </label>
            <input
              id="width"
              type="number"
              min={5}
              value={width}
              onChange={(e) => { setWidth(e.target.value) }}
              disabled={isPlaying}
            ></input>
          </div>
          <div>
            <label htmlFor="height">Height: </label>
            <input
              id="height"
              type="number"
              min={5}
              value={height}
              onChange={e => { setHeight(e.target.value) }}
              disabled={isPlaying}
            ></input>
          </div>
          <div className="setting-actions">
            <button
              type="submit"
              disabled={isPlaying}
            > OK</button>
            <button
              disabled={!isPlaying}
              onClick={settingSizeHandler}
            >Setting</button>
          </div>

        </form>
        <div className="game-alert">
          <div className="game-alert-next">
            Next is {xIsNext ? 'X' : 'O'}
          </div>
          {winLine1 && <h2>{squares[winLine1[0]]} won</h2>}
          {winLine2 && <h2>{squares[winLine2[0]]} won</h2>}
          {winLine3 && <h2>{squares[winLine3[0]]} won</h2>}
          {winLine4 && <h2>{squares[winLine4[0]]} won</h2>}
          {isDraw && <h2>Draw</h2>}
          {(winLine1 || winLine2 || winLine3 || winLine4 || isDraw) &&
            <button onClick={playAgainHanlder}>Play again</button>
          }
        </div>
      </div>
      <div className="game-board" style={{ display: "flex" }}>
        <Board
          width={width}
          height={height}
          squares={squares}
          clickHandler={clickHandler}
          winLine={winLine1 ? winLine1 : winLine2 ? winLine2 : winLine3 ? winLine3 : winLine4 ? winLine4 : []}
        />
      </div>

    </div>
  )
}
