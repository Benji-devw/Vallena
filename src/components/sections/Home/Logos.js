import React from 'react';
import Parallax from 'react-rellax'

import couture from '../../../scss/img/Logo-couture.png';
import faitMain from '../../../scss/img/Logo-faitMain.png';
import tissu from '../../../scss/img/Logo-tissu.png';



const Logos = () => {
  return (
      <Parallax speed={1} data-scroll>
    <section id='logos'>

        <div className="row justify-content-center align-items-center logos-logo no-gutters">

          <div className="col-sm-4 p-3 text-center">
            <img src={faitMain} alt="faitMain"/>
            <br />
            <p style={{ color: "#581c0c"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla maximus eros, id luctus eros tincidunt sed.  
            </p>
          </div>

          <div className="col-sm-4 p-3 text-center">
            <img src={couture} alt="couture" />
          <br />
            <p style={{ color: "#ca5116" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla maximus eros, id luctus eros tincidunt sed.
            </p>
          </div>
          
          <div className="col-sm-4 p-3 text-center">
            <img src={tissu} alt="tissu"  />
          <br />
            <p style={{ color: "#191919" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla maximus eros, id luctus eros tincidunt sed.
            </p>
          </div>

        </div>
    </section>
      </Parallax>
  );
};

export default Logos;
