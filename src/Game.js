import React from 'react';
import Grid from './Grid';
import './Game.css';
import { useState } from 'react';


let initialGrid = [
    [1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0],
    [1,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,1],
    [1,0,0,0,0,1,0,1,1,0,0,1,0,0,0,0,1,0,0,1],
    [0,0,0,0,1,1,0,1,1,0,1,1,0,0,1,1,1,0,0,0],
    [0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,0,0,0],
    [1,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0],
    [1,1,1,0,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
    [1,0,1,0,1,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0],
    [0,0,1,1,1,0,0,1,0,0,1,1,0,0,1,1,0,0,0,0],
    [0,0,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,1,0,1,0,0,1,0,1,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1],
    [0,0,1,1,0,0,0,1,0,0,1,0,0,1,1,0,0,0,0,0],
    [0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0],
    [0,0,1,0,1,0,0,1,1,0,1,0,1,1,0,0,0,1,1,0],
];



const Game = () => {

    const [grid, setGrid] = useState(initialGrid);


    const nextGen = (grid, m, n) => {


        console.log('start')

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

                //a /c   +  b / d 

                living -= grid[a][b];

                //Rules of Life
                //Death - no neighbours:
                if ((grid[a][b] === 1) && (living < 2)) {
                    console.log('death at', a,',',b);
                    newGrid[a][b] = 0;

                }   
                //Death from overpopulation:
                else if ((grid[a][b] === 1) && (living > 3)) {
                    console.log('death from overpopulation')
                    newGrid[a][b] = 0;
                } 
                //Birth:
                else if ((grid[a][b] === 0) && (living === 3)) {
                    console.log('new life born')
                    newGrid[a][b] = 1;
                }
                //No change:
                else {
                    newGrid[a][b] = grid[a][b];
                }
            }
        }
        console.log('the new grid is:', newGrid)
        return newGrid;
    }

    const update = (updatedGrid) => {
        console.log('updating grid...')
        setGrid(updatedGrid);
    }

    const editGrid = (e) => {
        const cellValue = window.event.target.textContent; //val but no knowledge of 'where' cell is. 
        console.log(cellValue); 
    }
    
    const rowEdit = (e) => {
        console.log(e.target.id);

    }


    return (
            <div className='test'>
                <div className='control-panel'>
                    <h1> Conway's Game of Life</h1>
                    <button className='next-gen' onClick={() => update(nextGen(grid,20,20))}>
                    Next Generation
                    </button>
                    <br />
                    <br />
                    <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'> Wikipedia Article</a>
                </div>
                <Grid grid={grid} handleInput={editGrid} rowEdit={rowEdit}/>
            </div>
    )
};

export default Game;

