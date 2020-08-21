import React from 'react';
import {Container} from 'react-bootstrap'
import aboutImage from '../../../assets/img/thumb-1920-544085.png';

const about = () => {
  return (
    <section id='about'>
      <Container fluid>

      <div className="row no-gutters justify-content-center align-items-center text-center">

        <div className='section-content-dark text-center col-lg-4 col-md-12'>
          <h2 className='section-title'> ATELIER
          </h2>
          <h3 className='subtitle'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            laborum minus molestiae.
          </h3>
        </div>

        <div className="col-lg-8 col-md-12 aboutImage">
          <img src={aboutImage} className="img-fluid" alt="img" />
        </div>

    </div>

     </Container>
    </section>
  );
};

export default about;
