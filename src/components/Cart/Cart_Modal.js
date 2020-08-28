import React, {  useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  Row, Col } from 'react-bootstrap'

import { updateCart, removeFromCart } from '../../lib/actions'






const RowCart = props => {
  const { id, quantity, details } = props.item    // Redux
  const item = details

  const [qty, setQty] = useState(quantity)
  const dispatch = useDispatch()				        // Dispatch le store localement pr le lire les actions et fontions

  const update = (action) => {
    if (action === 'increment') { setQty(item.quantityProduct > qty ? qty + 1 : qty) }
    if (action === 'decrement') { setQty(qty - 1) }
  }

  useEffect(() => {                 // est executé lors d'un chagement local du component
    dispatch(updateCart(id, qty))   // change la quantity dans le panier lors de " increment et decrement "
  }, [dispatch, id, qty])

  const remove = id => {
    dispatch(removeFromCart(id))
  }


  return (
    <Row className="cart-item align-items-center no-gutters">
      <Col>
      
      <img
        src={item.imgCollection[0]}
        alt="none"
      />
      {item.titleProduct}
      </Col>

      <Col>
      
      <div className="cart-qty">
        <button className="btn-cart-qty" type="button"
          onClick={() => {
            if (qty > 1) {
              update('decrement')
            }
          }} > <b>-</b>
        </button>

        <span className="qty">{qty}</span>

        <button className="btn-cart-qty" type="button"
          onClick={() => {
            update('increment')
          }} > <b>+</b>
        </button>
      </div>
      </Col>

      <Col>

       <b style={{width:"50px"}}>€ {qty * item.priceProduct}</b> 

        <button type="button"
          className="btn-cart-remove justify-content-end"
          onClick={() => {
            remove(id)
          }}
        > <b>x</b>
        </button>
      </Col>
    </Row>
  );
}







const TableCart = () => {
  const items = useSelector(state => state.items)
  // console.log('items', items)
  return (
    <>
      {items.map(item => {
        return (<RowCart key={item.id} item={item} />)
      })}
    </>
  );
}








function CartHome() {

  // Redux => Lit le state de redux et recup le nbr d'objet ds le panier
  const items = useSelector(state => state.items)
  const [subTotal, setSubTotal] = useState(0.00)
  const [total, setTotal] = useState(0.00)
  const shipping = 5.50

  useEffect(() => {
    let totals = items.map(item => {
      return item.quantity * item.details.priceProduct
    })

    setSubTotal(totals.reduce((item1, item2) => item1 + item2, 0))
    setTotal(subTotal + shipping)
  }, [items, subTotal, total]);



  return (
    <>
      <Row className="cart-header">
        <Col>
            <h3 className='title text-center'>Commandes : </h3>
        </Col>
      </Row>
      <Row className="cart-content no-gutters">
        <Col >
          <TableCart items={items} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className="list-group cart-amount">
            <li className="text-left">Subtotal</li>
            <li className="text-right">€ {subTotal.toFixed(2)}</li>

            <li className="text-left">shipping</li>
            <li className="text-right">€ {shipping.toFixed(2)}</li>

            <li className="text-left">Total</li>
            <li className="text-right"><b>€ {subTotal === 0.00 ? "0.00 " : total.toFixed(2)}</b></li>
          </ul>
          <Link
            to="/payment"
            type="button"
            className="btn btn-outline-danger btn-lg btn-block checkout bg-crimson"
            disabled={!items.length < 0}
          >
            Commandez
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default CartHome