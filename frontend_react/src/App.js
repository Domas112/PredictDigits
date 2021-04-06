import './App.css';
import DrawingBoard from "./components/DrawingBoard"
import CanvasDrawingBoard from './components/CanvasDrawingBoard';
import React from 'react'

class App extends React.Component {
    constructor(){
        super()
        this.state = {
          digitPrediction:[],
        }
    }

    doTheFetching = async (pixels) => {
        
      let ans = await fetch('http://127.0.0.1:8000/test/',{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify({'digit': pixels})
          })
          .then(res=>res.json())
          .catch(err=>console.log(err))

      this.setState({
        digitPrediction: ans
      })
      console.log(this.state.digitPrediction[0]);
  
  }


  render(){
    return (
      <div className="App">
          <CanvasDrawingBoard digitPrediction={this.state.digitPrediction} doTheFetching={this.doTheFetching} />
          <div>
            <h2 className="results">
              {
                this.state.digitPrediction[0]?
                this.state.digitPrediction[0].map((el, i)=>{
                  return <p key={i}>---{i}:{el}---</p>
                }):''
              }
            </h2>
          </div>
      </div>
    );
  }
}

export default App;
