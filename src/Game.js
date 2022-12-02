import React from 'react';
//import Grid from './Grid';
import Canvas from './Canvas';
import './Game.css';
import { useState, useEffect } from 'react';
import colourLogo from './circle.svg';


const randomLife = () => {
    return ((Math.random() > 0.5) ? 1 : 0)
}


let initialGrid = () => {

    let newGrid = new Array(20);
    for (let i = 0; i < 20; i++) {
        newGrid[i] = new Array(20).fill(0);
        for (let a = 0; a < 20; a++) {
            newGrid[i][a] = randomLife();
        }
    }
    return newGrid;
}


const Game = () => {

    const [grid, setGrid] = useState(initialGrid);
    const [genCount, setGenCount] = useState(0); 
    const [isActive, setIsActive] = useState(false);
    const [colour, setColour] = useState("rgba(255,192,203,1)")
    const [gameSpeed, setGameSpeed] = useState(100)

    const stop = () => {
        setIsActive(false);
        clearTimeout(interval);
    }

    const play = () => {
        console.log('play set to true')
        setIsActive(true);
    }

    let interval = null;

    useEffect(() => {
        if (isActive) {
            interval = setTimeout(function play() {
                update(nextGen(grid,20,20));
                setGenCount(genCount + 1);
                console.log('interval called')
            }, gameSpeed);
            return () => {
                clearTimeout(interval);
            }
        } else {
            clearTimeout(interval);
            console.log('null interval')
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

                        if ((a + c >= 0 && a + c < m) && (b + d >= 0 && b + d < n)) {
                            living += grid[a + c][b + d];
                        }
                    }
                }

                living -= grid[a][b];

                //Rules of Life
                //Death - no neighbours:
                if ((grid[a][b] === 1) && (living < 2)) {
                    //console.log('death at', a,',',b);
                    newGrid[a][b] = 0;

                }   
                //Death from overpopulation:
                else if ((grid[a][b] === 1) && (living > 3)) {
                    //console.log('death from overpopulation')
                    newGrid[a][b] = 0;
                } 
                //Birth:
                else if ((grid[a][b] === 0) && (living === 3)) {
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
    }

    const update = (updatedGrid) => {
        setGrid(updatedGrid);
    }

    const nextGenButton = (updatedGrid) => {
        if (isActive) {
            return;
        } else {
            setGrid(updatedGrid);
        }
    }

    const toggleColour = (i) => {
        console.log(i.target);

        let target = i.target.className;
        console.log(target)

        switch(target) {
            case 'pink':
                setColour('rgba(254,191,220,1)');
                console.log('working')
                break;
            case 'blue':
                setColour('rgba(156,255,255,1)')
                break;
            case 'green':
                setColour('rgba(193,255,193,1')
                break;
            case 'yellow':
                setColour('rgba(255,255,153,1')
                break;
            case 'black':
                setColour('rgba(0,0,0,1')
                break;
            case 'white':
                setColour('rgba(255,255,255,1)')
                break;
            default:
                //
        } 
    }

    const changeSpeed = (e) => {
        console.log(e.target.value);
        setGameSpeed(200 / e.target.value)
    }


    const randomGrid = () => {
        clearTimeout(interval);

        //setIsActive(false);
        setGenCount(0);
        setGrid(initialGrid)
    }

    return (
            <div className='test'>
                <div className='control-panel'>
                    <h1> Conway's Game of Life</h1>            
                    <p className='subheading'>Generation: {genCount}</p>
                    <div class="control-panel-buttons">
                        <button onClick={play}> Play </button>
                        <button onClick={stop}> Stop </button>
                        <button className='next-gen' onClick={() => nextGenButton(nextGen(grid,20,20))}>
                        Next Generation 
                        </button> 
                        <button onClick={randomGrid}>
                            Reset
                        </button>

                        <ul onClick={toggleColour} className="select-colour"> <p>Colour</p>
                            <li><img className="pink" src={colourLogo} alt="colour picker button pink" data-rgba="rgba(254,191,220,1)"></img></li>
                            <li><img className="blue" src={colourLogo} alt="colour picker button blue" data-rgba="rgba(254,191,220,1)"></img></li>
                            <li><img className="green" src={colourLogo} alt="colour picker button green"></img></li>
                            <li><img className="yellow" src={colourLogo} alt="colour picker button yellow"></img></li>
                            <li><img className="black" src={colourLogo} alt="colour picker button black"></img></li>
                            <li><img className="white" src={colourLogo} alt="colour picker button white"></img></li>
                        </ul>

                        <label for="speed">Game Speed</label>
                        <input type="range" id="speed" name="speed" min="1" max="8" defaultValue="2" onChange={e => changeSpeed(e)}></input>
                    </div>
                    <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'> Learn more about Conway's Game of Life</a>
                </div>
                <Canvas grid={grid} colour={colour}/>
            </div>
    )
};

export default Game;


