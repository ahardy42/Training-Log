const API = {
    getTraining: async (startTime, endTime) => {
        let response = await fetch(`api/training/${startTime}/${endTime}`);
        let training = await response.json();
        return training;
    },
    addTraining: async training => {

    },
    editTraining: async training => {

    },
    deleteTraining: async id => {

    },
    findAthletes: async team => {

    },
    addComment: async (id, comment) => {

    }
}

export default API;