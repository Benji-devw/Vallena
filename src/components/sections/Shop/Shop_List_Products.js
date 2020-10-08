import React, { Component } from 'react';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import AppsIcon from '@material-ui/icons/Apps';
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
         // products: null,
         display: "grid-display col-lg-4 col-md-6 col-sm-6",
      }
      this.myRef = React.createRef()  
   }
   scrollToMyRef = () => window.scrollTo(0, this.myRef.offsetTop)

   componentDidMount() {
      const display = localStorage.getItem('display')
      this.setState({display: display})
      // const cat = localStorage.getItem('filterByCat')
      if(this.state.display === null) {
         this.setState({ display: "grid-display col-lg-4 col-md-6 col-sm-6"})
      }
   }

   handleDisplay = (e) => {
      this.setState({display: e})
      localStorage.setItem('display', e)
   }

   
   render() {
      // console.log(this.state.display);
      
      // console.log(this.props);
      return (
         <>
            
                  <div ref={this.myRef} className="row">
                     <div className="col-md-6 toogle-display">
                        <ul>
                           Afficher : 
                           <li onClick={() => { this.handleDisplay('grid-display col-lg-4 col-md-6 col-sm-6') }} className={`btn btn-sm ${this.state.display === 'grid-display col-lg-4 col-md-6 col-sm-6' ? 'secondary' : 'out'}`}><AppsIcon /></li>
                           <li onClick={() => this.handleDisplay('list-display')} className={`btn btn-sm arttrack ${this.state.display === 'list-display' ? 'secondary' : 'out'}`}><ArtTrackIcon /></li>
                           <span className="ml-3">Résultat trouvé: {this.props.products.length}</span>
                        </ul>
                     </div>

                     {/* <div className="col-md-4 p-0 result text-center">
                        <p className="m-0 mt-2" style={{fontSize:".9em"}}>
                           boutique
                           /categories:<b>{this.props.cat}</b> 
                           /resultat: <b>{this.props.products.length}</b>
                        </p>
                     </div> */}

                     <div className="col-md-6 text-right filter-sort">
                           Tri
                           <select style={{ width: "10rem", height: "2rem", marginLeft: "1rem" }} className="custom-select" defaultValue={this.props.sort} onChange={this.props.sortProducts}>
                           <option>---</option>
                           <option value="lowest">Le plus cher</option>
                           <option value="highest">Le moins cher</option>
                        </select>
                     </div>
                  </div>
            {
               this.props.products.length <= 0 ?
                  (<div className="m-3">aucun résultat...</div>)
                  :
                  (
                  <>
                     <div className="row">
                        {this.props.products.map((product, id) => (
                           product.visible && 
                           <div key={id} className={`${this.state.display === null ? 'grid-display col-lg-4 col-md-6 col-sm-6' : `${this.state.display}`}`}>
                              <Card product={product} display={this.state.display} />
                           </div>
                        ))}
                     </div>
                  </>
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
