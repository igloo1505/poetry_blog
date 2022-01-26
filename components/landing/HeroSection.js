import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Image from "next/image";
import HeroImage from "../../public/penWithCoffeeAndRoses.jpg";
import clsx from "clsx";
import gsap from "gsap";

const overlayTimeout = 2000;
const overlayId = "hero-overlay-id";
const imageId = "hero-image-id";

const useStyles = makeStyles((theme) => ({
	heroContainer: {
		backgroundColor: "#fafafa",
		height: "100vh",
		width: "100vw",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		zIndex: 1,
		// border: "5px solid red",
	},
	overlay: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0)",
		transition: "background-color 0.3s ease-in-out",
	},
	overlayFadeIn: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.2)",
	},
	image: {
		zIndex: -1,
	},
}));

const HeroSection = () => {
	const styles = useStyles();
	const [overlayFadeIn, setOverlayFadeIn] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			// setOverlayFadeIn(true);
			animateEntrance();
		}, overlayTimeout);
	}, []);

	return (
		<div className={styles.heroContainer}>
			<div
				className={clsx(styles.overlay, overlayFadeIn && styles.overlayFadeIn)}
				id={overlayId}
			>
				<Image
					src={HeroImage}
					alt="Dramatic Poetry with Roses"
					layout="fill"
					objectFit="cover"
					className={styles.image}
					id={imageId}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	...props,
});

export default connect(mapStateToProps)(HeroSection);

const animateEntrance = () => {
	let tl = gsap.timeline();
	tl.fromTo(
		`#${overlayId}`,
		{ backgroundColor: "rgba(0, 0, 0, 0)" },
		{ backgroundColor: "rgba(0, 0, 0, 0.35)", opacity: 1, duration: 1 }
	);
};
