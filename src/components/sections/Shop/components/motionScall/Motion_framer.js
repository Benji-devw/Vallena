import React, {useState, useEffect} from 'react';
import { Frame } from "framer";
import Slider from './Slider'


const MotionFramer = props => {
   // const product = props.images
   // console.log('product', product)

   const [imgs, setImgs] = useState([])
   // console.log('imgs', imgs)

   useEffect(() => {
      setImgs(props.images)
   }, [setImgs, props.images])

   const [scale, setScale] = useState(0.6);
   const constraint = (770 * scale - 120) / 2;

      return (
         <>
            <Frame
               name={"Mask"}
               width={"100%"}
               height={450}
               center
               overflow={"hidden"}
               background={"#F5F5F5"}
               className={"motion-mask"}
            >
               <Frame
                  name={"Image"}
                  className={"motion-image"}
                  scale={scale}
                  center
                  size={1280}
                  image={imgs[0]}
                  style={{ backgroundColor: "rgba(0, 0, 0, 0)", backgroundSize: "contain", backgroundPosition: "0px", backgroundRepeat: "no-repeat"}}
                  drag
                  dragElastic={0}
                  dragMomentum={false}
                  dragConstraints={{
                     top: -constraint,
                     bottom: constraint,
                     left: -constraint,
                     right: constraint
                  }}
               />
            </Frame>
            <Slider 
               value={scale}
               min={0.25}
               max={1}
               onChange={function(newValue) {
                  setScale(newValue)
               }}
            />
         </>
      );
   
}
export default MotionFramer