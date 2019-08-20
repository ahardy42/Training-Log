import React from 'react';
import colorFuncs from '../../utils/colorFuncs';
import { Doughnut, Bar } from 'react-chartjs-2';
import moment from 'moment';

const Stats = (props) => {
    // turn trainingStats into a useful data object
    let dStats = props.userTraining;
    let bStats = props.yearStats;
    let labels = dStats.map(stats => stats._id);
    let barLabels = bStats.map(stats => {
        return moment(`${stats._id.month}/01/2019`).format("MMM");
    });
    let barDatasetData = bStats.map(stats => stats.total);
    let datasetData = dStats.map(stats => stats.total);
    let backgroundColor = dStats.map(stats => {
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
    const bData = {
        labels: barLabels,
        datasets: [{
            data: barDatasetData,
            backgroundColor: "blue"
        }]
    }
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
            <Bar 
                data={bData}
            />
        </div>
    );
}

export default Stats;