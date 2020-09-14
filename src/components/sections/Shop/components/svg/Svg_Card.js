import React from 'react';
import { Link } from 'react-router-dom'
import formatCurrency from '../../../../utils/utils';

// const mystyle = {
//    fill: "red",
// };


const SvgCard = props => {
   const product = props.product

      return (
         <div className="svg-head">

            <svg x="0px" className="svg-card" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <linearGradient id="gradient-vertical" x1="0" y1="1" >
                     <stop offset="0%" stopColor="var(--color-stop-1)" />
                     <stop offset="50%" stopColor="var(--color-stop-2)" />
                     <stop offset="100%" stopColor="var(--color-stop-3)" />
                  </linearGradient>
                  <linearGradient id="gradient-vertical-visible" x1="0" y1="1">
                     <stop offset="0%" stopColor="var(--color-stop-1)" />
                     <stop offset="50%" stopColor="var(--color-stop-2)" />
                     <stop offset="100%" stopColor="var(--color-stop-3)" />
                  </linearGradient>
               </defs>
               <Link to={`/product/${product._id}`}>
                  <path
                     id="gradient-vertical"
                     fill="url(#gradient-vertical)"
                     stroke="rgba(0, 0, 0, .2)"
                     d="M 0 400 Q 0 400 0 50 Q 150 100 300 50 C 300 50 300 400 300 400 Q 150 350 0 400"
                  /> 
                  <path
                     id="gradient-vertical-visible"
                     fill='url(#gradient-vertical-visible)'
                     stroke="rgba(0, 0, 0, .2"
                     d="M 0 400 Q 0 400 0 50 Q 150 100 300 50 C 300 50 300 400 300 400 Q 150 350 0 400"
                  /> 
                  </Link>

               <text textAnchor="middle" x="50%" y="255" className="svg-title" style={{ fill: "#191919"}}>{product.titleProduct}</text>
               <text textAnchor="middle" x="50%" y="275" className="category" style={{ fill: "#6f6f6f" }}>{product.categoryProduct}</text>
               <text textAnchor="middle" x="50%" y="300" className="price" style={{ fill: "#191919" }}>{formatCurrency(product.priceProduct)}</text>
               <text textAnchor="middle" x="50%" y="320" className="stock" style={{ fill: "#191919" }}>stock : {product.quantityProduct}</text>
               <text textAnchor="middle" x="50%" y="340" className="avis" style={{ fill: "#191919" }}> avis (0)</text>
               <image href={product.imgCollection[0]} className="imgforsvg" x="-4.5" y="-20" />  	
            </svg>
         </div>
      );
   
}
export default SvgCard