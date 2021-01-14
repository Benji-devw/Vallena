import React from 'react';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

const ScrollTop = () => {
  const [display, setDisplay] = React.useState(false)
  const scrollTo = () => {window.scrollTo({ top: 0 });}

  React.useEffect(() => {
    let unmounted = true;
    if (unmounted) {
      window.addEventListener('scroll', () => {
       if (window.scrollY >= 500) {
       setDisplay(true)
       }
       else {  setDisplay(false)  }
     });
   }
  return () => { unmounted = false };
  }, [])

  return (
    <div 
      className={`scroll-top-btn ${display ? "fadeIn" : "hide-div"}`}
      onClick={() => scrollTo()}>
      <ArrowDropDownCircleOutlinedIcon />
    </div>
  );
};
export default ScrollTop