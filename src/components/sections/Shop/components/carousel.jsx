import React from 'react'
import Slider from "react-slick";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
	SideBySideMagnifier,
	MOUSE_ACTIVATION,
	TOUCH_ACTIVATION
} from "react-image-magnifiers";

function SampleNextArrow(props) {
	const { style, onClick } = props;
	return (
		<svg
			className={'slick-arrow slick-n'}
			style={{
				...style,
				transform: 'rotate(180deg)',
			}}
			onClick={onClick}
		/>
	);
}
function SamplePrevArrow(props) {
	const { onClick } = props;
	return (
		<svg
			className={'slick-arrow slick-p'}
			onClick={onClick}
		/>
	);
}


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
			autoplay: false,
			autoplaySpeed: 4000,
			pauseOnHover: true,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};
		return (
			<div>
				<Slider {...settings}>
					{imgs.map((url, i) => (
						<SideBySideMagnifier
							key={i}
							className=""
							imageSrc={url}
							alwaysInPlace={true}
							overlayOpacity={0.6}
							// switchSides={false}
							zoomPosition="left"
							// inPlaceMinBreakpoint={641}
							// fillAvailableSpace={false}
							// fillAlignTop={false}
							mouseActivation={MOUSE_ACTIVATION.CLICK} // Optional
							touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP} // Optional
							zoomContainerBorder="1px solid #ccc"
							// zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
						/>
					))}
				</Slider>
			</div>
		);
	
}
export default CenterMode

