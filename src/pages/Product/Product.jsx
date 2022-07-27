import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ImageSlider, Popup } from '../../components';
import './Product.scss';

function Product() {
  const [products, setProducts] = useState([]);
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
    console.log(params)

    axios.get('http://localhost:80/api/productList.php', { params })
    .then(function(response) {
      if (response.status === 200) {
        const allProductsInfo = response.data.products;
        setProducts(allProductsInfo);
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
    <div>
      <ImageSlider />

      <Popup trigger={popup['trigger']} title={popup['title']} description={popup['description']} onClick={closePopup} />
    </div>
  )
}

export default Product