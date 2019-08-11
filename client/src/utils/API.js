const API = {
    getTraining: async (year, month) => {
        let date;
        if (month) {
            date = `${year}/${month}`;
        } else {
            date = year;
        }
        let response = await fetch(`/api/training/${date}`);
        let training = await response.json();
        return training.training ? training.training : null; // training is an array even when you only return training...
    },
    getTrainingStats: async (year, month) => {
        let date;
        if (month) {
            date = `${year}/${month}`;
        } else {
            date = year;
        }
        let response = await fetch(`/api/stats/${date}`);
        let stats = await response.json();
        console.log(stats);
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
    findAthletes: async year => {
        let response = await fetch(`/api/athletes/${year}`);
        let teamArray = response.json();
        return teamArray;
    },
    addComment: async (id, comment) => {
        // 
    }
}

export default API;