import React from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../constants';
import './ButtonProducts.scss';

function ButtonProducts() {
  return (
    <div className='app__button-products'>
        <Link to='/prodotti'>
            <img src={images.buttonproducts} alt='buttonproducts'></img>
            <h2>I nostri prodotti</h2>
        </Link>
    </div>
  )
}

export default ButtonProducts