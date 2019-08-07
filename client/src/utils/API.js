const API = {
    getTraining: async (startTime, endTime) => {
        let response = await fetch(`/api/training/${startTime}/${endTime}`);
        let training = await response.json();
        return training;
    },
    addTraining: async training => {
        let response = await fetch("/api/training", {
            method: "POST",
            body: training,
            headers: {"content-type" : "application/json"}
        });
        let newTraining = await response.json();
        return newTraining;
    },
    editTraining: async (training, id) => {
        let response = await fetch(`/api/training/${id}`, {
            method: "PUT",
            body: training,
            headers: {"content-type" : "application/json"}
        });
        let updatedTraining = await response.json();
        return updatedTraining;
    },
    deleteTraining: async id => {
        let response = await fetch(`/api/training/${id}`, {
            method: "DELETE"
        });
        let updatedTraining = response.json();
        return updatedTraining;
    },
    findAthletes: async team => {
        
    },
    addComment: async (id, comment) => {

    }
}

export default API;