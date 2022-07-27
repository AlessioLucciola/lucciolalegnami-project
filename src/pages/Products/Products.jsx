import React, { useState, useEffect } from 'react';
import { MDBTypography } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import { DividerLine, ImageSlider, Popup } from '../../components';

import { images } from '../../constants';
import './Products.scss';

function Products() {
  const [products, setProducts] = useState([]);
  const [popup, setPopup] = useState({trigger: false, title: '', description: ''});

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = () => {
    axios.get('http://localhost:80/api/productsList.php')
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

  const getImgPath = (item) => {
    return images[item];
  }

  const closePopup = () => {
    setPopup({...popup, 'trigger': false});
  }

  return (
    <div>
      <ImageSlider />
      <div className='app__products app__container'>
        <h1>Elenco Prodotti</h1>
        <DividerLine />
        <div className='app__products-description'>
          <MDBTypography className='lead mb-0'>
          All'interno di ogni scheda si possono visualizzare i vari prodotti trattati, divisi per categoria. Per ulteriori informazioni si consiglia di contattarci telefonicamente.
          </MDBTypography>
        </div>
        <Row className='h-100'>
          {products.length > 0 ? (products.map((item, index) => (
            <div className='app__products-card col-sm d-flex justify-content-center' key={index}>
              <Card className='h-100' style={{width: '18rem'}}>
                <Link to={item.shortname}><Card.Img variant='top' src={getImgPath(item.shortname+'logo')} alt={`${item.shortname}-logo`} /></Link>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <button><Link to={item.shortname}>Visualizza Scheda Prodotti</Link></button>
                </Card.Footer>
              </Card>
            </div>
          ))) : ''}
        </Row>
      </div>

      <Popup trigger={popup['trigger']} title={popup['title']} description={popup['description']} onClick={closePopup} />
    </div>
  )
}

export default Products