import React from 'react';
import { Container } from 'react-bootstrap';

import ShopListProducts from './Shop_List_Products';
import {useFetchAllProducts} from '../../../apiCall/FetchCall';
import Section from '../../../HOC/Section';


const ShopDisplayProducts = () => {

  // Objet Product
  const [loading, products] = useFetchAllProducts()
  // console.log('products', products)

  if (loading) { return 'chargement...'  }

  return (
    <Section id='shop'>
      <Container id='shop-display-products' fluid >
  
        <div className='section-content-light text-center'>
          <h2 className='section-title'> Boutique
          </h2>
          <h3 className='subtitle'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            laborum minus molestiae.
          </h3>
        </div>

        <ShopListProducts products={products} />
     

    </Container>
    </Section>
  );
};

export default ShopDisplayProducts;
