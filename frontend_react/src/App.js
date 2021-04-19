import './App.css';
import CanvasDrawingBoard from './components/CanvasDrawingBoard';
import React from 'react'
import PredictionChart from './components/PredictionChart';
import dummyData from './components/dummyData';

class App extends React.Component {
    constructor(){
        super()
        this.state = {
          digitPrediction: dummyData,
        }
    }

    doTheFetching = async (pixels) => {
        
      const fetchResult = await fetch('http://127.0.0.1:8000/',{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify({'digit': pixels})
          })
          .then(res=>res.json())
          .catch(err=>console.log(err))

        const newDigitPrediction = this.state.digitPrediction.map((el, index)=>{
          el.probability = fetchResult[0][index]
          return el
        })
        
        this.setState({
          digitPrediction: newDigitPrediction
        })

  }

  

  render(){
    return (
      <div className="App">
          
          <CanvasDrawingBoard digitPrediction={this.state.digitPrediction} doTheFetching={this.doTheFetching} />          
          <div className='App-child'>
            <PredictionChart digitPrediction={this.state.digitPrediction}/>
          </div>
      </div>
    );
  }
}

export default App;
