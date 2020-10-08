import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import Parallax from 'react-rellax'
import { makeStyles } from '@material-ui/core/styles';

import collectionMen from '../../../scss/img/home/2_478x.progressive.jpg'
import collectionWomen from '../../../scss/img/home/3_478x.progressive.jpg'
import collectionBaby from '../../../scss/img/home/1_478x.progressive.jpg'

const useStyles = makeStyles((theme) => ({
  imgConf: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '20rem',
  },
  bgMen: {
    backgroundImage: `url(${collectionMen})`,
  },
  bgWomen: {
    backgroundImage: `url(${collectionWomen})`,
  },
  bgBaby: {
    backgroundImage: `url(${collectionBaby})`,
  },

}));

const HomeCollection = () => {
  const classes = useStyles();
  const [toogleDisplay, setToogleDisplay] = useState("")

  // const saveFilterByCat = (cat) => {
  //   localStorage.setItem('filterByCat', cat)
  // }

  return (

      <div className="row no-gutters align-items-center">
      <div className="col-lg-12">

        <div className="title-collection">
          <h2>
          C O L L E C T I O N S
          </h2>
        </div>

        {/* <div className="container"> */}
          {/* <Parallax speed={1} data-scroll> */}
        <div className="row collection-content align-items-start justify-content-center no-gutters">

          <div className={`col-md-4 collection text-center ${classes.bgMen} ${classes.imgConf}`}
            onMouseEnter={() => setToogleDisplay('men')}
            onMouseLeave={() => setToogleDisplay('')}
          >
            <Link to="/shop">
              <div className={`title ${toogleDisplay === 'men' ? 'hide-div' : 'fadeIn'}`}>
                <h3>Homme</h3>
              </div>
              <div className="over-f">
                <div className={`collection-after ${toogleDisplay === 'men' ? 'fadeIn' : 'hide-div'}`}>
                  <h4>Homme</h4>
                  <p>Lorem ipsum Lorem ipsum Lorem ipsum</p>
                  <div className="btn-after">
                    <h5>Découvrir</h5>
                  </div>
                </div>

              </div>
            </Link>
          </div>

          <div className={`col-md-4 collection text-center ${classes.bgWomen} ${classes.imgConf}`}
            onMouseEnter={() => setToogleDisplay('women')}
            onMouseLeave={() => setToogleDisplay()}
          >
            <Link to="/shop">
              <div className={`title ${toogleDisplay === 'women' ? 'hide-div' : 'fadeIn'}`}>
                <h3>Femme</h3>
              </div>
              <div className="over-f">
                <div className={`collection-after ${toogleDisplay === 'women' ? 'fadeIn' : 'hide-div'}`}>
                  <h4>Femme</h4>
                  <p>Lorem ipsum Lorem ipsum Lorem ipsum</p>
                  <div className="btn-after">
                    <h5>Découvrir</h5>
                  </div>
                </div>

              </div>
            </Link>
          </div>
          
          <div className={`col-md-4 collection text-center ${classes.bgBaby} ${classes.imgConf}`}
            onMouseEnter={() => setToogleDisplay('baby')}
            onMouseLeave={() => setToogleDisplay()}
          >
            <Link to="/shop">
              <div className={`title ${toogleDisplay === 'baby' ? 'hide-div' : 'fadeIn'}`}>
                <h3>Bébé</h3>
              </div>
              <div className="over-f">
                <div className={`collection-after ${toogleDisplay === 'baby' ? 'fadeIn' : 'hide-div'}`}>
                  <h4>Bébé</h4>
                  <p>Lorem ipsum Lorem ipsum Lorem ipsum</p>
                  <div className="btn-after">
                    <h5>Découvrir</h5>
                  </div>
                </div>

              </div>
            </Link>
          </div>

        </div>
          {/* </Parallax> */}
        {/* </div> */}

      </div>
      </div>

  );
};
export default HomeCollection