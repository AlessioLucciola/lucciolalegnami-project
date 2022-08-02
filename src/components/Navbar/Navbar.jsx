import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { Popup } from '../../components';
import { images } from '../../constants';
import './Navbar.scss'

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [dropbarMenu, setDropbarMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const [popup, setPopup] = useState({trigger: false, title: '', description: ''});

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

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = () => {
    axios.get('api/productCategory.php')
    .then(function(response) {
      if (response.status === 200) {
        const allProductsList = response.data.products;
        setProducts(allProductsList);
      } else {
        setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': response.data.message});
      }
    })
    .catch(function(error) {
      setPopup({'trigger': true, 'title': 'Si è verificato un errore!', 'description': 'Si è verificato un errore con il server. Ti preghiamo di riprovare più tardi.'});
    })
  }

  const closePopup = () => {
    setPopup({...popup, 'trigger': false});
  }

  return (
    <>
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
              {products ? (products.map((item, index) => (
                <li className='app__flex p-text' key={item.shortname}>
                  <Link to={`prodotti/${item.shortname}`}>{item.name}</Link>
                </li>
              ))) : ''}
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
                <li className='app__flex p-text' key={'lm-Homepage'} onClick={(e) => handleMenuOnClick(e)}>
                  <Link to='/'>Homepage</Link>
                </li>
                <li className='app__flex p-text' key='lm-ElencoProdotti' onClick={(e) => handleMenuOnClick(e)}>
                  <Link to='/prodotti'>Elenco Prodotti</Link>
                </li>
                <li className='app__flex p-text' key='lm-LegnoUtilizzato' onClick={(e) => handleMenuOnClick(e)}>
                  <Link to='/legnoutilizzato'>Il Legno Utilizzato</Link>
                </li>
                <li className='app__flex p-text' key='lm-Contatti' onClick={(e) => handleMenuOnClick(e)}>
                  <Link to='/contatti'>Contatti</Link>
                </li>
                <li className='app__flex p-text' key='lm-Preventivo' onClick={(e) => handleMenuOnClick(e)}>
                  <button><Link to='/preventivo'>Richiedi un preventivo</Link></button>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </nav>

      <Popup trigger={popup['trigger']} title={popup['title']} description={popup['description']} onClick={closePopup} />
    </>
  )
}

export default Navbar