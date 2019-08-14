import React from 'react';
import Button from '../Button/Button';
import moment from 'moment';
import { Pie } from 'react-chartjs-2';

const AthleteList = ({athlete, handleClick}) => {
        let pieData = athlete.mode.map(element => element.totalDuration);
        let labels = athlete.mode.map(element => element.mode);
        let backgroundColor = athlete.mode.map(element => {
            switch (element.mode) {
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
        let data = {
            labels: labels,
            datasets: [{
                data: pieData,
                backgroundColor: backgroundColor
            }]
        }
    return (
        <li className="list-group-item">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-3">
                            <h5 className="card-title">Athlete: {athlete.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Training to date: {moment.duration(athlete.totalTime, "minutes").humanize()}</h6>
                            <Button action="button" handleClick={() => {handleClick(athlete.athleteId)}}>Details</Button>
                        </div>
                        <div className="col-9">
                            <Pie data={data}/>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default AthleteList;