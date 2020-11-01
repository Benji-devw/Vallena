import React, {useState} from 'react';
import { Link } from 'react-router-dom'
// import formatCurrency from '../../../utils/utils';
import Fade from '@material-ui/core/Fade';
import Alert from '@material-ui/lab/Alert';



const Card = props => {
   const product = props.product
   const display = props.display

   const [hov, setHov] = useState('')
   const firstImg = product.imgCollection[0]
   const secondImg = product.imgCollection[1]


      return (
         <Fade in={true}>
         <div className="row justify-content-center product-item no-gutters">

            <div className={`product-images align-items-center ${display === 'list-display' ? 'col-md-6 text-center' : ''}`}>
        
                  <Link to={`/product/${product._id}`} >
                     <img src={secondImg} alt={product.titleProduct} 
                        className={` second-image`}
                     />
                     <img src={firstImg} alt={product.titleProduct} 
                        className={`align-self-center first-image ${hov === "hov" ? "fadeOut" : ""}`}
                        onMouseEnter={() => setHov('hov')}
                        onMouseLeave={() => setHov('')}
                        // style={{position:"absolute", left:".5rem", width:"93%"}}
                     />  
                     {/* <img src={hov === "hov" ? firstImg : secondImg} alt={product.titleProduct} 
                        className={`align-self-center first-image ${hov === "hov" ? "" : ""}`}
                        onMouseEnter={() => setHov('hov')}
                        onMouseLeave={() => setHov('')}
                        // style={{position:"absolute", left:".5rem", width:"93%"}}
                     />   */}
                  </Link>
               {product.promotionProduct && <div className="promotion">Promo</div> }
               {product.novelty && <div className="novelty">New</div> }
            </div>

            <div className={`product-details ${display === 'list-display' && 'col-md-6'}`}>
               <p className="tags">{product.tags}</p> 
               <h3>{product.titleProduct}</h3>

               <h5>{product.priceProduct} €  {product.promotionProduct && <span className="promo-price">{product.oldPriceProduct} €</span>}  </h5>

               {display === 'list-display' && (
                  <p className="description">{product.descriptionProduct}</p>
               )}

               {product.quantityProduct < 1 && <Alert severity="error" className="rupture">Rupture</Alert>}
            </div>

         </div>
         </Fade>
      );
   
}
export default Card