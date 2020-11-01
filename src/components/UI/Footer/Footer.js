import React from 'react';

import { Link } from 'react-router-dom';
import imgPayment from '../../../scss/img/payments.png'

const footer = () => {
  return (
    <footer>
      <div className='container text-light pt-5'>
        <div className='row'>

          <div className='col-md-4 mb-5 text-center'>
            <div className='footer-title'>
              <h5>Vallena</h5>
            </div>
            <div className='footer-content'>
              <p>
                <small className='text-muted'>
                  Aenean suscipit eget mi act fermentum phasellus vulputate
                  turpis tincidunt. Aenean suscipit eget. Aenean suscipit eget
                  mi act fermentum phasellus vulputate turpis tincidunt. Aenean
                  suscipit ege Aenean suscipit eget mi act fermentum phasellus.
                </small>
              </p>
              {/* <button className='btn btn-sm btn-primary rounded-0'>
                Learn more
              </button> */}
            </div>
          </div>



          <div className='col-md-4 col-style text-center'>
            <div className='footer-title'>
              <h6>Liens rapides</h6>
            </div>
            <div className='footer-content'>
              <ul className='list-group quick-links'>
                <li>
                  <Link to="#" target='/' offset={-120}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="#" target='#'>About</Link>
                </li>
                <li>
                  <Link to="#" target='#'>Services</Link>
                </li>
                <li>
                  <Link to="#" target='#'>Blog</Link>
                </li>
                <li>
                  <Link to="#" target='#'>Contact</Link>
                </li>
              </ul>
            </div>
          </div>



          <div className='col-md-4 col-style text-center'>
            <div className='footer-title'>
              <h6>Contact</h6>
            </div>
            <div className='footer-content'>
              <p className='text-muted'>
                <small>Address : Paris</small>
              </p>
              <p className='text-muted'>
                <small>Phone :</small>
              </p>
              <p className='text-muted'>
                <small>E-mail : test@test.me</small>
              </p>
              {/* <div className='social-media mt-4'>
                <a href='!#' className='text-light'>
                  <i className='fab fa-facebook-f mr-4' />
                </a>
                <a href='!#' className='text-light'>
                  <i className='fab fa-twitter mr-4' />
                </a>
                <a href='!#' className='text-light'>
                  <i className='fab fa-instagram mr-4' />
                </a>
                <a href='!#' className='text-light'>
                  <i className='fab fa-github' />
                </a>
              </div> */}
            </div>


          </div>
        </div>
      </div>

      <div className="row no-gutters">
        <div className='col bottom-footer pb-2 text-center'>
          <img src={imgPayment} alt="payment" className="img-fluid m-2" />
          <br />
          <small>© All Right Reserved</small>
        </div>
      </div>
    </footer>
  );
};

export default footer;
