import nock from 'nock';

// set up the mock http responses
const scope = nock('http://localhost:3000'); // main url for request mocks

// ==========================================================================================
// athlete route mock responses 
// ==========================================================================================

// display training in the calendar intially
scope.get("/api/athlete/training/:year/:month") // 2019/09 params
    .reply(200, {
        "_id": "5d806277b1004c4f7223d4cb",
        "training": [
            {
                "createdAt": new Date().toTimeString(), // always today
                "date": new Date().toTimeString(), // always today
                "_id": "5d806297b1004c4f7223d4cc",
                "duration": 60,
                "mode": "ski",
                "intensity": 3,
                "feeling": 3,
                "comment": ""
            }
        ]
    });

// display information in the charts
scope.get("/api/athlete/stats/:year/:month") // 2019/09 params
    .reply(200, [
        {
            "_id": "ski",
            "total": 60
        }
    ]);

// display information in the charts
scope.get("/api/athlete/chart-stats/:year") // 2019 params
    .reply(200, [
        {
            "_id": {
                "month": new Date().getMonth()
            },
            "total": 60
        }
    ]);

// add training route mock
scope.post("/api/athlete/training", {
    duration: 50,
    mode: "ski",
    intensity: 4,
    feeling: 4,
    comment: "hey!"
}).reply(200, [
    {
        "createdAt": new Date().toTimeString(), // always today
        "date": new Date().toTimeString(), // always today
        "_id": "5d806297b1004c4f7223d4cc",
        "duration": 60,
        "mode": "ski",
        "intensity": 3,
        "feeling": 3,
        "comment": ""
    },
    {
        "createdAt": new Date().toTimeString(), // always today
        "date": new Date().toTimeString(), // always today
        "_id": "5d9bced3eeca4222933503cc",
        "duration": 50,
        "mode": "ski",
        "intensity": 4,
        "feeling": 4,
        "comment": "hey!"
    }
]);

// edit training mock route
scope.put("/api/athlete/training/:trainingId", {
    duration: 60,
    feeling: 3
}).reply(200, [
    {
        "createdAt": new Date().toTimeString(), // always today
        "date": new Date().toTimeString(), // always today
        "_id": "5d806297b1004c4f7223d4cc",
        "duration": 60,
        "mode": "ski",
        "intensity": 3,
        "feeling": 3,
        "comment": ""
    },
    {
        "createdAt": new Date().toTimeString(), // always today
        "date": new Date().toTimeString(), // always today
        "_id": "5d9bced3eeca4222933503cc",
        "duration": 50,
        "mode": "ski",
        "intensity": 4,
        "feeling": 4,
        "comment": "hey!"
    }
]);

// delete training mock route
scope.delete("/api/athlete/training/:trainingId")
.reply(200, [
    {
        "createdAt": new Date().toTimeString(), // always today
        "date": new Date().toTimeString(), // always today
        "_id": "5d806297b1004c4f7223d4cc",
        "duration": 60,
        "mode": "ski",
        "intensity": 3,
        "feeling": 3,
        "comment": ""
    }
]);


export default {
    getTraining: async (year, month) => {
        let date;
        if (month) {
            date = `${year}/${month}`;
        } else {
            date = year;
        }
        let response = await fetch(`/api/athlete/training/${date}`);
        return response;
    },
    getTrainingStats: async (year, month) => {
        let date;
        if (month) {
            date = `${year}/${month}`;
        } else {
            date = year;
        }
        let response = await fetch(`/api/athlete/stats/${date}`);
        return response;
    },
    getYearStats: async year => {
        let response = await fetch(`/api/athlete/chart-stats/${year}`);
        let yearStats = await response.json();
        return yearStats;
    },
    addTraining: async training => {
        let response = await fetch("/api/athlete/training", {
            method: "POST",
            body: JSON.stringify(training),
            headers: {"content-type" : "application/json"}
        });
        let newTraining = await response.json();
        return newTraining;
    },
    editTraining: async (training, id) => {
        let response = await fetch(`/api/athlete/training/${id}`, {
            method: "PUT",
            body: JSON.stringify(training),
            headers: {"content-type" : "application/json"}
        });
        let updatedTraining = await response.json();
        return updatedTraining;
    },
    deleteTraining: async id => {
        let response = await fetch(`/api/athlete/training/${id}`, {
            method: "DELETE"
        });
        let updatedTraining = response.json();
        return updatedTraining;
    },
    findAthletes: async year => {
        let response = await fetch(`/api/coach/team/activity/${year}`);
        let teamArray = await response.json();
        return teamArray;
    },
    specificAthleteTraining: async (year, month, id) => {
        let date;
        if (month) {
            date = `${year}/${month}`;
        } else {
            date = year;
        }
        console.log(`/api/coach/${id}/${date}`);
        let response = await fetch(`/api/coach/${id}/${date}`);
        let trainingArray = await response.json();
        return trainingArray.training; // training is an array even when you only return training...
    },
    addComment: async (athleteId, trainingId, comment) => {
        // route for coach to add a comment to an athlete's training
        let response = await fetch(`/api/coach/${athleteId}/${trainingId}`,{
            method: "PUT",
            body: JSON.stringify(comment),
            headers: {"content-type" : "application/json"}
        });
        let trainingArray = await response.json();
        return trainingArray;
    },
    getUsersForReset: async email => {
        let response = await fetch(`/auth/reset`, {
            method: "POST",
            body: JSON.stringify(email),
            headers: {"content-type" : "application/json"}
        });
        let userArray = await response.json();
        return userArray;
    },
    getKeyForReset: async id => {
        let response = await fetch(`/email/reset-password`, {
            method: "POST",
            body: JSON.stringify(id),
            headers: {"content-type" : "application/json"}
        });
        let message = await response.json();
        return message;
    },
    showUserForReset: async key => {
        let response = await fetch(`/auth/reset-password/${key}`);
        let user = await response.json();
        return user;
    },
    submitResetPassword: async (password, key) => {
        let response = await fetch(`/email/reset-password/${key}`, {
            method: "POST",
            body: JSON.stringify(password),
            headers: {"content-type" : "application/json"}
        });
        let message = await response.json();
        return message;
    },
    getTeamSpecificInfo: async team => {
        // find the athlete's team in the team DB collection and use it to populate the page with relevant info
        let response = await fetch(`/api/team/${team}`);
        let teamObject = await response.json();
        return teamObject;
    },
    checkUserName: async username => {
        let response = await fetch(`/auth/username-check/${username}`);
        let user = await response.json();
        return user; // {exists : boolean}
    },
    signupUser: async userInfoObject => {
        let response = await fetch("/auth/signup", {
            method: "POST",
            body: JSON.stringify(userInfoObject),
            headers: {"content-type" : "application/json"}
        });
        let user = await response.json();
        return user;
    },
    approveCoach: async key => {
        let response = await fetch(`../../email/coach-approval/${key}`);
        let returnedCoach = await response.json();
        return returnedCoach;
    },
    denyCoach: async key => {
        let response = await fetch(`../../email/coach-deny/${key}`);
        let returnedCoach = await response.json();
        return returnedCoach;
    }
}