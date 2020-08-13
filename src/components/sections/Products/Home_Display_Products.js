import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import {  Checkbox, Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {useFetchAllProducts} from '../../../apiCall/FetchCall';

import HomeListProducts from './Home_List_Products';

import Section from '../../../HOC/Section';


// const SideMenu = props => {
//   // console.log('props', props)
//   const categories = props.categories
//  const loadCategory = props.loadCategory

//   return (
//     <div>
//       <ul>
//         {(categories.map((categoryList, index) => (
//           <li key={index} onClick={() => loadCategory(categoryList)} >{categoryList} </li>
//         )))}
//       </ul>
//     </div>
//   )
// }


const HomeDisplayProducts = () => {

  // Objet Product
  const [loading, products] = useFetchAllProducts()
  // console.log('products', products)

  if (loading) { return 'chargement...'  }

  return (
    <Container id='home-display-products' fluid>
    <Section>
  

        <div className='section-header pt-5 pb-5 text-center'>
          <h3 className='section-title'>
            <span>Our </span>Blog
          </h3>
          <h6 className='section-subtitle mr-auto ml-auto'>
            Individualized quality care that meets the total needs of the patient Individualized quality care that quality care that  Individualized quality care that meets the total.
          </h6>
        </div>

          {/* <Row>
            <Col sm={2}>
              <SideMenu datas={products} categories={categories}/>

            </Col>
          </Row> */}
  
            <HomeListProducts products={products} />
     

    </Section>
    </Container>
  );
};

export default HomeDisplayProducts;
