import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap'
// import {  Checkbox, Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import useFetchAllProducts from '../../../apiCall/ProductsFetchCall'

import ProductList from './Products_List'

import Section from '../../../HOC/Section';


const SideMenu = ({loadCategory}) => {
  const [loading, products] = useFetchAllProducts()

  if(loading) {return 'chargement...'}

  // Delete Duplicate Category
  const categorySet = new Set(products.map((p) => p.categoryProduct));
  const categories = Array.from(categorySet).sort();

  return (
    <div>
      <ul>
        {(categories.map((category, index) => (
          <li key={index} >{category} </li>
        )))}
      </ul>
    </div>
  )
}



const DisplayProducts = props => {

  
  // Objet Product
  const [loading, products] = useFetchAllProducts()

  // Search filters
  const [isFiltering, setFiltering] = useState(false)
  const [filtered, setFiltered] = useState(false)
 
  const filterResults = (input) => {
    let fullList = products.flat()
      let result = fullList.filter(item => {
        const name = item.titleProduct.toLowerCase()
        const term = input.toLowerCase()
        return name.indexOf(term) > -1
      })
    setFiltered(result)
  }

  // Effet de bord
  useEffect(() => {
    // console.log(isFiltering)
  
  })
  
  if (loading) { return 'chargement...'  }

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
              <SideMenu />

            <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-sm btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              <input className="form-control input-group-sm mr-sm-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                onChange={(e) => {
                  // filterResults(e.target.value)
                  setFiltering(e.target.value.length > 0)
                  filterResults(e.target.value)
                }}
              />
            </form>

            </Col>
          </Row>
          <Row>
            <Col>
            <ProductList products={isFiltering ? filtered : products}/>
            </Col>
          </Row>

      </Container>
    </Section>
  );
};

export default DisplayProducts;
