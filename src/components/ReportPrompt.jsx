import React from 'react'

export const ReportPrompt = ({setShowReportPrompt, showReportPrompt}) => {
    return (
        <div className="sharePromtDiv">
            <div className="sharePrompt" style={showReportPrompt?{animation: 'sharePromptUp 0.3s', bottom:'20px'}:{}}>
              <button onClick={()=>{setShowReportPrompt(false); document.body.style.overflow = "";}} className="sharePromptcloseBtn"><i class="fa-solid fa-xmark"></i></button>
              <p className="sharePromptText">Report this Game ?</p>
              <div className="report_btns">
                <button className='report_btn'>Yes</button>
                <button className='report_btn'>No</button>
              </div>


            </div>
          </div>
      )
}
