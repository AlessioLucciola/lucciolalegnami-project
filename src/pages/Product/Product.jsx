import React, { useState, useEffect } from 'react';
import { MDBTypography } from 'mdb-react-ui-kit';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { ImageSlider, DividerLine, Popup } from '../../components';
import { images } from '../../constants';
import './Product.scss';

function Product() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({name: '', description: ''});
  const [popup, setPopup] = useState({trigger: false, title: '', description: ''});
  
  useEffect(() => {
    const currentProduct = (window.location.href).substring((window.location.href).lastIndexOf('/') + 1);
    getProductInfo(currentProduct);
  }, []);

  const getProductInfo = (product) => {
    let data = {
      product: product
    }
    const params = new URLSearchParams(data);

    axios.get('http://localhost:80/api/productList.php', { params })
    .then(function(response) {
      if (response.status === 200) {
        const allProductsInfo = response.data.products;
        const categoryName = response.data.categoryInfo.name;
        const categoryDescription = response.data.categoryInfo.longdescription;
        setProducts(allProductsInfo);
        setCategory({'name': categoryName, 'description': categoryDescription});
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

  const getImgPath = (item) => {
    return images[item];
  }

  return (
    <>
      <ImageSlider />
      <div className='app__product app__container'>
        <h1>{category['name']}</h1>
        <DividerLine />
        <div className='app__product-description'>
          <MDBTypography className='lead mb-0'>
            {category['description']}
          </MDBTypography>
        </div>
        <div className='app__product-card'>
          {products.length > 0 ? (products.map((item, index) => (
            <div className='app__product-card' key={index}>
              <Card className='mb-3 text-center'>
                <Row className='g-0'>
                  <Col md={4} className='p-2 my-auto'>
                    <Card.Img src={images.furcinelogo} alt={`${item.shortname}-logo`} />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title><h3>{item.name}</h3></Card.Title>
                      <Card.Text>
                        {item.characteristics !== '' ? (
                          <>
                            <strong>Caratteristiche:</strong>
                            <p>{item.characteristics}</p>
                          </>
                        ) : '' }
                        {item.description !== '' ? (
                          <>
                            <strong>Descrizione:</strong>
                            <p>{item.description}</p>
                          </>
                        ) : '' }
                        {item.dimension !== '' ? (
                          <>
                            <strong>Altezze Disponibili:</strong>
                            <p>{item.dimension}</p>
                          </>
                        ) : '' }
                        {item.diameter !== '' ? (
                          <>
                            <strong>Diametro:</strong>
                            <p>{item.diameter}</p>
                          </>
                        ) : '' }
                        {item.tipologies !== '' ? (
                          <>
                            <strong>Tipologie:</strong>
                            <p>{item.tipologies}</p>
                          </>
                        ) : '' }
                        <hr/>
                        {item.uses !== '' ? (
                          <>
                            <strong>Possibili utilizzi:</strong>
                            <p>{item.uses}</p>
                          </>
                        ) : '' }
                        {item.woodtype !== '' ? (
                          <>
                            <strong>Legno utilizzato:</strong>
                            <p>{item.woodtype}</p>
                          </>
                        ) : '' }
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      
                    </Card.Footer>
                  </Col>
                </Row>
              </Card>
            </div>
          ))) : ''}
        </div>
      </div>

      <Popup trigger={popup['trigger']} title={popup['title']} description={popup['description']} onClick={closePopup} />
    </>
  )
}

export default Product