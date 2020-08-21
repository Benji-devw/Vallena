import React, { Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'

import { updateCart, removeFromCart } from '../../lib/actions'



const RowCart = props => {
  const {id, quantity, details} = props.item    // Redux
  const item = details

  const [qty, setQty] = useState(quantity)  
  const dispatch = useDispatch()				        // Dispatch l'item du store localement pr le lire

  const update = (action) => {
    if (action === 'increment') { setQty(item.quantityProduct > qty ? qty + 1 : qty)}
    if (action === 'decrement') { setQty(qty - 1)}
  }

  useEffect(() => {                 // est executé lors d'un chagement local du component
    dispatch(updateCart(id, qty))   // change la quantity dans le panier lors de " increment et decrement "
    
    const body = document.querySelector('.header');
    body.scrollIntoView({ behavior: 'smooth' }, 0)
  }, [dispatch, id, qty])

  const remove = id => {
    dispatch(removeFromCart(id))
  }
  
  return (
    <>
 
        <img
          height="100"
          src={item.imgCollection[0]}
          alt="none"
        />
     
      {item.titleProduct}
      € {item.priceProduct}
        
        <div className="cart-qty">
          <button className="btn-cart-qty"
          type="button"
              onClick={() => {
              if (qty > 1) { 
                update('decrement')
              }
            }} > <b>-</b>
          </button>

          <span className="qty">{qty}</span>

          <button className="btn-cart-qty"
            type="button"
              onClick={() => {
                update('increment')
              }} > <b>+</b>
          </button>
        </div>

   
      €{qty * item.priceProduct}
      
        <button
          type="button"
          className="btn-cart-remove"
          onClick={() => {
            remove(id)
          }}
          > <b>x</b>
        </button>
    </>
  );
}

const TableCart = () => {
  const items = useSelector(state => state.items)
  // console.log('items', items)
  useEffect(() => {
    // console.log(`you have ${items.length} in yourcart`)
  });
  return (
    <Col>
        {items.map(item => {
          return (<RowCart key={item.id} item={item}/>)
        })}
    </Col>
  );
}

const CartClient = () => {
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
    <Fragment>     
      <section id='cart'>
        <Container>
        <Row className="cart-header mx-auto p-3">
          <Col>
            <div className='intro text-center'>
              <h1 className='title'>Vos Commandes : </h1>
              <p className='sub-title mb-4'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores laborum minus molestiae. </p>
            </div>
          </Col>
        </Row>

        <Row className="cart-content">
          <Col sm={8}>

            <TableCart items={items}/>

          </Col>
          <Col sm={4}>

            <ul className="list-group">
              <li className="list-group-item">Order Summary</li>

              <li className="list-group-item">
                <ul className="list-group flex">
                  <li className="text-left">Subtotal</li>
                  <li className="text-right">€{subTotal.toFixed(2)}</li>
                </ul>
                <ul className="list-group flex">
                  <li className="text-left">shipping</li>
                    <li className="text-right">€ {shipping.toFixed(2)}</li>
                </ul>
              </li>

              <li className="list-group-item ">
                <ul className="list-group flex">
                  <li className="text-left">Total</li>
                    <li className="text-right">€{subTotal ===  0.00 ? "0.00 ": total.toFixed(2) }</li>
                </ul>
              </li>
            </ul>
            <Link
              to="/payment"
              type="button"
              className="btn btn-outline-danger btn-lg btn-block checkout bg-crimson"
              disabled={ !items.length }
            >
              Payer
            </Link>
  
          </Col>
        </Row>
        </Container>
      </section>
    </Fragment>
  );
};
export default CartClient;