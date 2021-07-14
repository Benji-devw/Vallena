import React, {} from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


function WishBtn() {

  const addToWishList = () => {

  }

  return (
    <>
        <div className="row wish-btn">
          <div className="col p-2 text-center"
            onClick={() => {
              addToWishList()
            }}
          >
            <span style={{fontSize:".9em"}}>
              <FavoriteBorderIcon  className="mr-2" style={{ fontSize: "1.4em" }}/>
              Ajouter à la liste d'envies
            </span>
            
          </div>
        </div>
    </>
  );
}

export default WishBtn