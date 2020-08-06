import React, { Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart, removeFromCart } from '../../lib/actions'
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap'
import Section from '../../HOC/Section';


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
  }, [dispatch, id, qty])

  const remove = id => {
    dispatch(removeFromCart(id))
  }

  return (
    <tr>
      <td>
        <img
          width="70"
          height="70"
          src={process.env.PUBLIC_URL + `/assets/0/citron.png`}
          alt="citrons"
        />
      </td>
      <td>{item.titleProduct}</td>
      <td>€ {item.priceProduct}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button className="btn btn-secondary"
            type="button" 
            onClick={() => {
              if (qty > 1) { 
                update('decrement')
              }
            }} > -
            </button>
          <span className="btn btn-light">{qty}</span>
          <button className="btn btn-secondary"
            type="button"
            onClick={() => {
              update('increment')
            }} > +
            </button>
        </div>
      </td>
      <td>€{qty * item.priceProduct}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger remove"
          onClick={() => {
            remove(id)
          }}
          > x
          </button>
      </td>
    </tr>
  );
}

const TableCart = () => {
  const items = useSelector(state => state.items)
  console.log('items', items)
  useEffect(() => {
    // console.log(`you have ${items.length} in yourcart`)
  });
  return (
    <table>
      <thead> 
        <tr>
          <th width="200">Product</th>
          <th width="80">Reference</th>
          <th width="150">Price</th>
          <th width="150">Quantity</th>
          <th width="200">Total</th>
        </tr> 
      </thead>
      <tbody>
        {items.map(item => {
          return (<RowCart key={item.id} item={item}/>)
        })}
      </tbody>
    </table>
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
      <Section id='cart'>
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
                {/* <ul className="list-group flex">
                  <li className="coupon crimson">
                    <small> '&gt' Add Coupon Code</small>
                  </li>
                </ul> */}
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
      </Section>
    </Fragment>
  );
};

export default CartClient;