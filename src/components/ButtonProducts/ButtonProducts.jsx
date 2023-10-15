import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../constants';
import './ButtonProducts.scss';

function ButtonProducts() {
  const targetDivRef = useRef()
  const scrollToDiv = () => {
      targetDivRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='app__button-products'>
        <Link onClick={scrollToDiv} to='/prodotti'>
            <img src={images.buttonproducts} alt='buttonproducts'></img>
            <h2>I nostri prodotti</h2>
        </Link>
    </div>
  )
}

export default ButtonProducts