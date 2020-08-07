import React from 'react';
import { Container, Row } from 'react-bootstrap'
// import {  Checkbox, Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Section from '../../../HOC/Section';

import ProductCards from './Products_Cards'
// import ProductFilter from '../../test'


const ProductList = props => {
  return (
    <Section id='blog'>
      <Container className='pt-2 pb-5'>
        <Row>
          {props.products.map(produit => ( <ProductCards key={produit._id} produit={produit} category={props.category} /> ))} 
          {/* {props.products.map(produit => (<ProductFilter key={produit._id} produit={produit} category={props.category} /> ))}  */}
        </Row>

      </Container>
    </Section>
  );
};

export default ProductList;
