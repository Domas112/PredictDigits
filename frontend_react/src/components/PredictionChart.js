import {Component} from "react"
import {BarChart, XAxis, Bar, YAxis} from "recharts"

export default class PredictionChart extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <BarChart width={300} height={200} data={this.props.digitPrediction}>
                <XAxis datakey="name" />
                <Bar dataKey="probability" fill="#8884d8" />
            </BarChart>
        )

    }
}