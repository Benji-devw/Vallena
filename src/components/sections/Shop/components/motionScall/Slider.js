import React from 'react';
import { Frame, useMotionValue, useTransform } from "framer";


export function Slider({
   min = 0,
   max = 1,
   value = 0,
   onChange
}) {
   const position = useMotionValue(value * 130);
   const newValue = useTransform(position, [0, 139], [min, max])

      return (
         <Frame  // Creation du rail
            center 
            name={"Rail"}
            width={130}
            height={6}
            radius={3}
            background={"rgba(0, 0, 0, .3)"}
            shadow={"0px 0px 5px #fff"}
            className={"motion-slide"}
         >
            <Frame   // Remplissage du rail
               name={"Fill"}
               width={position}
               height={6}
               radius={3}
               background={"rgba(0, 0, 0, .3)"}
            />
            <Frame   // Creation du boutton
               name={"Knob"}
               x={position}
               size={30}
               center={"y"}
               radius={"50%"}
               background={"#fff"}
               shadow={"0px 0px 4px rgba(0, 0, 0, 0.5)"}
               left={-20}
               drag={"x"}
               dragConstraints={{left: 0, right: 130}}
               dragElastic={0}
               dragMomentum={false}

               onDrag={function() {
                  if(onChange) onChange(newValue.get())
               }}

            />  
         </Frame>
        
      );
   
}
export default Slider