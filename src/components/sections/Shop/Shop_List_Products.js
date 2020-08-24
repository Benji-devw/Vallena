import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import {fetchProducts} from '../actions/productActions';

// import styled from 'styled-components'
// const Img = styled.img` height: 15rem; `

import SvgCard from './components/Svg_Card'


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
               (<Row id="shop-list" ref={this.myRef} className="justify-content-center no-gutters">
             
                  {this.props.products.map(product => (
                     product.visible && 
                        <SvgCard key={product._id} product={product}/>
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
