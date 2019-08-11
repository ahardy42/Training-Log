import React from 'react';
import AthleteList from '../../components/Training/AthleteList';
import API from '../../utils/API';


class Coach extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            athletes: []
        }
    }
    getDetails = () => {
        // handler to get more information about an athlete. 
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
            <ul className="list-group">
                {this.state.athletes.map(athlete => {
                    return <AthleteList key={athlete._id} athlete={athlete} handleClick={this.getDetails}/>
                })}
            </ul>
        );
    }
}

export default Coach;