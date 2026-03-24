import React from 'react';
import './Loader.scss';

const Loader = ({ text = "Analyzing Mood..." }) => {
    return (
        <div className="loader-container">
            <div className="loader-glass">
                <div className="loader-orbit">
                    <div className="loader-planet"></div>
                </div>
                <div className="loader-text">{text}</div>
            </div>
        </div>
    );
};

export default Loader;
