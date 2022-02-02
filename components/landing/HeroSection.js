import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Types from "../../state/Types";

import HeroImage from "../../public/penWithCoffeeAndRoses.jpg";
import clsx from "clsx";
import gsap from "gsap";
import PopupCardSection from "./PopupCardSection";
import LandingTopSection from "./LandingTopSection";
import {
	animateLandingWithFeatured,
	animateLandingWithoutCards,
} from "../../state/animations";

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
	useEffect(() => {}, [indexHovered]);

	const [shouldAnimateLandingEntrance, setShouldAnimateLandingEntrance] =
		useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	useEffect(() => {
		// setTimeout(() => {
		// }, overlayTimeout);
		if (shouldAnimateLandingEntrance) {
			if (!hasSearchResults) {
				animateLandingWithFeatured();
			}
			if (hasSearchResults) {
				animateLandingWithoutCards();
			}
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
					<PopupCardSection
						poemCardArray={poemCardArray}
						shouldAnimateLandingEntrance={shouldAnimateLandingEntrance}
						setShouldAnimateLandingEntrance={setShouldAnimateLandingEntrance}
						emphasizeOverlay={emphasizeOverlay}
						indexHovered={indexHovered}
						setIndexHovered={setIndexHovered}
					/>
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
