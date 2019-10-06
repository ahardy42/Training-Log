import React from 'react';
import colorFuncs from 'utils/colorFuncs';
import './Stats.sass';
import { Doughnut, Bar } from 'react-chartjs-2';
import moment from 'moment';
import { tr } from 'date-fns/esm/locale';

const Stats = (props) => {
    // turn trainingStats into a useful data object
    let dStats = props.userTraining;
    let bStats = props.yearStats;
    let labels = dStats.map(stats => stats._id);
    let barLabels = bStats.map(stats => {
        return moment(`${stats._id.month}/01/2019`).format("MMM");
    });
    let barDatasetData = bStats.map(stats => (stats.total/60).toFixed(1));
    let datasetData = dStats.map(stats => (stats.total/60).toFixed(1));
    let backgroundColor = dStats.map(stats => colorFuncs.statsColor(stats));
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
            label: "",
            data: barDatasetData,
            backgroundColor: "rgba(27, 81, 45, .75)"
        }]
    }
    const dLegend = {
        labels: { boxWidth: 10 },
        position: "left"
    }
    const bOptions = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {display: false}
            }],
            yAxes: [{
                gridLines: {display: false},
                scaleLabel: {display: true, labelString: "hours"},
                ticks: {beginAtZero: true}
            }]
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col card no-shadow mb-2 doughnut-card">
                    <div className="card-body">
                        <h5 className="card-title text-center">This Month's Activity Breakdown</h5>
                        <div id="doughnut">
                            <Doughnut
                                data={data}
                                legend={dLegend}
                                redraw={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col card  no-shadow bar-card">
                    <div className="card-body">
                    <h5 className="card-title text-center">This Year by Month</h5>
                        <div id="bar">
                            <Bar
                                data={bData}
                                options={bOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;