import React from 'react';
import { Link } from 'react-router-dom';

import { BsFacebook, BsTwitter, BsGoogle, BsInstagram, BsYoutube, BsWhatsapp, BsTelephone, BsGithub, BsLockFill } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import './Footer.scss';

function Footer() {
  return (
    <div className='app__footer'>
      <div className='app__footer-main'>
        Seguici sui social per rimanere aggiornato

        <div className='app__footer-social'>
            <a href='https://www.facebook.com/pages/Lucciola-Legnami-Azienda-Boschiva/130220746994961' target="_blank" rel="noreferrer"><BsFacebook /></a>
            <a href='https://www.instagram.com/lucciolalegnami' target="_blank" rel="noreferrer"><BsInstagram /></a>
            <a href='https://twitter.com/LucciolaLegnami' target="_blank" rel="noreferrer"><BsTwitter /></a>
            <a href='https://www.youtube.com/channel/UCSRzPZcaeu24uDJJbG1XTAg' target="_blank" rel="noreferrer"><BsYoutube /></a>
            <a href='https://g.page/LucciolaLegnami' target="_blank" rel="noreferrer"><BsGoogle /></a>
        </div>
      
        <div className='app__footer-grid'>
          <div className='app__footer-useful-links'>
            <strong>COLLEGAMENTI UTILI</strong>
            <li>
              <Link to='/prodotti/cancelli'>Cancelli Maremmani</Link>
            </li>
            <li>
              <Link to='/prodotti/recinzioni'>Pali per Recinzioni</Link>
            </li>
            <li>
              <Link to='/prodotti/sostegnopiante'>Sostegno Piante</Link>
            </li>
            <li>
              <Link to='/prodotti/staccionate'>Staccionate</Link>
            </li>
            <li>
              <Link to='/prodotti/legnadaardere'>Legna da Ardere</Link>
            </li>
          </div>
          <div className='app__footer-useful-info'>
            <strong>LUCCIOLA LEGNAMI</strong>
            <li>
              Via Cassia Km. 53,200 Capranica (VT)
            </li>
            <li>
              <a href='https://g.page/LucciolaLegnami'><GoLocation/> Trovaci su Google</a>
            </li>
            <li>
              <a href={`tel:${process.env.REACT_APP_PHONE_NUMBER}`}><BsTelephone /> (+39) {process.env.REACT_APP_PHONE_NUMBER}</a>
            </li>
            <li>
              <a href={`https://wa.me/39${process.env.REACT_APP_PHONE_NUMBER}`}><BsWhatsapp /> Contattaci su WhatsApp</a>
            </li>
            <li>
              Partita IVA: 00788050565
            </li>
          </div>
        </div>
      </div>

      <div className='app__footer-end'>
        <li>
          © 2022 Copyright Lucciola Legnami
        </li>
        <li>
          <BsGithub /> Sito web creato da <a href='https://github.com/AlessioLucciola' target="_blank" rel="noreferrer">Alessio Lucciola</a>
        </li>
        <li>
          <BsLockFill />Cookie Policy
        </li>
      </div>
    </div>
  )
}

export default Footer