import './Game.css';
import Cell from './cell';
import { Fragment } from 'react';



const Grid = (props) => {

    const myGrid = props.grid;
    const edit = props.handleInput;



    const table = 
    <table className='grid'>
        <tbody>
            {myGrid.map((row => 
            <tr className='tr'>
                {row.map((element =>
                    <td className='td'>
                        <Fragment>
                            <Cell value={element} 
                            onClick={edit}
                            />
                        </Fragment>
                    </td>))}
            </tr>))}
        </tbody>
    </table>

    return (
        <Fragment>
            {table}
        </Fragment>
    )

}

export default Grid;