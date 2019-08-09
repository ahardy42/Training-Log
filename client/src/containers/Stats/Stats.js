import React from 'react';
import {Doughnut} from 'react-chartjs-2';

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: []
                }]
            }
        }
    }
    componentDidMount() {
        // turn trainingStats into a useful data object
        let trainingArray = this.props.trainingStats;
        let labels = trainingArray.map(training => {
            return training.mode;
        });
        let data = trainingArray.map(training => training)
        this.setState({

        })
    }
    render() {
        return (
            <div id="stats">
                <Doughnut

                />
            </div>
        );
    }
}

export default Stats;