import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Types from "../../state/Types";
import { isMobile } from "mobile-device-detect";
import MainSearchInput from "./MainSearchInput";
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
		"& > span": {
			zIndex: -1,
		},
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
	const router = useRouter();
	const dispatch = useDispatch();
	useEffect(() => {
		setTimeout(() => {
			animateEntrance({ dispatch });
		}, overlayTimeout);
	}, []);

	return (
		<div className={styles.heroContainer}>
			<div className={clsx(styles.overlay)} id={overlayId}>
				<MainSearchInput />
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

const animateEntrance = ({ dispatch }) => {
	let tl = gsap.timeline();
	tl.fromTo(
		`#${overlayId}`,
		{ backgroundColor: "rgba(0, 0, 0, 0)" },
		{ backgroundColor: "rgba(0, 0, 0, 0.35)", opacity: 1, duration: 1 }
	);
	tl.fromTo(
		`#main-search-input-id`,
		{ x: 0, opacity: 0.0 },
		{
			x: "100vw",
			opacity: 1,
			duration: 1,
			onComplete: () => {
				if (!isMobile) {
					dispatch({
						type: Types.SET_NAVBAR_HIDDEN,
						payload: true,
					});
				}
			},
		}
	);
};
