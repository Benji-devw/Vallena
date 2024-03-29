import React from 'react'
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


function SampleNextArrow(props) {
	const { style, onClick } = props;
	return (
		<IoIosArrowForward
			className={'slick-arrow slick-n'}
			style={{
				...style,
				display: "block",
				fontSize: "2.5em",
			}}
			onClick={onClick}
		/>
	);
}
function SamplePrevArrow(props) {
	const { style, onClick } = props;
	return (
		<IoIosArrowBack
			className={'slick-arrow slick-p'}
			style={{
				...style,
				display: "block",
				fontSize: "2.5em",
			}}
			onClick={onClick}
		/>
	);
}


const CenterMode = props => {
	// const imgs = props.images.slice(1)		// cut first image
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
			autoplay: false,
			autoplaySpeed: 4000,
			pauseOnHover: true,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};
		return (
			<div>
				<Slider {...settings} style={{cursor:"pointer"}}>
					{imgs.map((url, i) => (
					<img key={i} 
						className=""
						src={url}
						alt={i}
					/>
					))}
				</Slider>
			</div>
		);
	
}
export default CenterMode

