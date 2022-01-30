import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import PopupCard from "./popupCard";
import FeaturedImageOne from "../../public/penWithCoffeeAndRoses.jpg";
import FeaturedImageTwo from "../../public/clutteredOldDesk.jpg";
import FeaturedImageThree from "../../public/girlReadingOutside.jpg";
import FeaturedImageFour from "../../public/pagesFoldedHeart.jpg";

const useStyles = makeStyles((theme) => ({
	container: {
		// display: "flex",
		// flexDirection: "row",
		// justifyContent: "center",
		// alignItems: "center",
		gap: "0rem",
		width: "100vw",
		display: "grid",
		// gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
}) => {
	console.log("poemCardArray: ", poemCardArray);
	const styles = useStyles();
	let images = {
		1: FeaturedImageOne,
		2: FeaturedImageTwo,
		3: FeaturedImageThree,
	};
	return (
		<div className={styles.bottomSectionContainer}>
			<div className={styles.container}>
				{poemCardArray &&
					poemCardArray.map((poem, index) => {
						return (
							<PopupCard
								submission={poem}
								key={`pop-up-featured-card-${index}`}
								featuredImage={images[index + 1]}
								_index={index}
								shouldAnimateLandingEntrance={shouldAnimateLandingEntrance}
								setShouldAnimateLandingEntrance={
									setShouldAnimateLandingEntrance
								}
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
