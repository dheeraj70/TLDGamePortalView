import React from 'react';
import './Alert.css';

export const Alert = ({children, Close}) => {
  return (
    <div className="app-alert">
        
        <div className="alert-div">
            <button title='close' onClick={Close} className="alert-close-btn">
            <i class="fa-solid fa-xmark"></i>
            </button>
            {children}
        </div>
    </div>
  )
}
