import React from 'react';
import { Col } from 'react-bootstrap'
import moment from 'moment'
import ModalProduct from './Modal_Product'

import blogImage1 from '../../../assets/img/blog1.jpg';


const ProductList = props => {

  // Destructuration de tous les attributs passé ds les props
  const data = props.data
  console.log('data', data)

  // const categ = props.cate
  // console.log('categ', categ)

  return (
    <>
    {(data.map(list => (

         <Col md={3} key={list._id} className='mt-5 mb-5'>

          <div className='card rounded-0'>
            <img src={blogImage1} className='card-img-top' alt='Blog 1' />
            <div className='card-body'>
              <h5 className='card-title'>{list.titleProduct}</h5>
              <p className='card-text'>
                {list.descriptionProduct}
              </p>

              {/* Destructuration => envoi vers un autre component */}
              <ModalProduct
                category={list.categoryProduct}
                title={list.titleProduct}
                description={list.descriptionProduct}
                price={list.priceProduct}
                reporter={list.reporterProduct}
                img={blogImage1}
                date={moment(list.createdAt).startOf().fromNow()}
              />
              
            </div>
          </div>
        </Col>

      )))}
    </>



  );
};

export default ProductList;
