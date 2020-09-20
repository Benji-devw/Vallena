import React, {useState, useEffect} from 'react';

import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';


const SuccessOk = props => {
   console.log('props', props)

   const [order, setOrder] = useState([])
   console.log('order', order)

   useEffect(() => {
      setOrder(localStorage.getItem('purchaseClient'))
   }, [props.order])

   return (
         <>


                  <div className="row">
                     <div className="col-12 icon-success"><DoneAllOutlinedIcon /></div>
                     <div className="col-12 success">  Votre commande à bien été prise en compte ! </div>
                  </div>
                  <hr />
                  <div className="row">
                     Merci pour votre achat 
                  </div>

         </>
   );
}
export default SuccessOk






