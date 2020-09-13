import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {fetchProducts} from '../actions/productActions';

// import styled from 'styled-components'
// const Img = styled.img` height: 15rem; `

// import Parallax from 'react-rellax'
// import Example from './Accordion'

// import SvgCard from './components/Svg_Card'
// import SvgCardVintage from './components/Svg_Card_vintage'
import Card from './Card'

class ListProducts extends Component {
   constructor(props) {
      super(props);
      this.state = {
         products: null,
         display: "col-lg-4 col-md-6 col-sm-6",
      }
      this.myRef = React.createRef()  
   }
   scrollToMyRef = () => window.scrollTo(0, this.myRef.offsetTop)

   componentDidMount() {
      const display = localStorage.getItem('display')
      console.log('display', display)
      this.setState({display: display})
   }

   handleDisplay = (e) => {
      this.setState({display: e})
      localStorage.setItem('display', e)
   }


   render() {


      return (
         <>
            {
            !this.props.products ? 
               (<div>Loading...</div> )
            :
               (
               <div ref={this.myRef} className="row">
                  <div className="col-12 toogle-display">
                     <ul>
                           Afficher : 
                     <li onClick={() => { this.handleDisplay('grid-display col-lg-4 col-md-6 col-sm-6') }} className={`btn btn-sm ${this.state.display === 'grid-display col-lg-4 col-md-6 col-sm-6' ? 'text-primary' : ''}`}>Grille</li>
                     <li onClick={() => this.handleDisplay('list-display')} className={`btn btn-sm ${this.state.display === 'list-display' ? 'text-primary' : ''}`}>Liste</li>

                     </ul>
                  </div>
            
                     {this.props.products.map(product => (
                        product.visible && 

                        <div key={product._id} className={`${this.state.display}`}>
                           <Card product={product} display={this.state.display} />
                        </div>

                        // <SvgCard key={product._id} product={product}/>
                     ))}
               </div>
           
               )
            }
            
         </>
      );
   }
}
export default ListProducts
// export default connect((state) => ({products: state.products.items}), {
//    fetchProducts,
// })(Products);
