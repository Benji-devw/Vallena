import React from 'react';
import { Container } from 'react-bootstrap'
import Section from '../../../HOC/Section';
import aboutImage from '../../../assets/img/about.jpg';

const about = () => {
  return (
    <Section id='about'>
      <Container className='d-flex flex-wrap justify-content-between'>
        <div className='section-header pt-5 pb-5 text-center'>
          <h3 className='section-title'>
            <span>Our </span>Company
          </h3>
          <h6 className='section-subtitle mr-auto ml-auto'>
            Individualized quality care that meets the total needs of the
            patient Individualized quality care that quality care that
          </h6>
        </div>
        <div className='section-content'>
          <div className='row'>
            <div className='col-md-12 col-lg-6 mb-3'>
              <div className='aboutImage'>
                <img src={aboutImage} alt='about company' />
              </div>
            </div>
            <div className='col-md-12 col-lg-6'>
              <h3 className='about-title'>About us</h3>
              <div className='about-description text-center align-self-center'>
                <p>
                  Curabitur aliquet quam id dui posuere blandit. Donec
                  sollicitudin molestie malesuada Pellentesque ipsum id orci
                  porta dapibus. Vivamus suscipit tortor eget felis porttitor
                  volutpat.
                </p>
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor , sed
                  quia non numquam eius modi tempora incidunt ut labore et
                  dolore magnam aliquam quaerat voluptatem. Nisi ut aliquid ex
                  ea commodi consequatur?
                </p>

              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default about;
