import './Game.css';
import { useEffect, useRef } from 'react';

const Canvas = (props) => {

    const myGrid = props.grid;
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

            row.forEach(cell => {

                let xIncrement = canvasWidth / 22;
                x+=xIncrement;
                let num = parseInt(cell)

                if (num == 1) {
                ctx.moveTo(20, 20);
                ctx.beginPath();
                ctx.fillStyle = `rgba(255,192,203,1)`;
                ctx.arc(x, y, canvasWidth / 50, 0, 2 * Math.PI);
                ctx.fill();
                } else {
                    // ctx.moveTo(20, 20);
                    // ctx.beginPath();
                    // ctx.fillStyle = `rgba(216,237,255,0.05)`;
                    // ctx.arc(x, y, 100, 0, 2 * Math.PI);
                    // ctx.fill();
                }
            
                console.log('draw function')
            })

            })   
    }





    useEffect(() => { // On mount: Create canvas context, get canvas width and set height to same value.

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')

        canvasWidth = canvasRef.current.offsetWidth;
        canvasHeight = canvasWidth;

        ctx.canvas.height = canvasHeight;

        console.log(window.innerHeight)

        draw(ctx);
    }, [draw]) //execute once on initial mount
   
    



    return (
        <canvas id="myCanvas" ref={canvasRef}></canvas>
    )
}



export default Canvas;