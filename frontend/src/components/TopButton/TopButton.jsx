import React from 'react';

import { images } from '../../constants';

function TopButton() {
  return (
    <div className='app__top-button'>
        <img scr={images.arrowup} alt='top_button' />
    </div>
  )
}

export default TopButton