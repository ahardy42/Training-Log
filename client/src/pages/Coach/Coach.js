import React from 'react';
import AthleteList from '../../components/Training/AthleteList';
import API from '../../utils/API';
import CalendarModal from '../../containers/CalendarModal/CalendarModal';


class Coach extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            athletes: [],
            modalStyle: {display: "none"},
            selectedAthleteId: ""
        }
    }
    openCalendarModal = id => {
        // handler to open the calendar modal on the page
        this.setState({
            modalStyle: {display: "block"},
            selectedAthleteId: id
        });
    }
    closeCalendarModal = () => {
        this.setState({
            modalStyle: {display: "none"},
            selectedAthleteId: ""
        });
    }
    componentDidMount = () => {
        let year = new Date().getFullYear();
        API.findAthletes(year)
        .then(teamArray => {
            this.setState({
                athletes: teamArray
            });
        });
    }
    render = () => {
        return(
            <div className="container mt-4">
                <CalendarModal
                    style={this.state.modalStyle}
                    athleteId={this.state.athleteId}
                />
                <div className="row">
                    <div className="col">
                        <ul className="list-group">
                            {this.state.athletes.map(athlete => {
                                return <AthleteList key={athlete._id} athlete={athlete} handleClick={this.openCalendarModal}/>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Coach;