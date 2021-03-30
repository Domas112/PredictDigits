const body = document.querySelector('body')
const rects = []
const canvSize = 600;
const rectCount = 28;
const rectSize = canvSize/rectCount;

const doTheFetching = async (rects) => {
    let vals = rects.map((el)=>el.val)
    
    let ans = await fetch('http://127.0.0.1:8000',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'digit': vals})
        })
        .then(res=>res.json())
        .catch(err=>console.log(err))
    
    results = document.querySelector('#results')
    results.innerHTML = ''
    ans[0].map((an,i)=>{
        results.innerHTML += `<p> ${i} - ${an} </p>  `
    })
}

function setup(){
    createCanvas(canvSize,canvSize)
    
    document.querySelector('#defaultCanvas0').addEventListener('mouseup',()=>{
        doTheFetching(rects)
    })
    
    frameRate(30)
    
    for(let i = 0 ; i < rectCount ; i++){
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
    
    button = document.createElement('button')
    button.addEventListener('click',()=>{
        rects.map(el=>{
            el.val = 0
        })
        doTheFetching(rects)
    })

    button.setAttribute('id','clearButton')
    button.innerHTML = 'Clear'
    body.appendChild(button)

    resDiv = document.createElement('div')
    resDiv.setAttribute('id','results')
    body.appendChild(resDiv)

}
function draw(){
    background(240)
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

}
