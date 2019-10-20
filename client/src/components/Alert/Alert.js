import React from 'react';
import './Alert.sass';

const Alert = ({messageType, children}) => {
    return(
        <div className={`alert ${messageType === "Success" ? "alert-success" : "alert-danger"}`}>
            {children}
        </div>
    );
}

export default Alert;