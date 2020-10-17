import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import Parallax from 'react-rellax'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import { updateFilters } from '../../../lib/actions'
import { useDispatch } from 'react-redux';

// import imgPromo from '../../../scss/packImages/nouveau-nés-les-enfants-le.jpg'
// import imgNews from '../../../scss/packImages/vêtements-pour-femmes.jpg'
// import transitions from '@material-ui/core/styles/transitions';


const useStyles = makeStyles((theme) => ({
  imgConfNovelty: {
    width: "20rem",
    height: "20rem",
  },
  imgConfNoveltyHover: {
    width: "30rem",
    height: "30rem",
  },
  imgConfPromo: {
    width: "20rem",
    height: "20rem",
  },
  imgConfPromoHover: {
    width: "30rem",
    height: "30rem",
  },

}));


const HomePromoNews = () => {
  const classes = useStyles();
  const [hovNovelty, setHovNovelty] = useState(false)
  const [hovPromo, setHovPromo] = useState(false)
  const dispatch = useDispatch()
  // const saveFilterByCat = (cat) => {
  //   localStorage.setItem('filterByCat', cat)
  // }

  const homeSort = (e) => {
    if(e === "novelty") {
      dispatch(updateFilters([], [], [], [], false, true))
    } else {
      dispatch(updateFilters([], [], [], [], true, false))
    }
  }

  return (
    <div className="container p-0">
        {/* <Parallax speed={1} data-scroll> */}
      <div className="row home-promo-novelty-content no-gutters align-items-center">
      <div className="col-md-6">


          <div className="row novelty justify-content-center no-gutters">

            <div className="col-12 home-novelty">
              <Link to="/shop" onClick={() => homeSort('novelty')}>
              <div className="row align-items-center home-novelty-content"
                onMouseEnter={() => setHovNovelty(true)}
                onMouseLeave={() => setHovNovelty(false)}
              >
                <div className="col title text-center">
                  <h2 className="">Nouveautés</h2>
                </div>
                  <div className={`nov text-left ${hovNovelty ? classes.imgConfNoveltyHover : classes.imgConfNovelty}`}>
                  </div>
                  <h3 className={`no-move`}><ArrowBackIosIcon />Decouvrir</h3>
              
              </div>
            </Link>
            </div>
         
          </div>
   
        </div>
        <div className="col-md-6">

        <div className="row promo justify-content-center no-gutters">

            <div className="col-12 home-promo">
              <Link to="/shop" onClick={() => homeSort('promo')}>
              <div className="row align-items-center home-promo-content"
                onMouseEnter={() => setHovPromo(true)}
                onMouseLeave={() => setHovPromo(false)}
              >
                <div className="col title text-center">
                   
                  {/* <div className="test"></div> */}
                  <h2 className="">Promotions</h2>
                </div>
                <div className={`prom text-left ${hovPromo ? classes.imgConfPromoHover : classes.imgConfPromo}`}>
                </div>
                  <h3 className={`no-move`}>Decouvrir<ArrowForwardIosIcon /></h3>

              </div>
              </Link>
            </div>

        </div>
        
      </div>
      </div>
        {/* </Parallax> */}
    </div>

  );
};
export default HomePromoNews