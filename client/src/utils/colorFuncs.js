import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSmile, faGrinAlt, faTired, faMeh, faSadCry } from '@fortawesome/free-solid-svg-icons';

const colorFuncs = {
    intensityColor: training => {
        if (training.length) {
            let totalIntensity = 0;
            let avgIntensity = 0;
            let len = training.length;
            for (let i = 0; i < len; i++) {
                totalIntensity += training[i].intensity;
            }
            avgIntensity = Math.round(totalIntensity / len);
            let color = avgIntensity < 30 ? "yellow" :
                avgIntensity < 50 ? "green" :
                    avgIntensity < 80 ? "orange" : "red";
            return color;
        } else {
            return "transparent";
        }
    },
    feelingColor: training => {
        if (training.length) {
            let totalFeeling = 0;
            let avgFeeling = 0;
            let len = training.length;
            for (let i = 0; i < len; i++) {
                totalFeeling += training[i].feeling;
            }
            avgFeeling = Math.round(totalFeeling / len);
            let color = avgFeeling < 30 ? "red" :
                avgFeeling < 50 ? "orange" :
                avgFeeling < 80 ? "yellow" : "green";
            return color;
        } else {
            return "transparent";
        }
    },
    trainingColor: training => {

    }
}

export default colorFuncs;