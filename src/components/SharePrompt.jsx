import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    TelegramIcon,
  } from 'react-share';

export const SharePrompt = ({setShowSharePrompt, showSharePrompt, url = "https://games.tld.com", title='Play games on TLD games!'}) => {
  return (
    <div className="sharePromtDiv">
        <div className="sharePrompt" style={showSharePrompt?{animation: 'sharePromptUp 0.3s', bottom:'20px'}:{}}>
          <button onClick={()=>{setShowSharePrompt(false); document.body.style.overflow = "";}} className="sharePromptcloseBtn"><i class="fa-solid fa-xmark"></i></button>
          <p className="sharePromptText">Share this game !</p>
          <div className="shareButtons">
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={48} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={48} round />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>
          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={48} round />
          </TelegramShareButton>
        </div>
        </div>
      </div>
  )
}
