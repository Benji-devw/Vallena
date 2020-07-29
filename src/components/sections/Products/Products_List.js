import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
// import {  Checkbox, Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import useFetchAllProducts from '../../../apiCall/ProductsFetchCall'

import ProductCards from './Products_Cards'
import Section from '../../../HOC/Section';


import blogImage1 from '../../../assets/img/blog1.jpg';


const ProductList = props => {

  console.log(props)

  const productItems = props.products.map( product => (
    <Col md={3} key={product._id} className='mt-5 mb-5'>

      <div className='card rounded-0'>
        <img src={blogImage1} className='card-img-top' alt='Blog 1' />
        <div className='card-body'>
          <h5 className='card-title'>{product.titleProduct}</h5>
          <p className='card-text'>
            {product.descriptionProduct}
          </p>
          <div>
            <b>{product.priceProduct} €</b>
            <button className="btn btn-dark"
              onClik={(e) => this.props.handleAddToCard}>Add to cart</button>
          </div>

        </div>
      </div>
    </Col>
  ))


  return (
    <Section id='blog'>
      <Container className='pt-2 pb-5'>

        <Row>
          {productItems}
          {/* {datas.map(produit => <ProductCards key={produit._id} produit={produit} /> )} */}
        </Row>



      </Container>
    </Section>
  );
};

export default ProductList;
