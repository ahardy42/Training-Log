import React from 'react';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import Day from '../../components/Calendar/Day';
import TrainingForm from '../../containers/TrainingModal/TrainingForm';
import './Main.sass'


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {},
            testUser: {
                username: "grumpy",
                password: "password"
            },
            splitActivities: [
                [
                    {activityType: "run", _id: "run"},
                    {activityType: "ski", _id: "ski"},
                    {activityType: "rollerski", _id: "rollerski"}
                ],
                [
                    {activityType: "bike", _id: "bike"},
                    {activityType: "swim", _id: "swim"},
                    {activityType: "other", _id: "other"}
                ]
            ]
        }
    }
    loginTest = () => {
        this.props.login(this.state.testUser);
    }
    render() {
        let {message} = this.state;
        return (
            <div className="container">
                {message.messageType ? (
                    <div class={`alert alert-${message.messageType === "error" ? "danger" : "success"}`} role="alert">
                        {message.message}
                    </div>
                ) : (
                    null
                ) }
                <div className="row mb-2">
                    <div className="col">
                        <h3 className="text-center card-title">Welcome to Stoked On Training!</h3>
                        <br></br>
                        <h4 className="text-center">What it is</h4>
                        <br></br>
                        <p className="text-justified">
                            <strong>Stoked on Training</strong> is an introductory training log app that is intended to teach middle school / early high school aged kids to keep track of their training. The intention is for you to use this to keep track of how your workouts affect your performance, <strong>AND</strong>, to generate good log keeping habits for your future athletic career.
                        </p>
                        <br></br>
                        <h4 className="text-center">First, and most important!!!</h4>
                        <br></br>
                        <p className="text-justified">
                            Make sure you have your parents’ permission to sign up and use this app. If they have any questions, they can email me at aohardy@gmail.com
                        </p>
                        <br></br>
                        <h4 className="text-center">How it works</h4>
                        <h5 className="text-center"><Button action="button" extraClasses="btn-link" handleClick={this.loginTest}>(click to see a working example!)</Button></h5>
                        <br></br>
                        <p className="text-justified">
                            When you create an account, you are providing some important information to help this site work...
                        </p>
                        <br></br>
                        <p className="text-justified">
                            First, your <em>username</em> and <em>password</em> are used to keep track of your training, and to ensure that nobody but <strong>YOU</strong> or your coach (more on that later) can modify your training entries.
                        </p>
                        <br></br>
                        <p className="text-justified">
                            Your first and last name are used mainly for your coach to keep track of whose training they are looking at, and your email (or your parent’s email) is used only to allow you to reset your password if you forget it.
                        </p>
                        <br></br>
                        <p className="text-justified">
                            When you select a team from the drop-down menu you are allowing approved coaches from that team to view your training. What are approved coaches? They are manually approved by the head coach of each program. This ensures that all coaches are safesport certified, and are actually members of that team’s coaching staff. If you don’t want a coach to be able to view your training, just select “unattached” from the menu on signup.
                        </p>
                        <br></br>
                        <p className="text-justified">
                            When you have signed up, you will see a calendar (initially empty) which displays your training by month. There are charts to show you how your monthly activity breakdown looks (are you doing enough rollerskiing??), and to show you the monthly hours you have trained since the beginning of the year.
                        </p>
                        <br></br>
                        <div className="row mb-3 justify-content-center">
                            <div className="card col-lg-6 col-sm-12">
                                <div className="card-body d-flex-column">
                                    <h4 className="text-center">When you add training, the form looks like this</h4>
                                    <br></br>
                                    <div className="intro-form-wrap">
                                        <TrainingForm 
                                            handleInputChange={(e) => console.log(e.target)}
                                            state={{date: new Date(), comment: "", intensity: 3, duration: 45, feeling: 4, mode: "run", splitActivities: this.state.splitActivities}}
                                            handleChange={(e) => console.log(e.target)}
                                            handleCheck={(e) => console.log(e.target)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="card col-6 offset-3">
                                <div className="card-body">
                                    <h4 className="text-center">And the end result looks something like this</h4>
                                    <br></br>
                                    <div className="intro-day-wrap">
                                        <Day 
                                            handleClick={(e) => console.log(e.target)}
                                            day={4} 
                                            isToday={true} 
                                            training={[{_id: "", comment: "", mode: "run", intensity: 3, duration: 45, feeling: 4}]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-justified mt-2">
                            The calendar day is colored by activity, and there is a stripe at the bottom that shows you how hard you went (on a scale of 1-5). The emoji is a way to see, at a glance, how you felt during the workout. Use these pictures to track how your training makes you feel as the month goes on!
                        </p>
                        <br></br>
                        <p className="text-justified">
                            This is one of the great benefits of keeping a training log. When you do something that works, you can see it, you can also repeat it! When you work too hard for too long, or don’t train enough, you can see how it affects your performance as time goes on.
                        </p>
                        <br></br>
                        <p className="text-justified">
                            Now... get outside and have fun training!
                        </p>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-4 offset-4">
                        <div className="card">
                            <div className="card-body d-flex justify-content-around">
                                <Link to="/login">
                                    <Button action="button">Log In!</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button action="button">Sign Up!</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );  
    }
    
}

export default Main;