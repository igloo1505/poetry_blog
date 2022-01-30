import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import PopupCard from "./popupCard";
import FeaturedImage_A from "../../public/pagesFoldedHeart.jpg";
import FeaturedImage_B from "../../public/clutteredOldDesk.jpg";
// import FeaturedImage_C from "../../public/girlReadingOutside.jpg";
import FeaturedImage_C from "../../public/lonelyDudeWithARose.jpg";

const useStyles = makeStyles((theme) => ({
	container: {
		gap: "0rem",
		width: "100vw",
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		// height: "30vw",
		height: "100%",
		gridArea: "featured",
		// transform: "translateX(-50%)",
	},
	bottomSectionContainer: {
		position: "relative",
		bottom: 0,
		left: "50%",
		transform: "translateX(-50%)",
		height: "100%",
		// transform: "translate(-50%, 100%)",
	},
	bottomSectionContainerIn: {
		// transform: "translate(-50%, 100%)",
		transform: "translateX(-50%)",
	},
}));

const PopupCardSection = ({
	poemCardArray,
	shouldAnimateLandingEntrance,
	setShouldAnimateLandingEntrance,
	emphasizeOverlay,
	indexHovered,
	setIndexHovered,
}) => {
	console.log("poemCardArray: ", poemCardArray);
	const styles = useStyles();
	let images = {
		1: {
			image: FeaturedImage_A,
			textColor: "light",
		},
		2: {
			image: FeaturedImage_B,
			textColor: "light",
		},
		3: {
			image: FeaturedImage_C,
			textColor: "dark",
		},
	};

	return (
		<div className={styles.bottomSectionContainer}>
			<div className={styles.container}>
				{poemCardArray &&
					poemCardArray.map((poem, index) => {
						return (
							<PopupCard
								submission={poem}
								emphasizeOverlay={Boolean(
									emphasizeOverlay || index === indexHovered
								)}
								key={`pop-up-featured-card-${index}`}
								featuredImage={images[index + 1].image}
								textColor={images[index + 1].textColor}
								_index={index}
								shouldAnimateLandingEntrance={shouldAnimateLandingEntrance}
								setShouldAnimateLandingEntrance={
									setShouldAnimateLandingEntrance
								}
								indexHovered={indexHovered}
								setIndexHovered={setIndexHovered}
							/>
						);
					})}
			</div>
			<FooterSection />
		</div>
	);
};

export default PopupCardSection;

const useFooterStyles = makeStyles((theme) => ({
	footer: {
		display: "flex",
		flex: 1,
		padding: "2rem 0",
		borderTop: "1px solid #eaeaea",
		justifyContent: "center",
		alignItems: "center",
		width: "100vw",
		transform: "scaleY(0)",
		display: "none",
	},
}));

const FooterSection = () => {
	const styles = useFooterStyles();
	return (
		<footer className={styles.footer}>
			<a
				href="https://www.igloodevelopment.dev/"
				target="_blank"
				rel="noopener noreferrer"
			>
				By Andrew Mueller
			</a>
		</footer>
	);
};
