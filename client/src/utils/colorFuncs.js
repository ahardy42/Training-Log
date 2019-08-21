const colors = {
    red: "#b51010",
    orange: "#cf5804",
    yellow: "#eef202",
    green: "#2ad404"
}

const sports = {
    bike: "#165408",
    run: "#082d52",
    ski: "#a65703",
    rollerski: "#f08e26",
    swim: "#69e0c5",
    other: "#d90b04"
}

const colorFuncs = {
    intensityColor: function(training) {
        if (training.length) {
            let avgIntensity = this.avgVal(training, "intensity");
            let color = avgIntensity < 30 ? colors.green :
                avgIntensity < 50 ? colors.yellow :
                    avgIntensity < 80 ? colors.orange : colors.red;
            return color;
        } else {
            return "transparent";
        }
    },
    feelingColor: function(training) {
        if (training.length) {
            let avgFeeling = this.avgVal(training, "feeling");
            let color = avgFeeling < 30 ? colors.red :
                avgFeeling < 50 ? colors.orange :
                avgFeeling < 80 ? colors.yellow : colors.green;
            return color;
        } else {
            return "transparent";
        }
    },
    avgVal: function(array, string) {
        if (array.length) {
            let total = 0;
            let len = array.length;
            for (let i = 0; i < len; i++) {
                total += array[i][string];
            }
            let avg = (total / len).toFixed(1);
            return avg;
        }
    },
    trainingColor: function(training) {
        if (training.length) {
            let color = sports[training[0].mode];
            return color;
        } else {
            return "transparent";
        }
    },
    statsColor: function(statsElement) { // used in a map function to produce a new array
        let color = sports[statsElement._id];
        return color += "BF";
    },
    gradientColorCss: function(color, direction, endAt) { // supports hex colors only
        let gradient = `linear-gradient(${direction}, ${color}, ${color}00  ${endAt ? endAt : ""})`;
        return gradient;
    }
}

export default colorFuncs;