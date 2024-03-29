import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTypography } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { ImageSlider, DividerLine, Popup, Lightbox, ButtonQuote } from '../../components';
import { images } from '../../constants';
import './Product.scss';

function Product() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({name: '', description: ''});
  const [popup, setPopup] = useState({trigger: false, title: '', description: ''});
  const [lightbox, setLightbox] = useState({trigger: false, images: {}});

  let currentPath = '';
  
  useEffect(() => {
    setInterval(() => {
      const newPath = (window.location.href).substring((window.location.href).lastIndexOf('/') + 1);
      if (currentPath !== newPath) {
        currentPath = newPath;
        getProductInfo(currentPath);
      }
    }, 1500)
  }, [currentPath]);

  const getProductInfo = (product) => {
    let data = {
      product: product
    }
    const params = new URLSearchParams(data);

    axios.get('api/productList.php', { params })
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

  const closeLightbox = () => {
    setLightbox({...popup, 'trigger': false});
  }

  const startLightbox = (product) => {
    const imagesPaths = images.productImages[product.shortname];
    const gallery = [];
    if (imagesPaths) {
      imagesPaths.forEach(element => {
      const galleryItem = {
        url: element,
        title: product.name
      };
      gallery.push(galleryItem);
      })
    }
    setLightbox({'trigger': true, 'images': gallery});
  }

  const getImgPath = (item) => {
    return images[item];
  }

  return (
    <div>
      <ImageSlider />
      <div className='app__product app__container'>
        <button><Link to='/prodotti'>Torna all'elenco dei prodotti</Link></button>
        <hr />
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
                    <Card.Img src={getImgPath(`${item.shortname}logo`)} alt={`${item.shortname}-logo`} />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title><h3>{item.name}</h3></Card.Title>
                      <Card.Text>
                        {item.characteristics !== '' ? (
                          <>
                            <strong>Caratteristiche:</strong><br/>
                            {item.characteristics}<br/>
                          </>
                        ) : '' }
                        {item.description !== '' ? (
                          <>
                            <strong>Descrizione:</strong><br/>
                            {item.description}<br/>
                          </>
                        ) : '' }
                        {item.dimension !== '' ? (
                          <>
                            <strong>Altezze Disponibili:</strong><br/>
                            {item.dimension}<br/>
                          </>
                        ) : '' }
                        {item.diameter !== '' ? (
                          <>
                            <strong>Diametro:</strong><br/>
                            {item.diameter}<br/>
                          </>
                        ) : '' }
                        {item.tipologies !== '' ? (
                          <>
                            <strong>Tipologie:</strong><br/>
                            {item.tipologies}<br/>
                          </>
                        ) : '' }
                        {item.woodtype !== '' ? (
                          <>
                            <strong>Legno utilizzato:</strong><br/>
                            {item.woodtype}<br/>
                          </>
                        ) : '' }
                        {item.uses !== '' ? (
                          <>
                            <strong>Possibili utilizzi:</strong><br/>
                            {item.uses}<br/>
                          </>
                        ) : '' }
                        <strong>Disponibilità:</strong><br/>
                        {item.availability === '0' ? (
                          <>
                            Attualmente non disponibili
                          </>
                        ) : ((item.availability === '1' ) ? (
                          <>
                            Attualmente disponibili
                          </>
                        ) : 
                        <>
                          Limitata
                        </> )}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <button onClick={() => startLightbox(item)}>Visualizza Galleria Immagini</button>
                    </Card.Footer>
                  </Col>
                </Row>
              </Card>
            </div>
          ))) : ''}
        </div>

        <ButtonQuote />
        <hr />
        <button><Link to='/prodotti'>Torna all'elenco dei prodotti</Link></button>
      </div>
      
      <Lightbox trigger={lightbox['trigger']} images={lightbox['images']} onClose={closeLightbox} />
      <Popup trigger={popup['trigger']} title={popup['title']} description={popup['description']} onClick={closePopup} />
    </div>
  )
}

export default Product