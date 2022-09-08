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
  const [activePage, setActivePage] = useState('');

  const handleMenuOnClick = (e) => {
    e.stopPropagation();
    setToggle((prevState) => !prevState);
  }

  useEffect(() => {
    updateActivePage();
    getProductsList();
  }, []);

  const getProductsList = () => {
    axios.get('api/productCategory.php')
    .then(function(response) {
      if (response.status === 200) {
        const allProductsList = response.data.products;
        setProducts(allProductsList);
      }
    })
  }

  const closePopup = () => {
    setPopup({...popup, 'trigger': false});
  }

  const updateActivePage = (name) => {
    if (name) {
      setActivePage(name);
    } else {
      const currentPage = (window.location.href).substring((window.location.href).lastIndexOf('/') + 1);
      setActivePage(currentPage);
    }
  }

  return (
    <>
      <nav className='app__navbar'>
        <div className='app__navbar-logo'>
          <Link to='/'><img src={images.logo} alt='logo' onClick={() => updateActivePage()} /></Link>
        </div>
        <ul className='app__navbar-links'>
          <li className={`app__flex p-text ${activePage === '' ? 'link-active' : ''}`} key='l-Homepage' onClick={() => updateActivePage()}>
            <Link to='/'>Homepage</Link>
          </li>
          <li className={`app__flex p-text ${(activePage) === 'prodotti' ? 'link-active' : ''} ${(dropbarMenu && activePage !== 'prodotti') ? 'page-active' : ''}`} key='l-ElencoProdotti' onMouseEnter={() => setDropbarMenu(true)} onMouseLeave={() => setDropbarMenu(false)} onClick={() => updateActivePage()}>
            <Link to='/prodotti'>Elenco Prodotti</Link>{products && products.length > 0 && <motion.a initial={{ rotateZ: 0 }} animate={dropbarMenu ? { rotateZ: 180 } : {rotateZ: 0}} transition={{ duration: 0.2, ease: 'easeInOut' }} id='arrow'>▼</motion.a>}
          </li>
          <li className={`app__flex p-text ${activePage === 'legnoutilizzato' ? 'link-active' : ''}`} key='l-LegnoUtilizzato' onClick={() => updateActivePage()}>
            <Link to='/legnoutilizzato'>Il Legno Utilizzato</Link>
          </li>
          <li className={`app__flex p-text ${activePage === 'contatti' ? 'link-active' : ''}`} key='l-Contatti' onClick={() => updateActivePage()}>
            <Link to='/contatti'>Contatti</Link>
          </li>
          <li className={`app__flex p-text ${activePage === 'preventivo' ? 'link-active' : ''}`} key='l-Preventivo' onClick={() => updateActivePage()}>
            <Link to='/preventivo' id='quotelink'><button>Richiedi un preventivo</button></Link>
          </li>
        </ul>

        {products && products.length > 0 && (
          <div className='app__navbar-dropbar-menu-margin' onMouseEnter={() => setDropbarMenu(true)} onMouseLeave={() => setDropbarMenu(false)}>
            <motion.div initial={{ height: 0, opacity: 0, display: 'none' }} animate={dropbarMenu ? { height: 'auto', opacity: 1, display: 'block' } : { height: 0, opacity: 0, display: 'none' }} transition={{ duration: 0.2, ease: 'easeInOut' }} className='app__navbar-dropbar-menu'>
              <ul className='app__navbar-dropbar-links'>
                {products.map((item) => (
                  <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} className='app__flex p-text' key={item.shortname}>
                    <Link to={`prodotti/${item.shortname}`} onClick={() => updateActivePage('prodotti')}>{item.name}</Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}

        <div className='app__navbar-menu'>
          <HiMenuAlt4 onClick={(e) => handleMenuOnClick(e)}/>

          <motion.div initial={{ width: 0 }} animate={toggle ? { width: 300 } : { width: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
            <motion.span initial={{ width: 0 }} animate={toggle ? { width: 70 } : {width: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
              <HiX onClick={(e) => handleMenuOnClick(e)} />
            </motion.span>

            <ul className='app__navbar-links'>
              <li className={`app__flex p-text ${activePage === '' ? 'link-active' : ''}`} key='lm-Homepage' onClick={(e) => {handleMenuOnClick(e); updateActivePage()}}>
                <Link to='/'>Homepage</Link>
              </li>
              <li className={`app__flex p-text ${activePage === 'prodotti' ? 'link-active' : ''}`} key='lm-ElencoProdotti' onClick={(e) => {handleMenuOnClick(e); updateActivePage()}}>
                <Link to='/prodotti'>Elenco Prodotti</Link>
              </li>
              <li className={`app__flex p-text ${activePage === 'legnoutilizzato' ? 'link-active' : ''}`} key='lm-LegnoUtilizzato' onClick={(e) => {handleMenuOnClick(e); updateActivePage()}}>
                <Link to='/legnoutilizzato'>Il Legno Utilizzato</Link>
              </li>
              <li className={`app__flex p-text ${activePage === 'contatti' ? 'link-active' : ''}`} key='lm-Contatti' onClick={(e) => {handleMenuOnClick(e); updateActivePage()}}>
                <Link to='/contatti'>Contatti</Link>
              </li>
              <li className={`app__flex p-text ${activePage === 'preventivo' ? 'link-active' : ''}`} key='lm-Preventivo' onClick={(e) => {handleMenuOnClick(e); updateActivePage()}}>
                <Link to='/preventivo' id='quotelink'><button>Richiedi un preventivo</button></Link>
              </li>
            </ul>
          </motion.div>

        </div>
      </nav>

      <Popup trigger={popup['trigger']} title={popup['title']} description={popup['description']} onClick={closePopup} />
    </>
  )
}

export default Navbar