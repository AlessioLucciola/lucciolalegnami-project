import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import './Navbar.scss'

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [dropbarMenu, setDropbarMenu] = useState(false);

  const handleMenuOnClick = (e) => {
    e.stopPropagation();
    setToggle((prevState) => !prevState);
  }

  const openDropbarMenu = () => {
    setDropbarMenu(true);
  }

  const closeDropbarMenu = () => {
    setDropbarMenu(false);
  }

  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <Link to='/'><img src={images.logo} alt='logo'/></Link>
      </div>
      <ul className='app__navbar-links'>
        <li className='app__flex p-text' key='l-Homepage'>
          <Link to='/'>Homepage</Link>
        </li>
        <li className={`app__flex p-text ${dropbarMenu ? 'page-active' : ''}`} key='l-ElencoProdotti' onMouseEnter={() => openDropbarMenu()} onMouseLeave={() => closeDropbarMenu()}>
          <Link to='/prodotti'>Elenco Prodotti ▼</Link>
        </li>
        <li className='app__flex p-text' key='l-LegnoUtilizzato'>
          <Link to='/legnoutilizzato'>Il Legno Utilizzato</Link>
        </li>
        <li className='app__flex p-text' key='l-Contatti'>
          <Link to='/contatti'>Contatti</Link>
        </li>
        <li className='app__flex p-text' key='l-Preventivo'>
          <button><Link to='/preventivo'>Richiedi un preventivo</Link></button>
        </li>
      </ul>

      {dropbarMenu && (
        <div className='app__navbar-dropbar-menu' onMouseEnter={() => openDropbarMenu()} onMouseLeave={() => closeDropbarMenu()}>
          <ul className='app__navbar-dropbar-links'>
            <li className='app__flex p-text' key='Recinzioni'>
              <a href='/'>Pali Per Recizioni</a>
            </li>
            <li className='app__flex p-text' key='Staccionate'>
              <a href='/'>Pali Per Staccionate</a>
            </li>
            <li className='app__flex p-text' key='Filagne'>
              <a href='/'>Filagne</a>
            </li>
            <li className='app__flex p-text' key='Cancelli'>
              <a href='/'>Cancelli Rustici e Maremmani</a>
            </li>
            <li className='app__flex p-text' key='Animali'>
              <a href='/'>Pali Per Contenimento Animali</a>
            </li>
            <li className='app__flex p-text' key='Vivaio'>
              <a href='/'>Pali Uso Vivaio</a>
            </li>
            <li className='app__flex p-text' key='Viminate'>
              <a href='/'>Viminate</a>
            </li>
            <li className='app__flex p-text' key='Legna'>
              <a href='/'>Legna Da Ardere</a>
            </li>
          </ul>
        </div>
      )}

      <div className='app__navbar-menu'>
        <HiMenuAlt4 onClick={(e) => handleMenuOnClick(e)}/>

        {toggle && (
          <motion.div initial={{ width: 0 }} animate={{ width: 300 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
            <motion.span initial={{ width: 0 }} animate={{ width: 70 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
              <HiX onClick={(e) => handleMenuOnClick(e)} />
            </motion.span>

            <ul className='app__navbar-links'>
              <li className='app__flex p-text' key={'lm-Homepage'}>
                <Link to='/'>Homepage</Link>
              </li>
              <li className='app__flex p-text' key='lm-ElencoProdotti'>
                <Link to='/prodotti'>Elenco Prodotti ▼</Link>
              </li>
              <li className='app__flex p-text' key='lm-LegnoUtilizzato'>
                <Link to='/legnoutilizzato'>Il Legno Utilizzato</Link>
              </li>
              <li className='app__flex p-text' key='lm-Contatti'>
                <Link to='/contatti'>Contatti</Link>
              </li>
              <li className='app__flex p-text' key='lm-Preventivo'>
                <button><Link to='/preventivo'>Richiedi un preventivo</Link></button>
              </li>
            </ul>
          </motion.div>
        )}
      </div>

      
    </nav>
    
  )
}

export default Navbar