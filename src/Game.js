import React from 'react';
import Grid from './Grid';
import './Game.css';
import { useState, useEffect, useRef } from 'react';


const randomLife = () => {
    return ((Math.random() > 0.5) ? 1 : 0)
}

// const cloverleafGrid = [
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0],
//     [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
//     [0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,1,0,1,1,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,1,1,0,1,0,1,1,0,0,0,0,0,0,0,0],
//     [0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0],
//     [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
//     [0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// ];


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
            }, 100);
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
        console.log('updating grid...')
        setGrid(updatedGrid);
    }

    const nextGenButton = (updatedGrid) => {
        if (isActive) {
            console.log('next gen should be disabled...')
            return;
        } else {
            console.log('why is this firing')
            setGrid(updatedGrid);
        }
    }


    // Allow user to click cells to bring them to life. Would need to grab cell position(?)

    const editGrid = (e) => {
        const cellValue = window.event.target.textContent; //val but no knowledge of 'where' cell is. 
        console.log(cellValue); 
    }
    

    const rowEdit = (e) => {
        console.log(e.target.id);
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
                    </div>
                    <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'> Learn more about Conway's Game of Life</a>
                </div>
                <Grid grid={grid} handleInput={editGrid} rowEdit={rowEdit}/>
            </div>
    )
};

export default Game;


