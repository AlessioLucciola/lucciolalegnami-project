import React from 'react';

import { BsFacebook, BsTwitter, BsGoogle, BsInstagram, BsYoutube } from 'react-icons/bs'
import './Footer.scss';

function Footer() {
  return (
    <div className='app__footer'>
        <div className='app__footer-main'>
            Seguici sui social per rimanere aggiornato

            <div className='app__footer-social'>
                <a href="https://github.com/AlessioLucciola" target="_blank"><BsFacebook /></a>
                <a href="https://github.com/AlessioLucciola" target="_blank"><BsInstagram /></a>
                <a href="https://github.com/AlessioLucciola" target="_blank"><BsTwitter /></a>
                <a href="https://github.com/AlessioLucciola" target="_blank"><BsYoutube /></a>
                <a href="https://github.com/AlessioLucciola" target="_blank"><BsGoogle /></a>
            </div>
        </div>
    </div>
  )
}

export default Footer