import React from 'react';

import Section from '../../../HOC/Section';
import bgImage from '../../../assets/img/coffee-and-laptop.jpg';
// import Link from '../../UI/Link/Link';

const Home = () => {
  return (
    <Section id='home'>

        <div
          className='home-content p-5'
          style={{ backgroundImage: `url(${bgImage})` }}
        >

          <div className='section-header-light intro container text-center'>
            <h1 className='section-title'>valelena.fr</h1>
            <h3 className='subtitle text-center mb-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              laborum minus molestiae.
            </h3>
          </div>

        </div>

    </Section>
  );
};

export default Home;
