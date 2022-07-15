import React from 'react';
import { MDBTypography } from 'mdb-react-ui-kit';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import { DividerLine } from '../../components';

import { images } from '../../constants';
import './Products.scss';

function Products() {

  const getImgPath = (item) => {
    return images[item];
  }

  const allProducts = [
    { name: 'Pali per recinzioni', description: 'Robusti pali da recinzione di diverse lunghezze e diametro.', cardImg: 'recinzionilogo', pagePath: 'recinzioni' },
    { name: 'Staccionate', description: 'Pali per staccionate. Stile “Croce di Sant’Andrea”, con singole o doppie traverse, ecc..', cardImg: 'staccionatelogo', pagePath: 'staccionate' }
  ]

  return (
    <div className='app__products app__container'>
      <h1>Elenco Prodotti</h1>
      <DividerLine />
      <div className='app__products-description'>
        <MDBTypography className='lead mb-0'>
        All'interno di ogni scheda si possono visualizzare i vari prodotti trattati, divisi per categoria. Per ulteriori informazioni si consiglia di contattarci telefonicamente.
        </MDBTypography>
      </div>
      <Row className='h-100'>
        {allProducts.map((item, index) => (
          <div className='app__products-card col-sm d-flex justify-content-center' key={index}>
            <Card className='h-100' style={{width: '18rem'}}>
              <Card.Img variant='top' src={getImgPath(item.cardImg)} alt={`${item.cardImg}`} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                  
              </Card.Footer>
            </Card>
          </div>
        ))}
      </Row>
    </div>
  )
}

export default Products