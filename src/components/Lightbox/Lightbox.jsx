import React from 'react';
import Lightbox from "react-awesome-lightbox";

import "react-awesome-lightbox/build/style.css";
import './Lightbox.scss';

const CustomLightbox = (props) => {
    return (props.trigger) ? (
      <div className='app__lightbox'>
        <Lightbox images={props.images} onClose={props.onClose}/>
      </div>
    ) : '';
}

export default CustomLightbox