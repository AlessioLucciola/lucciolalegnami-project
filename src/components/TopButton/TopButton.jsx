import React, { useState, useEffect } from 'react';

import { IconContext } from 'react-icons';
import { HiArrowUp } from 'react-icons/hi';
import './TopButton.scss';

function TopButton() {
  const [button, setButton ] = useState(false);

  const buttonHandler = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  useEffect(() => {
    document.addEventListener("scroll", function () {
      if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        setButton(true);
      } else {
        setButton(false);
      }
    });
  });

  return (
    <> 
      <div className='app__topbutton'>
        { button && (<button onClick={buttonHandler}>
          <IconContext.Provider  value={{ size: '27px' }}>
            <HiArrowUp />
          </IconContext.Provider>
        </button>)}
      </div>
    </>
  )
}

export default TopButton