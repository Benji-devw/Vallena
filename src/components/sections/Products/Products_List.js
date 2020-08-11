import React from 'react';
import { Container, Row } from 'react-bootstrap'
// import {  Checkbox, Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Section from '../../../HOC/Section';

// import ProductCards from './Products_Cards'
import Main from './Products_Cards'


const ProductList = props => {
  // data
  const products = props.products

  // get unique category items
  // Fonction One line = () => 
  const uniqueItems = (x, i, array) => array.indexOf(x) === i;
  const PRODUCT_CATEGORIES = products.map(prod => prod.categoryProduct).filter(    // filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback
  uniqueItems
  );
  PRODUCT_CATEGORIES.push("all");
  PRODUCT_CATEGORIES.sort();


  return (
    <Section id='blog'>
      <Container className='pt-2 pb-5'>
          <Row>
       
            <h5>Produit en boutique :<b>{products.length}</b> </h5>
       
          </Row>
          
        <Row>
            <Main products={products} productCategoriesList={PRODUCT_CATEGORIES}/>
        </Row>

      </Container>
    </Section>
  );
};

export default ProductList;
