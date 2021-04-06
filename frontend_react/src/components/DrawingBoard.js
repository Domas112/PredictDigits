import React from "react"
import p5 from "p5"


export default class DrawingBoard extends React.Component{
    constructor(){
        super()

        this.canvasParent = React.createRef();

        this.state = {
            canvSize:400,
            rectCount:28,
            rectSize:600/28,
            rects:[],
            x:[],

        }

    }

    handleClick(){
        this.state.x.push('testies')

        this.setState({
            x: [...this.state.x, 'testies']
        })
    }
    componentDidMount(){
    
        this.sketch = new p5(p=>{
            p.setup = ()=>{
                console.log(this.state.rectSize);
                // console.log(this.state.)
                p.createCanvas(this.state.canvSize,this.state.canvSize).parent(this.canvasParent.current);
                p.background(0);
                
                for(let i = 0 ; i < this.state.rectCount ; i++){
                    for (let j = 0; j < this.state.rectCount; j++) {
                        p.rect(j*this.state.rectSize,i*this.state.rectSize,this.state.rectSize)
                        // this.state.rects.push({
                        //     'x': j*this.state.rectSize, 
                        //     'y': i*this.state.rectSize, 
                        //     'size': this.state.rectSize, 
                        //     'val': 0
                        // });

                        this.setState({
                            rects: [...this.state.rects, {
                                'x': j*this.state.rectSize, 
                                'y': i*this.state.rectSize, 
                                'size': this.state.rectSize, 
                                'val': 0
                            }]
                        })
                    }
                }
                
                // p.noLoop()

            }

            p.draw = () =>{
                
                
                this.state.rects.forEach((el)=>{
                    
                    if(p.mouseIsPressed){
                        if((p.mouseX > el.x && p.mouseX < el.x+(this.state.canvSize/this.state.rectCount)) && (p.mouseY > el.y && p.mouseY < el.y+(this.state.canvSize/this.state.rectCount))){
                            
                            if(p.mouseButton === p.LEFT){
                                el.val = 255
                            }    
                            if(p.mouseButton === p.RIGHT){
                                el.val = 0 
                            }
                        }
                    }
                    
                    p.fill(el.val)
                    p.rect(el.x,el.y,el.size)
                    
                    
                })
            }
            
            
        })
                
    }


    render(){
        // if(this.sketch){
        //     this.sketch.redraw();
        // }
        console.log('render')

        return(
            <div >
                <div ref={this.canvasParent}></div>
                <button
                    onClick={this.handleClick.bind(this)}
                >do something</button>
            </div>
        )
        
    }
}
                
                /*for(let i = 0 ; i < rectCount ; i++){
                    for (let j = 0; j < rectCount; j++) {
                rect(j*rectSize,i*rectSize,rectSize)
                rects.push({
                    'x': j*rectSize, 
                    'y': i*rectSize, 
                    'size': rectSize, 
                    'val': 0
                })
            }
        }

        rects.map((el)=>{

        if(mouseIsPressed){
            if((mouseX > el.x && mouseX < el.x+(canvSize/rectCount)) && (mouseY > el.y && mouseY < el.y+(canvSize/rectCount))){
                if(mouseButton === LEFT){
                    el.val = 255
                }    
                if(mouseButton === RIGHT){
                    el.val = 0 
                }
            }
        }

        fill(el.val)
        rect(el.x,el.y,el.size)
    })
        */
    

    