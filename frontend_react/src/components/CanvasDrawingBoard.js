import React from "react"

export default class CanvasDrawingBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isDrawing: false,
        }
    }

    canvasRef = React.createRef();
    contextRef = React.createRef();
    
    componentDidMount(){
        
        const canvas = this.canvasRef.current;
        canvas.style.border = 'solid black 1px';
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.background = 'black'

        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = 'white';
        context.lineWidth = 20;
        this.contextRef.current = context;

    }

    startDrawing({nativeEvent}){

        const {offsetX, offsetY} = nativeEvent;
        this.contextRef.current.beginPath();
        this.contextRef.current.moveTo(offsetX, offsetY);
        this.setState({
            isDrawing: true,
        })

    }

    finishDrawing(){

        this.contextRef.current.closePath();
        this.setState({
            isDrawing: false,
        })

        const imgData = this.contextRef.current.getImageData(0,0,400,400)
        const newData = imgData.data.filter((val, indx)=>{
            return (indx+1) % 4 === 0;
        })
        this.props.doTheFetching(newData);
    
    }

    draw({nativeEvent}){

        if(this.state.isDrawing){
            const {offsetX, offsetY} = nativeEvent;
            this.contextRef.current.lineTo(offsetX,offsetY);
            this.contextRef.current.stroke();
        }

    }

    clearCanvas(){
        this.contextRef.current.clearRect(0,0, this.canvasRef.current.width, this.canvasRef.current.height)
    }

    render(){
        return(
            <div className='canvas'>
                <canvas
                    onMouseDown={this.startDrawing.bind(this)}
                    onMouseUp={this.finishDrawing.bind(this)}
                    onMouseMove={this.draw.bind(this)}
                    ref={this.canvasRef}
                />
                <button onClick={this.clearCanvas.bind(this)}>Clear</button>
            </div>
        )
    }

}