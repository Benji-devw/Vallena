import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import formatCurrency from '../../../../utils/utils';

const mystyle = {
   fill: "red",
};
const actived = {
   fill: "#14b1bb"
}

const SvgCard = props => {
   const product = props.product

   const  [isHovered, setIsHovered ] = useState(false)


      return (
         <div className="svg-head justify-content-center text-center">

            <svg x="0px" className="svg-card text-center" xmlns="http://www.w3.org/2000/svg">

              <defs>
                  <linearGradient id="bones-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     {/* <stop offset="0%" style={{ stopColor: "F1F1F1" }} />
                     <stop offset="50%" style={{ stopColor: "ffffff" }} />
                     <stop offset="100%" style={{ stopColor: "F1F1F1" }} /> */}
                     <stop className="start-stop" offset="0%" />
                     <stop className="middle-stop" offset="50%" />
                     <stop className="end-stop" offset="100%" />
                  </linearGradient>
                  <linearGradient id="gradient-horizontal" gradientUnits="userSpaceOnUse">
                     <stop offset="0%" stopColor="var(--color-stop-1)" />
                     <stop offset="50%" stopColor="var(--color-stop-2)" />
                     <stop offset="100%" stopColor="var(--color-stop-3)" />
                  </linearGradient>
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
                  <radialGradient id="gradient-radial-1" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
                     <stop offset="0%" stopColor="var(--color-stop-1)" />
                     <stop offset="50%" stopColor="var(--color-stop-2)" />
                     <stop offset="100%" stopColor="var(--color-stop-3)" />
                  </radialGradient>
                  <radialGradient id="gradient-radial-center" cx="50%" cy="50%" r="50%">
                     <stop offset="0%" stopColor="var(--color-stop-1)" />
                     <stop offset="50%" stopColor="var(--color-stop-2)" />
                     <stop offset="100%" stopColor="var(--color-stop-3)" />
                  </radialGradient>
               </defs>

               <Link to={`/product/${product._id}`}>
                  <path
                     id="gradient-vertical"
                     fill="url(#gradient-vertical)"
                     stroke="rgba(0, 0, 0, .2"
                     d="M 0 400 Q 0 400 0 50 Q 150 100 300 50 C 300 50 300 400 300 400 Q 150 350 0 400"
                  /> 
                  <path
                     id="gradient-vertical-visible"
                     fill='url(#gradient-vertical-visible)'
                     stroke="rgba(0, 0, 0, .2"
                     d="M 0 400 Q 0 400 0 50 Q 150 100 300 50 C 300 50 300 400 300 400 Q 150 350 0 400"
                  /> 
                  </Link>

               <text textAnchor="middle" x="50%" y="255" className="title">{product.titleProduct}</text>
               <text textAnchor="middle" x="50%" y="275" className="category">{product.categoryProduct}</text>
               <text textAnchor="middle" x="50%" y="300" className="price">{formatCurrency(product.priceProduct)}</text>
               <text textAnchor="middle" x="50%" y="320" className="stock">stock : {product.quantityProduct}</text>
               <text textAnchor="middle" x="50%" y="340" className="avis"> avis (0)</text>
               <image href={product.imgCollection[0]} className="imgforsvg" x="6" y="-40" />  	
            </svg>
         </div>
      );
   
}
export default SvgCard