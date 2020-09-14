import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'


const ControlledCarousel = props => {
	const [index, setIndex] = useState(0);
	const imgs = props.images

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	
	return (
		<Carousel activeIndex={index} onSelect={handleSelect}>
			{ imgs.map((url, i)=> (
			<Carousel.Item key={i}>
			<img
				className="img-fluid img-0"
				src={url}
				alt="First slide"
			/>
			{/* <Carousel.Caption>
				<h3>First slide label</h3>
				<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
			</Carousel.Caption> */}
			</Carousel.Item>
		)) 
		}
    </Carousel>
	);
}
export default ControlledCarousel