import React from 'react';

import './Popup.scss';

const Popup = (props) => {
  return (props.trigger) ? (
    <div className='app__popup-shade'>
      <div className='app__popup-inner'>
        <div className='app__popup-title'>
            {props.title}
        </div>
        <div className='app__popup-description'>
          {props.description.split('<br/>').map((str, index) => <p key={index}>{str}</p>)}
        </div>
        {props.children}
        <div className='app__popup-button'>
          <button type='button' className='p-text' onClick={props.onClick}>Chiudi</button>
        </div>
      </div>
    </div>
  ) : '';
}

export default Popup
