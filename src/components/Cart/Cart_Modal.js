import React, {  useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import  Modal  from 'react-bootstrap/Modal'
import {RiShoppingCart2Line} from 'react-icons/ri'
import RowItem from '../Checkout/Row_Item'
import Button from '@material-ui/core/Button';


// const TableCart = () => {
//   const items = useSelector(state => state.items)
//   // console.log('items', items)
//   return (
//     <>
//       {items.map(item => {
//         return (<RowItem key={item.id} item={item}/>)
//       })}
//     </>
//   );
// }






function CartHome() {
  const [show, setShow] = useState(false);
  // Redux => Lit le state de redux et recup le nbr d'objet ds le panier
  const items = useSelector(state => state.items)
  const [subTotal, setSubTotal] = useState(0.00)
  const [total, setTotal] = useState(0.00)
  const [shipping, setShipping] = useState(5.50)

  // Calcul Quantity article
  const getQty = items.map(e => e.quantity)
  let sum = getQty.reduce((a, b) => {
    return a + b
  }, 0)

  useEffect(() => {
    let totals = items.map(item => {
      return item.quantity * item.details.priceProduct
    })

    setSubTotal(totals.reduce((item1, item2) => item1 + item2, 0))
    setTotal(subTotal + shipping)
    if (total >= 30) {
      setShipping(0.00)
    } else { setShipping(4.95) }
  }, [items, subTotal, total, setShipping, shipping]);

  const closeModal = () => {
    setShow(false)
  }

  return (
    <>
      <div className="btn-cart">
        <RiShoppingCart2Line size="1.7em" onClick={() => setShow(true)}/>
        <span className={`badge-cart badge-pill ${items.length > 0 && 'badge-primary'}`}>{items.length > 0 && items.length}</span>
      </div>

      
      <Modal
      show={show}
      onHide={() => setShow(false)}
    >
        <Modal.Header closeButton>
          <Modal.Title>
            <RiShoppingCart2Line size="2em" style={{padding:".5rem", marginTop:"-10px"}} />
            Panier
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <div className="row cart-content no-gutters align-items-end">
          <div className="col-md-8 align-self-start">
              {items.map(item => {
                return (<RowItem key={item.id} item={item} onCloseModal={closeModal}/>)
              })}
          </div>
  
        <div className="col-md-4">
              <div className="order-summary-cart-total">
                <div className="order-summary-total">
                  <p className="text-left">Sous-total ({sum} articles):</p>
                  <p className="text-right">€{subTotal.toFixed(2)}</p>

                  <p className="text-left">Frais livraison</p>
                  <p className="text-right">{total < 30 ? '€' + shipping.toFixed(2) : 'Offert'} <br /> <span style={{ fontSize: ".7em" }}>Livraison OFFERT à partir de 30€</span></p>
                  <hr />
                  <h3 className="text-left">Total</h3>
                  <h4 className="text-right">€{subTotal === 0.00 ? "0.00 " : total.toFixed(2)}</h4>
                </div>
                <hr />
                {items.length > 0 && (
                  <Link
                  to="/payment"
                  onClick={() => setShow(false)}
                  >
                  <Button variant="outlined" color="secondary"
                  className="btn btn-cart-checkout"
                  > Payer
                  </Button>
                </Link>
                )}
                

              </div>
        </div>
      </div>
        </Modal.Body>
    </Modal>
    </>
  );
}

export default CartHome