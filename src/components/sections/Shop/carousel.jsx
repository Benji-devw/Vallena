import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'



const ControlledCarousel = props => {
	const [index, setIndex] = useState(0);
	const imgs = props.images
	// console.log('imgs', imgs)

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	
	return (
		<Carousel activeIndex={index} onSelect={handleSelect}>
			{ imgs.map((e, i)=> (
			<Carousel.Item key={i} style={{maxHeight: '450px'}}>
			<img
				className="img-fluid"
				src={e}
				alt="First slide"
			/>
			<Carousel.Caption>
				<h3>First slide label</h3>
				<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
			</Carousel.Caption>
			</Carousel.Item>
		)) 
		}
    </Carousel>
	);
}
export default ControlledCarousel