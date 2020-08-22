import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';
import formatCurrency from '../../../utils/utils';

// import { connect } from 'react-redux';
// import {fetchProducts} from '../actions/productActions';

// import styled from 'styled-components'
// const Img = styled.img` height: 15rem; `



class ListProducts extends Component {
   constructor(props) {
      super(props);
      this.state = {
         products: null,
      }
      this.myRef = React.createRef()  
   }
   scrollToMyRef = () => window.scrollTo(0, this.myRef.offsetTop)

   render() {


 

      return (
         <>
            {
            !this.props.products ? 
               (<div>Loading...</div> )
            :
               (<Row id="shop" ref={this.myRef} className="justify-content-center no-gutters">
   
                  {this.props.products.map(product => (
                     <Col lg={3} key={product._id} id="card-shop" draggable="false" className='col-xl-3 col-md-4 col-sm-4 text-center'>
                        <div className='card-border'>

                           {/* Link call ProductScreen.js */}
                           <div className="card-hover">
                              <Link to={`/product/${product._id}`}>
                                 <img src={product.imgCollection[0]} className="img-fluid" alt={product.titleProduct} />
                                 <div className='card-title'> {product.titleProduct} </div>
                              </Link>
                           </div>
                              

                           <div className='card-category'>{product.categoryProduct} </div>
                           {/* <div className='card-price'> <b>{product.priceProduct}</b> €</div> */}
                           <div>{formatCurrency(product.priceProduct)}</div>
                           <div className='card-quantity'>stock : <b>{product.quantityProduct}</b> </div>
                           <div className='card-avis'> avis (0)</div>
                        </div>
                        <div className="borderb mt-3"></div>
                     </Col>
                  ))}
               </Row>)
            }
            
         </>
      );
   }
}
export default ListProducts
// export default connect((state) => ({products: state.products.items}), {
//    fetchProducts,
// })(Products);
