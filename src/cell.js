import React from "react";
import './Game.css';

const Cell = (props) => {
    
    
    return (
        <button 
        onClick={props.onClick}
        className={props.value === 0 ? 'red': 'green'}
        >{props.value}</button>
    )
}


export default Cell;