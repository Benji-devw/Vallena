import React from 'react';
import { Link } from 'react-router-dom'
import formatCurrency from '../../../../utils/utils';
import vintage from '../../../../scss/img/card.svg'
// const mystyle = {
//    fill: "red",
// };
// const actived = {
//    fill: "#14b1bb"
// }

const SvgCardVintage = props => {
   const product = props.product

      return (
         <div className="col-xl-3 col-lg-4 col-md-6 text-center svg-vintage">

         
           <div className="svg-vintage-content">
               <h2>{product.titleProduct}</h2> 

               <img src={product.imgCollection[0]} alt={product.titleProduct} />
           </div>
            
         
         </div>
      );
   
}
export default SvgCardVintage