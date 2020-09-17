import React from 'react'
import Slider from "react-slick";


const CenterMode = props => {
	const imgs = props.images

		const settings = {
			customPaging: function (i) {
				return (
					<img src={imgs[i]} alt={i} />
				);
			},
			dots: true,
			dotsClass: "slick-dots slick-thumb",
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 4000,
			pauseOnHover: true
		};
		return (
			<div>
				<Slider {...settings}>
					{imgs.map((url, i) => (
					<img key={i}
						src={url}
						alt="First slide"
					/>
					))}
				</Slider>
			</div>
		);
	
}
export default CenterMode

