import React, { useEffect } from 'react';
// import Parallax from 'react-rellax'
// import soleil from '../../../scss/img/soleil.png';
import Parallax from 'react-rellax'
import areca from '../../../scss/img/areca.png';


const Home = () => {

  useEffect(() => {

    // // Get a reference to the <path>
    // var path = document.querySelector('#star-path');
    // // Get length of path... ~577px in this case
    // var pathLength = path.getTotalLength();
    // // Make very long dashes (the length of the path itself)
    // path.style.strokeDasharray = pathLength + ' ' + pathLength;

    // // Offset the dashes so the it appears hidden entirely
    // path.style.strokeDashoffset = pathLength;

    // // Jake Archibald says so
    // // https://jakearchibald.com/2013/animated-line-drawing-svg/
    // path.getBoundingClientRect();
    // // When the page scrolls...
    // window.addEventListener("scroll", function (e) {
    //   // What % down is it? 
    //   // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript/2387222#2387222
    //   // Had to try three or four differnet methods here. Kind of a cross-browser nightmare.
    //   var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    //   // Length to offset the dashes
    //   var drawLength = pathLength * scrollPercentage;
    //   // Draw in reverse
    //   path.style.strokeDashoffset = pathLength - drawLength;
    //   // When complete, remove the dash array, otherwise shape isn't quite sharp
    //   // Accounts for fuzzy math
    //   if (scrollPercentage >= 0.99) {
    //     path.style.strokeDasharray = "none";
    //   } else {
    //     path.style.strokeDasharray = pathLength + ' ' + pathLength;
    //   }




    // let textPath = document.querySelector("#text-path");
    // let textContainer = document.querySelector("#text-container");
    // let path = document.querySelector(textPath.getAttribute('href'));
    // let pathLength = path.getTotalLength();
    
    // console.log('pathLength', pathLength)

    // const updateTextPathOffset = offset => {
    //   textPath.setAttribute('startOffset', offset);
    // }
    // updateTextPathOffset(200)

    // const onScroll = () => {
    //   requestAnimationFrame(function() {
    //     let rect = textContainer.getBoundingClientRect()
    //     let scrollPercent = rect.y / window.innerHeight;
    //     console.log('scrollPercent', scrollPercent)
    //     updateTextPathOffset(scrollPercent * pathLength)
    //   });
    // }
    // window.addEventListener('scroll', onScroll);

  })  // useEffect


  return (
    <section id='home'>

      <img src={areca} alt="areca" className="areca img-fluid" draggable="false"/>
    
      <div className='row home-content justify-content-center align-items-center home-content no-gutters'>

          <div className='col-lg-6 p-2 section-header-dark home-intro text-center'>
            <Parallax speed={1} data-scroll>
              <h1 className='section-title'>
                

              <svg version="1.1" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg"
                id="text-container" 
              >
                <g>
                  <path 
                    id="text-curve"
                    style={{fill:"none"}}
                    d="M0.004,175.499c195.143-63.406,405.349-63.406,600.491,0" 
                  />
                  <text fontSize="82">
                    <textPath 
                      id="text-path"
                      href="#text-curve"
                      startOffset="200"
                    >
                      Valelena.fr

                    </textPath>
                  </text>
                </g>
              </svg>

                </h1>
              <h3 className='subtitle text-center mb-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
                laborum minus molestiae.
              </h3>
            </Parallax>
          </div>

           
          <div className="col-lg-6 p-2 text-right">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.6 107.6" id="star-svg">
            
            <path fill="none" stroke="white" strokeWidth="2" 
            id="star-path" 
            d="M43.7,65.8L19.9,83.3c-2.9,1.9-5.1,3.2-7.9,3.2c-5.7,0-10.5-5.1-10.5-10.8
		c0-4.8,3.8-8.2,7.3-9.8l27.9-12L8.8,41.4c-3.8-1.6-7.3-5.1-7.3-9.8c0-5.7,5.1-10.5,10.8-10.5c2.9,0,4.8,1,7.6,3.2l23.8,17.4
		l-3.2-28.2c-1-6.7,3.5-12,9.8-12c6.3,0,10.8,5.1,9.8,11.7L57,41.8l23.8-17.4c2.9-2.2,5.1-3.2,7.9-3.2c5.7,0,10.5,4.8,10.5,10.5
		c0,5.1-3.5,8.2-7.3,9.8L63.9,53.8l27.9,12c3.8,1.6,7.3,5.1,7.3,10.1c0,5.7-5.1,10.5-10.8,10.5c-2.5,0-4.8-1.3-7.6-3.2L57,65.8
		l3.2,28.2c1,6.7-3.5,12-9.8,12c-6.3,0-10.8-5.1-9.8-11.7L43.7,65.8z"/>
          </svg> */}

          {/* <svg version="1.1" id="Calque_14" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 1197 2097">

                    <path
                    fill="none" stroke="#191919" strokeWidth="5" strokeMiterlimit="10"
                    id="star-path" d="M572,38c65.19,101.4,131.94,245.08,102,398c-38.3,195.64-202.09,239.12-202,405
            c0.09,163.6,159.46,206.98,202,400c35.97,163.2-37.02,317.99-102,421"/>

          </svg> */}

          
          </div>
        
        </div>

    </section>
  );
};

export default Home;
