import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSmile, faGrinAlt, faTired, faMeh, faSadCry } from '@fortawesome/free-solid-svg-icons';
import colorFuncs from '../../utils/colorFuncs';
import './Calendar.sass';

const TrainingInfo = ({training}) => {
    let intensityStyle = {
        backgroundImage: colorFuncs.gradientColorCss(colorFuncs.intensityColor(training), "right")
    };
    let avgFeeling = colorFuncs.avgVal(training, "feeling");
    return(
        <div className="day-training">
            <div className="day-intensity" style={intensityStyle}></div>
            <div className="day-feeling">
                {
                    avgFeeling < 20 ? <FontAwesomeIcon icon={faSadCry} size="2x" className="feeling-icon"/> :
                    avgFeeling < 40 ? <FontAwesomeIcon icon={faTired} size="2x" className="feeling-icon"/> :
                    avgFeeling < 60 ? <FontAwesomeIcon icon={faMeh} size="2x" className="feeling-icon"/> :
                    avgFeeling < 80 ? <FontAwesomeIcon icon={faSmile} size="2x" className="feeling-icon"/> : <FontAwesomeIcon icon={faGrinAlt} size="2x" className="feeling-icon"/>
                }
            </div>
        </div>
    );
}

export default TrainingInfo;