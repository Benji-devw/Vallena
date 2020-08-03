import React, { Fragment, useContext, useState, useEffect } from 'react'

import { ClientProfileContext } from '../../lib/ClientProfileContext'
import { useSelector, useDispatch } from 'react-redux'
import { resetCart } from '../../lib/actions'

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'

import Section from '../../HOC/Section';


const Payment = () => {
   const value = useContext(ClientProfileContext)
   console.log('value', value)
   const items = useSelector(state => state.items)
   console.log('items', items)
   const dispatch = useDispatch()

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

   const reset = () => {
      dispatch(resetCart())
   }

   return (
      <Fragment>
         <Section>
            <Container id="payment">
               
               <Row className="payment-header">
                  <Col>
                     <div className='intro text-center'>
                        <h1 className='title'> Paiement </h1>
                     </div>
                  </Col>
               </Row>

               <Row>
                  <Col sm={8}>




                     <Link to="/confirm" className={`btn btn-outline-success float-right`}
                        onClick={() => {
                           reset()
                        }}
                     > Payer
                     </Link>
                  </Col>
                  <Col sm={3}>

                     <h4>Commande :</h4>
                        <hr />
                     <p className="text-left">Subtotal</p>
                     <p className="text-right">€<b>{subTotal.toFixed(2)}</b></p>
               
                     <p className="text-left">shipping</p>
                     <p className="text-right">€<b>{shipping.toFixed(2)}</b></p>
                        <hr />
                     <h3 className="text-left">Total</h3>
                     <h4 className="text-right">€<b>{subTotal === 0.00 ? "0.00 " : total.toFixed(2)}</b></h4>

                        <hr />

                     <h4>Destination : </h4>
                     <p>{value.nom} {value.prenom}</p>
                     <p>{value.adresse}</p>
                     <p>{value.cp} - {value.ville}</p>
                  
                  </Col>
               </Row>

            </Container>
         </Section>
      </Fragment>
   )
}
export default Payment