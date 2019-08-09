const API = {
    getTraining: async (startTime, endTime) => {
        let response = await fetch(`/api/training/${startTime}/${endTime}`);
        let training = await response.json();
        return training;
    },
    getTrainingStats: async (startTime, endTime) => {
        let response = await fetch(`/api/stats/${startTime}/${endTime}`);
        let stats = await response.json();
        return stats;
    },
    addTraining: async training => {
        let response = await fetch("/api/training", {
            method: "POST",
            body: JSON.stringify(training),
            headers: {"content-type" : "application/json"}
        });
        let newTraining = await response.json();
        return newTraining;
    },
    editTraining: async (training, id) => {
        let response = await fetch(`/api/training/${id}`, {
            method: "PUT",
            body: JSON.stringify(training),
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
        let response = await fetch("/athletes");
        let teamArray = response.json();
        return teamArray;
    },
    addComment: async (id, comment) => {
        // 
    }
}

export default API;