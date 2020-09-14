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
         <div className="col-lg-4 col-sm-6 svg-vintage">

         
           
                     {/* <img src={vintage} alt='te' className="img-fluid text-center"/> */}
                  <img src={product.imgCollection[0]} alt={product.titleProduct}/>
                  {product.titleProduct}
            
         
         </div>
      );
   
}
export default SvgCardVintage