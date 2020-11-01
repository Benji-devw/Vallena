import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import Parallax from 'react-rellax'
import { makeStyles } from '@material-ui/core/styles';
import { updateFilters } from '../../../lib/actions'
import { useDispatch } from 'react-redux';
import collectionMen from '../../../scss/img/home/banner-2.jpg'
import collectionWomen from '../../../scss/img/home/banner-1.jpg'
import collectionBaby from '../../../scss/img/home/Bbmannequin.jpg'
import ScrollAnimation  from 'react-animate-on-scroll'

const useStyles = makeStyles((theme) => ({
  imgConf: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '30rem',
  },
  bgMen: {
    backgroundImage: `url(${collectionMen})`,
  },
  bgWomen: {
    backgroundImage: `url(${collectionWomen})`,
  },
  bgBaby: {
    backgroundImage: `url(${collectionBaby})`,
    backgroundPosition: "-21rem 0rem"
  },

}));

const HomeCollection = () => {
  const classes = useStyles();
  const [toogleDisplay, setToogleDisplay] = useState("")
  // Redux
  const dispatch = useDispatch()
  const homeDisplayFilters = (e) => {
    if (e === 'Homme') {
      return dispatch(updateFilters("Homme", [], [], [], false, false))
    } else if (e === "Femme") {
      return dispatch(updateFilters("Femme", [], [], [], false, false))
    } else 
    { return dispatch(updateFilters("Bébé", [], [], [], false, false))}
  }


  return (
    <div className="container p-2">
      <div className="row align-items-center no-gutters">
      <div className="col-lg-12 p-2">

        {/* <div className="container"> */}
          {/* <Parallax speed={1} data-scroll> */}
          {/* <ScrollAnimation animateIn='fadeIn' animateOut='fadeOut'> */}
        <div className="row collection-content align-items-start justify-content-center no-gutters">

          <ScrollAnimation className="col-md-4" animateIn='fadeIn'>
          <div className={` collection text-center ${classes.bgMen} ${classes.imgConf}`}
            onMouseEnter={() => setToogleDisplay('men')}
            onMouseLeave={() => setToogleDisplay('')}
          >
            <Link to="/shop" onClick={() => homeDisplayFilters('Homme')}>
              <div className={`title ${toogleDisplay === 'men' ? 'hide-div' : 'fadeIn'}`}>
                <h2>Homme</h2>
              </div>
              <div className="over-f">
                <div className={`collection-after ${toogleDisplay === 'men' ? 'fadeIn' : 'hide-div'}`}>
                  <h2>Homme</h2>
                  <p>Lorem ipsum Lorem ipsum Lorem ipsum</p>
                  <div className="btn-after">
                    <h3>Découvrir</h3>
                  </div>
                </div>

              </div>
            </Link>
          </div>
            </ScrollAnimation>

          <ScrollAnimation className="col-md-4" animateIn='fadeIn' delay={250}>
          <div className={`collection text-center ${classes.bgWomen} ${classes.imgConf}`}
            onMouseEnter={() => setToogleDisplay('women')}
            onMouseLeave={() => setToogleDisplay()}
          >
            <Link to="/shop" onClick={() => homeDisplayFilters('Femme')}>
              <div className={`title ${toogleDisplay === 'women' ? 'hide-div' : 'fadeIn'}`}>
                <h2>Femme</h2>
              </div>
              <div className="over-f">
                <div className={`collection-after ${toogleDisplay === 'women' ? 'fadeIn' : 'hide-div'}`}>
                  <h2>Femme</h2>
                  <p>Lorem ipsum Lorem ipsum Lorem ipsum</p>
                  <div className="btn-after">
                    <h3>Découvrir</h3>
                  </div>
                </div>

              </div>
            </Link>
          </div>
            </ScrollAnimation>


          <ScrollAnimation className="col-md-4" animateIn='fadeIn' delay={450}>
          <div className={`collection text-center ${classes.bgBaby} ${classes.imgConf}`}
            onMouseEnter={() => setToogleDisplay('baby')}
            onMouseLeave={() => setToogleDisplay()}
          >
            <Link to="/shop" onClick={() => homeDisplayFilters('Bébé')}>
              <div className={`title ${toogleDisplay === 'baby' ? 'hide-div' : 'fadeIn'}`}>
                <h2>Bébé</h2>
              </div>
              <div className="over-f">
                <div className={`collection-after ${toogleDisplay === 'baby' ? 'fadeIn' : 'hide-div'}`}>
                  <h2>Bébé</h2>
                  <p>Lorem ipsum Lorem ipsum Lorem ipsum</p>
                  <div className="btn-after">
                    <h3>Découvrir</h3>
                  </div>
                </div>

              </div>
            </Link>
          </div>
          </ScrollAnimation>

        </div>
        {/* </Parallax> */}
        {/* </div> */}
        {/* </ScrollAnimation> */}
        </div>
      </div>
    </div>
  );
};
export default HomeCollection