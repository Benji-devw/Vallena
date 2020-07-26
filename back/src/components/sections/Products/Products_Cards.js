import React from 'react';
import moment from 'moment'
import { Container, Row, Col } from 'react-bootstrap'
import {  Checkbox, Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import useFetchAllProducts from '../../../apiCall/ProductsFetchCall'

import Section from '../../../HOC/Section';
import ModalProduct from './Modal_Product'

import blogImage1 from '../../../assets/img/blog1.jpg';
// import blogImage2 from '../../../assets/img/blog2.jpg';
// import blogImage3 from '../../../assets/img/blog3.jpg';


const ProductsCards = () => {
  const [visible, setVisible] = React.useState(true)

  const [loading, datas] = useFetchAllProducts()
  // console.log('category', category)

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

        <Grid columns={1}>
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
                  Home
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
                    {datas.map((data) =>
                      <Col sm={4} key={data._id} className='mt-5 mb-5'>

                        <div className='card rounded-0'>
                          <img src={blogImage1} className='card-img-top' alt='Blog 1' />
                          <div className='card-body'>
                            <h5 className='card-title'>{data.titleProduct}</h5>
                            <p className='card-text'>
                              {data.descriptionProduct}
                            </p>

                            <ModalProduct
                              category={data.categoryProduct}
                              title={data.titleProduct}
                              description={data.descriptionProduct}
                              price={data.priceProduct}
                              reporter={data.reporterProduct}
                              img={blogImage1}
                              date={moment(data.createdAt).startOf().fromNow()}
                            />
                          </div>
                        </div>
                      </Col>
                    )}
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
