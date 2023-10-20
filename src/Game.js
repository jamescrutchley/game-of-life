import React, { useContext } from "react";
import Canvas from "./Canvas";
import "./Game.css";
import { useState, useEffect } from "react";
import colourLogo from "./circle.svg";
import ThemeContext from "./Theme";

const randomLife = () => {
  return Math.random() > 0.5 ? 1 : 0;
};

let initialGrid = () => {
  let newGrid = new Array(20);
  for (let i = 0; i < 20; i++) {
    newGrid[i] = new Array(20).fill(0);
    for (let a = 0; a < 20; a++) {
      newGrid[i][a] = randomLife();
    }
  }
  return newGrid;
};

const Game = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const [grid, setGrid] = useState(initialGrid);
  const [genCount, setGenCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(100);

  const stop = () => {
    setIsActive(false);
    clearTimeout(interval);
  };

  const play = () => {
    setIsActive(true);
  };

  let interval = null;

  useEffect(() => {
    if (isActive) {
      interval = setTimeout(function play() {
        update(nextGen(grid, 20, 20));
        setGenCount(genCount + 1);
        console.log("interval called");
      }, gameSpeed);
      return () => {
        clearTimeout(interval);
      };
    } else {
      clearTimeout(interval);
    }
  });

  const nextGen = (grid, m, n) => {
    let newGrid = new Array(20);
    for (let i = 0; i < m; i++) {
      newGrid[i] = new Array(n).fill(0);
    }
    //loop thru
    for (let a = 0; a < m; a++) {
      for (let b = 0; b < n; b++) {
        //find living neighbours
        let living = 0;

        for (let c = -1; c < 2; c++) {
          for (let d = -1; d < 2; d++) {
            if (a + c >= 0 && a + c < m && b + d >= 0 && b + d < n) {
              living += grid[a + c][b + d];
            }
          }
        }

        living -= grid[a][b];

        //Rules of Life
        //Death - no neighbours:
        if (grid[a][b] === 1 && living < 2) {
          //console.log('death at', a,',',b);
          newGrid[a][b] = 0;
        }
        //Death from overpopulation:
        else if (grid[a][b] === 1 && living > 3) {
          //console.log('death from overpopulation')
          newGrid[a][b] = 0;
        }
        //Birth:
        else if (grid[a][b] === 0 && living === 3) {
          //console.log('new life born')
          newGrid[a][b] = 1;
        }
        //No change:
        else {
          newGrid[a][b] = grid[a][b];
        }
      }
    }
    setGenCount(genCount + 1);
    return newGrid;
  };

  const update = (updatedGrid) => {
    setGrid(updatedGrid);
  };

  const nextGenButton = (updatedGrid) => {
    if (isActive) {
      return;
    } else {
      setGrid(updatedGrid);
    }
  };

  const toggleColour = (i) => {
    if (i.target.classList[0] === "ul" || i.target.classList[0] === undefined) {
      return;
    }

    let target = i.target.classList[0];
    setTheme(target);
  };

  const changeSpeed = (e) => {
    setGameSpeed(200 / e.target.value);
  };

  const randomGrid = () => {
    clearTimeout(interval);

    //setIsActive(false);
    setGenCount(0);
    setGrid(initialGrid);
  };

  return (
    <div className="test">
      <header>
        {" "}
        <h1> Conway's Game of Life</h1>
      </header>
      <p className="subheading">Generation: {genCount}</p>
      <div className={`control-panel ${isActive ? "active" : "inactive"}`}>
        <div className="panel">
          <div className="control-panel-buttons">
            <div className="inner-buttons">
              <button className="control play" onClick={play}></button>
              <button className="control stop" onClick={stop}></button>
              <button
                className="control next"
                onClick={() => nextGenButton(nextGen(grid, 20, 20))}
              ></button>
              <button className="control reset" onClick={randomGrid}></button>
            </div>

            <label for="speed"> </label>
            <input
              type="range"
              id="speed"
              name="speed"
              min="1"
              max="8"
              defaultValue="2"
              onChange={(e) => changeSpeed(e)}
            ></input>
          </div>
        </div>

        {/* <ul onClick={toggleColour} className="ul select-colour"> <p>Colour</p>
                            <li><img className="pink select-colour-button" src={colourLogo} alt="colour picker button pink" data-rgba="rgba(254,191,220,1)"></img></li>
                            <li><img className="blue select-colour-button" src={colourLogo} alt="colour picker button blue" data-rgba="rgba(254,191,220,1)"></img></li>
                            <li><img className="green select-colour-button" src={colourLogo} alt="colour picker button green"></img></li>
                            <li><img className="yellow select-colour-button" src={colourLogo} alt="colour picker button yellow"></img></li>
                            <li><img className="white select-colour-button" src={colourLogo} alt="colour picker button white"></img></li>
                        </ul> */}


      </div>
      <footer>
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            {" "}
            Learn more about Conway's Game of Life
          </a>
        </footer>
      <Canvas className="canvas" grid={grid} colour={theme} />
    </div>
  );
};

export default Game;
