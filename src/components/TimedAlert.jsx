import React, { useState, useEffect } from 'react';
import './TimedAlert.css';

export const TimedAlert = ({color= 'red', text}) => {
    const time = 2; // Duration in seconds
    const [progress, setProgress] = useState(0); // Initial progress

    useEffect(() => {
        const intervalTime = 10; 
        const decrement = 100 / (time * 1000 / intervalTime); 
        setProgress(100);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - decrement;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [time]);

    return (
        <div className="ta" style={{top: progress===0 || progress === 100?'-100px':'10px'}}>
            <div className="ta-content">
                {text}
            </div>
            <div 
                className="ta-timer"
                style={{ width: `${progress}%` ,backgroundColor: color}}
                
            ></div>
        </div>
    );
};
