import React, { Component } from 'react';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import AppsIcon from '@material-ui/icons/Apps';
import PuffLoader from "react-spinners/PuffLoader";

import Card from './Card'

class ListProducts extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // products: null,
         display: "list-display",
         sort: [],
         isLoaded: false,
      }
      this.myRef = React.createRef()
   }
   scrollToMyRef = () => window.scrollTo(0, this.myRef.offsetTop);

   componentDidMount() {
      window.scrollTo({ top: 0 });
      if (this.props.products.length >= 0) {
         setTimeout(() => {
            this.setState({ isLoaded: true })
         }, 300);
      }

      const display = localStorage.getItem('display')
      if (display !== this.state.display) {
         this.setState({ display: "grid-display col-lg-4 col-md-6 col-sm-6" })
      } else {
         this.setState({ display: "list-display" })
      }
   };

   handleDisplay = (e) => {
      this.setState({ display: e })
      localStorage.setItem('display', e)
   };


   selectValue = () => {
      if (this.props.sortRedux.novelty === true) {
         return 'Nouveautés'
      } else if (this.props.sortRedux.promotion === true) {
         return 'Promotions'
      } else { return '---' }
   }
   render() {
      return (
         <>
            <div ref={this.myRef} className="row top-filters">

               <div className="col-md-6 result-counter-card">
                  <span>Résultat: <b>{this.props.products.length}</b> sur <b>{this.props.counting}</b></span>
               </div>

               <div className="col-md-6 text-right filter-sort">

                  Trier par :
                     <select style={{ width: "10rem", height: "2rem", marginLeft: ".5rem"}}
                     className="custom-select"
                     // value={this.props.sortByPromo === "Promotion" ? 'Promotions' : 'Nouveautés'}
                     onChange={this.props.handleSort}
                  >
                     <option value="" style={{ fontSize: ".8em", color: "gray" }}>{this.selectValue()}</option>
                     <option value="none" >---</option>
                     <option value="byDesc" >Le plus cher</option>
                     <option value="byAsc">Le moins cher</option>
                     <option value="byPromo" >Promotions</option>
                     <option value="byNovelty" >Nouveautés</option>
                  </select>
                  <ul style={{display: "inline-block"}}>
                     {/* Afficher : */}
                     <li onClick={() => { this.handleDisplay('grid-display col-lg-4 col-md-6 col-sm-6') }} className={`btn btn-sm color-icon ${this.state.display === 'grid-display col-lg-4 col-md-6 col-sm-6' ? 'secondary' : 'out'}`}><AppsIcon /></li>
                     <li onClick={() => this.handleDisplay('list-display')} className={`btn btn-sm color-icon arttrack ${this.state.display === 'list-display' ? 'secondary' : 'out'}`}><ArtTrackIcon style={{fontSize:"2.7em"}} /></li>

                  </ul>
               </div>

               <div className="col-12 sep-filters mx-auto">
                  <h3 className="">
                     {/* <div className="filter-result">Produit {this.state.products.length}</div> */}
                     Filtres actifs :
                  </h3>
                  <div className="mx-auto"></div>
               </div>
            </div>
            {
               this.props.products.length <= 0 ?
                  (<div className="m-3">aucun résultat...</div>)
                  :
                  (
                     <>
                        <div className="row">
                           {(this.state.isLoaded || this.props.products.length <= 0) ? (
                              <>
                                 {this.props.products.map((product, id) =>
                                    <div key={id} className={`${this.state.display === null ? 'grid-display col-lg-4 col-md-6 col-sm-6' : `${this.state.display}`}`}>
                                       {product.visible &&
                                          <Card product={product} display={this.state.display} />
                                       }
                                    </div>
                                 )}
                              </>
                           ) : (<div className="mx-auto mt-3"> <PuffLoader size={50} color={"#f50057"} /> </div>)}


                        </div>
                     </>
                  )
            }

         </>
      );
   }
}
export default ListProducts