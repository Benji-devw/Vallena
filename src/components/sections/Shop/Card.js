import React from 'react';
import { Link } from 'react-router-dom'
import formatCurrency from '../../../utils/utils';
import Fade from '@material-ui/core/Fade';



const Card = props => {
   const product = props.product
   const display = props.display


      return (
         <Fade in={true}>
         <div className="row justify-content-center product-item">

            <div className={`product-images align-items-center ${display === 'list-display' ? 'col-md-6 text-center' : ''}`}>
               <Link to={`/product/${product._id}`} >
                  <img src={product.imgCollection[0]} alt={product.titleProduct} className={`align-self-center img-fluid`} />
               </Link>
               {product.quantityProduct < 1 && <div className="rupture bg-danger">Rupture</div>}
               {product.promotionProduct && <div className="promotion bg-success">-20 %</div>}

            </div>


            <div className={`product-details ${display === 'list-display' && 'col-md-6'}`}>
               <h2>{product.titleProduct}</h2>

               {display === 'list-display' && (
                  <p>{product.descriptionProduct}</p>
               )}
               {/* <b>{product.categoryProduct}</b>*/}
               <p>Mots-clé, sdb, rangement</p> 
            
               <h5>{formatCurrency(product.priceProduct)}</h5>
         
               {/* <p className="personnalisable">Personnalisable</p> */}
            
               {/* <b>{product.sizeProduct} - {product.weightProduct}</b> */}
            
            
               
               {/* <button className="btn">Détails <IoIosArrowForward /> </button> */}
         
               
            
            </div>

         </div>
         </Fade>
   
      );
   
}
export default Card