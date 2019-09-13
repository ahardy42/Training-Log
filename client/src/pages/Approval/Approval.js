import React, {useState, useEffect} from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';

const Approval = ({match}) => {
    const [coach, setCoach] = useState("");
    useEffect(() => {
        let {key, response} = match.params;
        if (response === "approve") {
            API.approveCoach(key)
            .then(returnedCoach => setCoach(returnedCoach))
            .catch(err => console.log(err));
        } else if (response === "deny") {
            API.denyCoach(key)
            .then(returnedCoach => setCoach(returnedCoach))
            .catch(err => console.log(err));
        } else {
            return;
        }
    }, [match]);
    const returnResponse = responseType => {
        if (responseType === "approve") {
            return "approved"
        } else {
            return "denied"
        }
    }
    return (
        <div className="row">
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">New coach: {coach.firstName} {coach.lastName} {returnResponse(match.params.response)}!</h3>
                        <p className="card-text">An email has been sent to the {returnResponse(match.params.response)} coach, who has been {returnResponse(match.params.response)} as a coach for {coach.team}</p>
                        <Link to="/">Head Home</Link>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Approval;