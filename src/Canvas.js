import './Game.css';
import { useEffect, useRef } from 'react';

const Canvas = (props) => {

    function random(number) {
        return Math.floor(Math.random()*number);
      }

    
    let colourLookup = {
        'pink': 'rgba(254,191,220,1)',
        'blue': 'rgba(156,255,255,1)',
        'green': 'rgba(193,255,193,1',
        'yellow': 'rgba(255,255,153,1',
        'white': 'rgba(255,255,255,1)',
    };

    const myGrid = props.grid;
    let selectedColour = colourLookup[props.colour];
    const canvasRef = useRef(null);

    let canvasWidth;
    let canvasHeight;

    const draw = ctx => {

        let [x,y] = [0,0];
        ctx.clearRect(0,0,canvasWidth,canvasHeight);

        ctx.fillStyle = `rgba(216,237,255,0.05)`;
        ctx.arc(x, y, 100, 0, 2 * Math.PI);
        ctx.fill();

        myGrid.forEach(row => {
            

            let yIncrement = canvasHeight / 22;
            x = 10;
            y+= yIncrement;

            let opacityValue = (-1 * ((67*y*y) / 12000000) + ((551*y) / 120000) + 0.1);

            selectedColour = selectedColour.substr(0, 17) + opacityValue + ')'

            row.forEach(cell => {
                let xIncrement = canvasWidth / 22;
                x+=xIncrement;
                let num = parseInt(cell)


                if (num == 1) {
                ctx.moveTo(20, 20);
                ctx.beginPath();
                ctx.fillStyle = selectedColour;
                ctx.arc(x, y, (canvasHeight+canvasWidth)/ 70, 0, 2 * Math.PI);
                ctx.fill();
                } else {
                    // ctx.moveTo(20, 20);
                    // ctx.beginPath();
                    // ctx.fillStyle = `rgba(216,237,255,0.05)`;
                    // ctx.arc(x, y, 100, 0, 2 * Math.PI);
                    // ctx.fill();
                }
            
            })

            })   
    }





    useEffect(() => { // On mount: Create canvas context, get canvas width and set height to same value.

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')

        // canvasWidth = canvasRef.current.offsetWidth;
        // canvasHeight = canvasWidth;

        // ctx.canvas.height = canvasHeight;

        canvasWidth = window.innerWidth - 30;
        canvasHeight = window.innerHeight - 30;
        [ctx.canvas.height, ctx.canvas.width] = [canvasHeight, canvasWidth]

        draw(ctx);
    }, [draw]) //execute once on initial mount
   
    



    return (
        <canvas id="myCanvas" ref={canvasRef}></canvas>
    )
}



export default Canvas;



