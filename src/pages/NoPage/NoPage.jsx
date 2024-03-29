import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { DividerLine, ImageSlider } from '../../components';
import './NoPage.scss';

function NoPage() {
  const [counter, setCounter] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter-1), 1000);
    if (timer <= 0) navigate('/');
    return () => {
      clearInterval(timer);
    };
  }, [counter, navigate]);

  return (
    <div>
      <ImageSlider />
      <div className='app__nopage app__container'>
        <h1>Errore 404!</h1>
        <DividerLine />
        <p>La risorsa richiesta non è stata trovata</p>
        <button><Link to='/'>Vai alla Homepage</Link></button>
      </div>
    </div>
  )
}

export default NoPage