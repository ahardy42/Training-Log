import React from 'react';
import Button from '../../components/Button/Button';
import CalendarDiv from '../../containers/CalendarDiv/CalendarDiv';
import Stats from '../../components/Stats/Stats';

class Athlete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleButton: "Graph",
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    {/* buttons to toggle view / add training */}
                    <div className="col justify-content-center">
                        <Button action="button">{this.state.toggleButton}</Button>
                        <Button action="button">Add Training</Button>
                    </div>
                </div>
                <div className="row">
                    {/* calendar and stats */}
                    <div className="col-7">
                        <CalendarDiv userTraining={this.props.athlete.training}/>
                    </div>
                    <div className="col-5">
                        <Stats userTraining={this.props.athlete.training}/>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Athlete;