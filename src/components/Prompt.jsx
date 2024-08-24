import React from 'react';

export const Prompt = ({ handleInstallClick, handleClose }) => {
  return (
    <div className="installApp">
      <div className="installPrompt">
        <button className='prompt-close-btn' onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <p className='prompt-head'>Install our App for best experience!</p>
        <button className='prompt-intall-btn' onClick={handleInstallClick}>
          Install App
        </button>
      </div>
    </div>
  );
};
