import React, {useEffect} from 'react'

export const Wrapper = ({gameID, fullScreen, setFullScreen}) => {

  return (
    <div className={fullScreen?'wrapperFull':''} style={{ height: "100%", width: "100%" }}>
        {fullScreen&&<div className="leftFull"></div>}
            {fullScreen && <button onClick={()=>{ setFullScreen(!fullScreen)}} className='fullScreenBtn'><i className="fa-solid fa-compress"></i></button>}
    <iframe className='iframeInWrapper' title={'wrapper'} style={{borderTopLeftRadius: fullScreen?'':'20px',borderTopRightRadius: fullScreen?'':'20px', width: !fullScreen ? '100% ':''}} src={`${process.env.REACT_APP_API_URL}/play/${gameID}`} frameBorder="0"></iframe>
    
    {fullScreen&&
    <div className="downFull"></div>}
    {fullScreen&&<div className="rightFull"></div>}
    </div>
  )
}
