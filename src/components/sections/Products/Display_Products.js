import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
// import {  Checkbox, Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import useFetchAllProducts from '../../../apiCall/ProductsFetchCall'

import ProductList from './Products_List'

import Section from '../../../HOC/Section';


// const SideMenu = () => {
//   const [loading, links] = useFetchAllProducts()
//   const loadCategory = i => {
//     console.log(i)
//   }

//   return 

// }

const DisplayProducts = () => {
  // const [visible, setVisible] = React.useState(true)

  // Objet Product
  const [loading, products] = useFetchAllProducts()

  const filteredProducts = products



  if (loading) {
    return 'chargement...'
  }

  return (
    <Section id='blog'>
      <Container className='pt-2 pb-5'>

        <div className='section-header pt-5 pb-5 text-center'>
          <h3 className='section-title'>
            <span>Our </span>Blog
          </h3>
          <h6 className='section-subtitle mr-auto ml-auto'>
            Individualized quality care that meets the total needs of the patient Individualized quality care that quality care that  Individualized quality care that meets the total.
          </h6>
        </div>


          <Row>
            <Col sm={2}>
              {/* <SideMenu /> */}
            </Col>
          </Row>
          <Row>
            <Col>
            <ProductList products={filteredProducts} />
            </Col>
          </Row>


  
      </Container>
    </Section>
  );
};

export default DisplayProducts;






// const test = [];
//         links.forEach((link, index) => {
//           test.push(
//             <li key={link._id} onClick={() => loadCategory(index)}>
//             {link.categoryProduct}
//                </li>
//             )})
//   return (<ul>{console.log(test)}</ul>)