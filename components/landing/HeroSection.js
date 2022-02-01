import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Types from "../../state/Types";
import { isMobile } from "mobile-device-detect";
import HeroImage from "../../public/penWithCoffeeAndRoses.jpg";
import clsx from "clsx";
import gsap from "gsap";
import PopupCardSection from "./PopupCardSection";
import LandingTopSection from "./LandingTopSection";

const overlayTimeout = 800;
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
		position: "absolute",
		top: 0,
		left: 0,
		transition: "background-color 0.3s ease-in-out",
		overflow: "hidden",

		"& > span": {
			zIndex: -1,
		},
	},
	innerContainer: {
		display: "grid",
		position: "absolute",
		top: "64px",
		left: 0,
		width: "100vw",
		height: "100vh",
		gridTemplateRows: "calc(70vh - 64px) 30vh",
		gridTemplateColumns: "1fr",
		gridTemplateAreas: '"search" "featured"',
	},
	overlayFadeIn: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	overlayEmphasized: {
		backgroundColor: "rgba(0, 0, 0, 0.7) !important",
	},
	image: {
		zIndex: -1,
	},
}));

const HeroSection = ({
	props: { poemCardArray },
	posts: { hasSearchResults },
}) => {
	const styles = useStyles();
	const [emphasizeOverlay, setEmphasizeOverlay] = useState(false);
	const [indexHovered, setIndexHovered] = useState(-1);
	useEffect(() => {
		console.log("indexHovered: ", indexHovered);
	}, [indexHovered]);

	const [shouldAnimateLandingEntrance, setShouldAnimateLandingEntrance] =
		useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	useEffect(() => {
		// setTimeout(() => {
		// }, overlayTimeout);
		if (shouldAnimateLandingEntrance) {
			animateSearchInputEntrance({ dispatch });
		}
	}, [shouldAnimateLandingEntrance]);

	return (
		<div className={styles.heroContainer}>
			<div
				className={clsx(
					styles.overlay,
					emphasizeOverlay && styles.overlayEmphasized
				)}
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
				<div className={styles.innerContainer}>
					<LandingTopSection setEmphasizeOverlay={setEmphasizeOverlay} />
					{!hasSearchResults && (
						<PopupCardSection
							poemCardArray={poemCardArray}
							shouldAnimateLandingEntrance={shouldAnimateLandingEntrance}
							setShouldAnimateLandingEntrance={setShouldAnimateLandingEntrance}
							emphasizeOverlay={emphasizeOverlay}
							indexHovered={indexHovered}
							setIndexHovered={setIndexHovered}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	posts: state.posts,
	props: props,
});

export default connect(mapStateToProps)(HeroSection);

const animateSearchInputEntrance = ({ dispatch }) => {
	let tl = gsap.timeline();
	tl.fromTo(
		`#${overlayId}`,
		{ backgroundColor: "rgba(0, 0, 0, 0)" },
		{ backgroundColor: "rgba(0, 0, 0, 0.35)", opacity: 1, duration: 1 }
	);

	tl.fromTo(
		"#landing-page-title-text",
		{
			y: "-100px",
			opacity: 0.0,
		},
		{
			y: "0px",
			opacity: 1,
			duration: 0.7,
			// onComplete: () => {
			// 	if (!isMobile) {
			// 		dispatch({
			// 			type: Types.SET_NAVBAR_HIDDEN,
			// 			payload: true,
			// 		});
			// 	}
			// },
		}
	);
	tl.fromTo(
		`#main-search-input-id`,
		{ y: "-100px", opacity: 0.0 },
		{
			y: "0px",
			opacity: 1,
			duration: 0.5,
			onComplete: () => {
				if (!isMobile) {
					dispatch({
						type: Types.SET_NAVBAR_HIDDEN,
						payload: true,
					});
				}
			},
		},
		">-=0.3"
	);
	// tl.fromTo(
	// 	`.popup-card-image-animated`,
	// 	{
	// 		scaleY: 0,
	// 		opacity: 0.0,
	// 		transformOrigin: "top center",
	// 	},
	// 	{
	// 		scaleY: 1,
	// 		opacity: 1,
	// 		duration: 0.5,
	// 		// onComplete: () => {
	// 		// 	if (!isMobile) {
	// 		// 		dispatch({
	// 		// 			type: Types.SET_NAVBAR_HIDDEN,
	// 		// 			payload: true,
	// 		// 		});
	// 		// 	}
	// 		// },
	// 		stagger: 0.1,
	// 	}
	// );
	tl.fromTo(
		`.popup-card-container-animated`,
		{
			opacity: 0.0,
			transform: "translateY(100%)",
			transformOrigin: "top center",
		},
		{
			transform: "translateY(0)",
			opacity: 1,
			duration: 1,
			// ease: "back.out(1.7)",
			ease: "elastic.out(1, 0.7)",
			// onComplete: () => {
			// 	if (!isMobile) {
			// 		dispatch({
			// 			type: Types.SET_NAVBAR_HIDDEN,
			// 			payload: true,
			// 		});
			// 	}
			// },
			stagger: 0.2,
		}
	);
	tl.fromTo(
		`.popup-card-container-animated`,
		{
			boxShadow: "0px 0px 8px #bebebe",
		},
		{
			boxShadow: "0px -5px 8px #bebebe",
			ease: "elastic.out(1, 0.7)",
			// onComplete: () => {
			// 	if (!isMobile) {
			// 		dispatch({
			// 			type: Types.SET_NAVBAR_HIDDEN,
			// 			payload: true,
			// 		});
			// 	}
			// },
			stagger: 0.2,
		},
		">-=0.5"
	);
};
