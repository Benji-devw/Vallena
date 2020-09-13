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
   const constraint = (680 * scale - 120) / 2;

      return (
         <>
            <Frame
               name={"SliderApp"}
               width={"100%"}
               height={"100%"}
               background={"#242424"}
            >
               <Frame
                  name={"Mask"}
                  width={"100%"}
                  height={430}
                  center
                  overflow={"hidden"}
                  radius={"1%"}
                  background={"#F1F1F1"}
                  className={"motion-mask"}
               >
                  <Frame
                     name={"Image"}
                     className={"motion-image"}
                     scale={scale}
                     center
                     size={1080}
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
                  min={0.35}
                  max={1.5}
                  onChange={function(newValue) {
                     setScale(newValue)
                  }}
               />
            </Frame>
   
         
         </>
      );
   
}
export default MotionFramer