import React from 'react';
import { Link } from 'react-router-dom'
import formatCurrency from '../../../utils/utils';
// import { IoIosArrowForward } from 'react-icons/io'

const Card = props => {
   const product = props.product
   console.log('product', product)
   const display = props.display


      return (
         
         <div className="row justify-content-center product-item">

            <div className={`product-images${display === 'list-display' ? 'col-md-6 text-center' : ''}`}>
               <Link to={`/product/${product._id}`} >
                  <img src={product.imgCollection[0]} alt={product.titleProduct} className={`align-self-center${display === 'list-display' ? 'img-fluid': ''}`} />
               </Link>
               {product.quantityProduct < 1 && <p className="rupture">Rupture</p>}
               {product.promotionProduct && <p className="pomotion">Promotion</p>}
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
         
   
      );
   
}
export default Card