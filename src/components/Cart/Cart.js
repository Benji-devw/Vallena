import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import Section from '../../HOC/Section';


const RowCart = () => {
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
      <td>ref</td>
      <td>€0.00</td>
      <td>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-secondary">
            -
            </button>
          <span className="btn btn-light">1</span>
          <button
            type="button"
            className="btn btn-secondary">
            +
            </button>
        </div>
      </td>
      <td>€2.99</td>
      <td>
        <button
          type="button"
          className="btn btn-danger remove">
          X
          </button>
      </td>
    </tr>
  );
}

const Table = () => {
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
        <RowCart />
        <RowCart />
      </tbody>
    </table>
  );
}

const CartPage = () => {
  return (
    <Fragment>
      <Section id='cart'>
        <Container className="m-5 p-5">
        <Row className="cart-header">
          <Col>
            <div className='intro text-center'>
              <h1 className='title'>Vos Commandes : </h1>
              <p className='sub-title mb-4'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores laborum minus molestiae. </p>
            </div>
          </Col>
        </Row>

        <Row className="cart-content">
          <Col sm={8}>
            <Table />
          </Col>
          <Col sm={4}>

            <ul className="list-group">
              <li className="list-group-item">Order Summary</li>

              <li className="list-group-item">
                <ul className="list-group flex">
                  <li className="text-left">Subtotal</li>
                  <li className="text-right">€0.00</li>
                </ul>
                <ul className="list-group flex">
                  <li className="text-left">shipping</li>
                  <li className="text-right">€0.00</li>
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
                  <li className="text-right">€€0.00</li>
                </ul>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-outline-danger btn-lg btn-block checkout bg-crimson"
              disabled={true}
            >
              Payer
            </button>
  
          </Col>
        </Row>
        </Container>
      </Section>
    </Fragment>
  );
};

export default CartPage;