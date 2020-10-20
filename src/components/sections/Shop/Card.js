import React, {useState} from 'react';
import { Link } from 'react-router-dom'
// import formatCurrency from '../../../utils/utils';
import Fade from '@material-ui/core/Fade';
import Alert from '@material-ui/lab/Alert';



const Card = props => {
   const product = props.product
   const display = props.display

   const [hov, setHov] = useState('')
   const test = product.imgCollection[0]
   const test2 = product.imgCollection[1]


      return (
         <Fade in={true}>
         <div className="row justify-content-center product-item">

            <div className={`product-images align-items-center ${display === 'list-display' ? 'col-md-6 text-center' : ''}`}>
               <div>
                  <Link to={`/product/${product._id}`} >
                     <img src={hov === 'hov' ? test2 : test} alt={product.titleProduct} 
                           className={`align-self-center`}
                        onMouseEnter={() => setHov('hov')}
                        onMouseLeave={() => setHov('')}
                     />
                  </Link>
               </div>
               
               {/* {product.quantityProduct < 1 && <div className="rupture bg-danger">Rupture</div>}
               {product.promotionProduct && <div className="promotion bg-success">-20 %</div>} */}
                  {product.promotionProduct && 
                  <div className="promotion">Promo</div>
                  }
                  {product.novelty &&
                     <div className="novelty">New</div>
                  }
            </div>

            <div className={`product-details ${display === 'list-display' && 'col-md-6'}`}>
               <h2>{product.titleProduct}</h2>

               {display === 'list-display' && (
                  <p>{product.descriptionProduct}</p>
               )}
               {/* <b>{product.categoryProduct}</b>*/}
               <p>{product.tags}</p> 
               <p>
                  <b>Matière:</b> {product.matter}
                     <b className="ml-2">color:</b> {product.color}
                     <b className="ml-2">collection:</b> {product.yearCollection}
               </p>
            
                  <h5>€ {product.priceProduct}  {product.promotionProduct && <span className="promo-price">€ {product.oldPriceProduct} </span>}  </h5>
                  {product.quantityProduct < 1 && <Alert severity="error" className="rupture">Rupture</Alert>}
         
            </div>

         </div>
         </Fade>
   
      );
   
}
export default Card