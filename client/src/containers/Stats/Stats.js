import React from 'react';
import colorFuncs from '../../utils/colorFuncs';
import { Doughnut } from 'react-chartjs-2';

const Stats = (props) => {
    // turn trainingStats into a useful data object
    let stats = props.userTraining;
    let labels = stats.map(stats => stats._id);
    let datasetData = stats.map(stats => stats.total);
    let backgroundColor = stats.map(stats => {
        switch (stats._id) {
            case "rollerski":
                return "#62eb13";
            case "run":
                return "#ebdd13";
            case "bike":
                return "#141fe3";
            case "ski":
                return "#39660b";
            case "swim":
                return "#e012be";
            default:
                return "#0baab5";
        }
    });
    const data = {
        labels: labels,
        datasets: [{
            data: datasetData,
            backgroundColor: backgroundColor
        }]
    };
    const legend = {
        labels: {boxWidth: 25},
        position: "right"
    }
    return (
        <div id="stats">
            <Doughnut
                data={data}
                legend={legend}
                redraw={true}
            />
        </div>
    );
}

export default Stats;