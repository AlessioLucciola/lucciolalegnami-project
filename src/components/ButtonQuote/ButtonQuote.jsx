import React from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../constants';
import './ButtonQuote.scss';

function ButtonQuote() {
  return (
    <div className='app__button-quote'>
        <Link to='/preventivo'>
            <img src={images.buttonquote} alt='buttonquote'></img>
            <h2>Richiedi un Preventivo</h2>
        </Link>
    </div>
  )
}

export default ButtonQuote