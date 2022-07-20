import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

import { images } from '../../constants';
import './ImageSlider.scss';

function ImageSlider() {
  const allSlideItems = [
    { name: 'slide1', imgName: 'slide1', caption: '' },
    { name: 'slide2', imgName: 'slide2', caption: '' },
    { name: 'slide3', imgName: 'slide3', caption: '' }
  ]

  const getImgPath = (item) => {
    return images[item];
  }

  const checkCaption = (text) => {
    if (text !== '') return true
    else return false;
  }

  return (
    <div className='app__imageslider'>
      <Carousel>
        {allSlideItems.map((item, index) => (
          <Carousel.Item key={index+1}>
            <img className="d-block w-100" src={getImgPath(item.imgName)} alt={`slide${index+1}`}/>
            <Carousel.Caption>
              {checkCaption(item.caption) && ( 
                  <div className='app__imageslider-caption'>{`${item.caption}`}</div>
              )}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider