import React, { useEffect } from 'react';

export const Wrapper = ({ gameID, fullScreen, setFullScreen ,fullScreenDenied, setFullScreenDenied}) => {
  useEffect(() => {
    const iframe = document.querySelector('.iframeInWrapper');

    const updateIframeStyles = () => {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          { action: 'updateAdStyle', fullScreen },
          '*'
        );
      }
    };

    // Update iframe styles whenever `fullScreen` changes
    updateIframeStyles();
  }, [fullScreen]);

  return (
    <div style={{ height: '100%', width: '100%' ,borderTopLeftRadius: fullScreen?'0px':'20px',borderTopRightRadius: fullScreen?'0px':'20px', overflow:'hidden'}}>
      {fullScreen && (
        <button
          onClick={() => {if(fullScreenDenied){
            document.querySelector(".game").classList.remove('game-fullscreen-denied');
            document.body.style.overflow = "";
            setFullScreenDenied(false);
          }
          else if(document.exitFullscreen) {
            document.exitFullscreen();
          }
          setFullScreen(false);}}
          className="fullScreenBtn"
        >
          <i className="fa-solid fa-compress"></i>
        </button>
      )}
      <iframe
        className="iframeInWrapper"
        title="wrapper"
        src={`${process.env.REACT_APP_API_URL}/play/${gameID}`}
        frameBorder="0"
      ></iframe>
    </div>
  );
};
