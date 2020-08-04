import React from 'react';
import { Col } from 'react-bootstrap'
import ModalProduct from './Modal_Product'

import blogImage1 from '../../../assets/img/blog1.jpg';


const ProductCards = props => {

  // Destructuration de tous les attributs passé ds les props
  // ..donc item => objet destructuré => chaque tableau est un produits 
  const item = props.produit
  console.log('item', item)

  return (
    <>
        <Col md={3} key={item._id} className='mt-5 mb-5'>

          <div className='card rounded-0'>
            <img src={blogImage1} className='card-img-top' alt='Blog 1' />
            <div className='card-body'>
              <h5 className='card-title'>{item.titleProduct}</h5>
              <p className='card-text'>
                {item.descriptionProduct}
              </p>
              <b>{item.categoryProduct}</b>

              {/* Destructuration => envoi vers un autre component */}
              <ModalProduct item={item}
                img={blogImage1}

              />

            </div>
          </div>
        </Col>

    </>

  );
};

export default ProductCards;
