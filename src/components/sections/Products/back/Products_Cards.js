import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap'
import {  Checkbox, Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import useFetchAllProducts from '../../../apiCall/ProductsFetchCall'

import ProductList from './Products_List'

import Section from '../../../HOC/Section';


const ProductsCards = () => {
  const [visible, setVisible] = React.useState(true)

  // Objet Product
  const [loading, datas] = useFetchAllProducts()
  // console.log('datas', datas)

  // Recup category clické
  const [category, setCategory] = useState()

  const loadCategory = i => { setCategory(i) }


  

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

        <Grid columns={1} id="sideBarProducts">
          <Grid.Column>
            <Checkbox checked={visible} label={{ children: <code>Filtre</code> }} onChange={(e, data) => setVisible(data.checked)} />
          </Grid.Column>

          <Grid.Column>
            <Sidebar.Pushable as={Segment}>
              <Sidebar as={Menu} animation='overlay' icon='labeled' inverted
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                width='thin'
              >
                <Menu.Item as='a'>
                <Icon name='home' />

                  <ul className="catListe">
                    {(datas.map(link => (
                  
                      <li key={link._id} onClick={() => loadCategory(link.categoryProduct)} >{link.categoryProduct} </li>
                      
                    )))}
                  </ul>
                </Menu.Item>

                <Menu.Item as='a'>
                  <Icon name='gamepad' />
                  Games
                </Menu.Item>
                <Menu.Item as='a'>
                  <Icon name='camera' />
                  Channels
                </Menu.Item>
              </Sidebar>

              <Sidebar.Pusher dimmed={visible}>
                <Segment basic>
                  <Row>
                    
                    <ProductList data={datas} cate={category}/>
                
                    </Row>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>


  
      </Container>
    </Section>
  );
};

export default ProductsCards;
