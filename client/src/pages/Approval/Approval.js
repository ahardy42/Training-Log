import React, {useState, useEffect} from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';

const Approval = ({match}) => {
    const [coach, setCoach] = useState("");
    useEffect(() => {
        let {key} = match.params;
        if (key) {
            fetch("/email/coach-approval/" + key)
            .then(response => {
                return response.json();
            })
            .then(returnedCoach => {
                setCoach(returnedCoach);
            })
            .catch(err => console.log(err));
        }
    }, [match.params]);
    return (
        <div className="row">
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">New coach: {coach.firstName} {coach.lastName} Approved!</h3>
                        <p className="card-text">An email has been sent to the approved coach</p>
                        <Link to="/">Head Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Approval;