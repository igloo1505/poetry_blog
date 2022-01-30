import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { isMobile } from "mobile-device-detect";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
	popupCardContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gridTemplateAreas: '"popupCardTop" "popupCardBottom"',
		transform: "translateY(100%)",
		// transform: "scaleY(0)",
		// opacity: 0,
	},
	popupCardContainerIn: {
		// boxShadow: "0px -5px 8px #bebebe",
		transition: "box-shadow 0.3s ease-in-out",
		"&:hover": {
			boxShadow: "0px -3px 4px #bebebe !important",
		},
	},
	popupCardSubdue: {
		boxShadow: "0px -1px 8px #bebebe !important",
	},
	popupCardSubduedark: {
		boxShadow: "0px -1px 8px #bebebe !important",
	},
	popupCardSubduelight: {
		boxShadow: "0px -1px 8px #bebebe !important",
	},

	topContainer: {
		position: "relative",
		height: "70%",
		maxHeight: "70%",
		width: "100%",
		objectFit: "cover",
		gridArea: "popupCardTop",
	},
	bottomContainer: {
		height: "30%",
		maxHeight: "30%",
		backgroundColor: "#fff",
		padding: "1rem",
		gridArea: "popupCardBottom",
		width: "100%",
		position: "relative",
	},
	text: {},
	viewButton: {
		position: "absolute",
		bottom: "0",
		left: "50%",
		transform: "translateX(-50%)",
		// backgroundColor: `${theme.palette.primary.main}cc`,
		backgroundColor: `#fff`,
		width: "100%",
		padding: "0.25rem",
		color: "#fff",
		boxShadow: "0px -2px 8px #bebebe",
		color: `${theme.palette.primary.light}ff`,
		backgroundColor: theme.palette.primary.main,
		color: `#fff`,
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			color: `#fff`,
			backgroundColor: theme.palette.primary.dark,
			boxShadow: "0px -1px 4px #bebebe",
			cursor: "pointer",
		},
	},
	mobileViewButton: {
		// color: `${theme.palette.primary.main}ff`,
		backgroundColor: "#fff",
		boxShadow: "0px -2px 8px #bebebe",
		// boxShadow: `0px -5px 8px ${theme.palette.primary.main}`,
	},

	image: {
		zIndex: -1,
	},
	imageOverlayDiv: {
		width: "100%",
		height: "100%",
		zIndex: 1,
		transition: "all 0.5s ease-in-out",
		"&:hover": {
			backgroundColor: "rgba(0,0,0,0.5)",
			cursor: "pointer",
		},
	},
	imageOverlayDark: {
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	titleTextContainer: {
		position: "absolute",
		top: "8px",
		left: "8px",
		maxWidth: "50%",
		textAlign: "left",
	},
	titleText: {
		// color: "#fff",
		fontSize: "2rem",
		fontWeight: "400",
		// fontStyle: "italic",
		fontFamily: "'Roboto Condensed', sans-serif",
		// textShadow: "3px 3px 4px #fff, -3px -3px 4px #000",
	},
	textLight: {
		color: "#fff",
		transition: "all 0.3s ease-in-out",
	},
	textDark: {
		color: "#000",
		transition: "all 0.3s ease-in-out",
	},
	textLightEmphasize: {
		color: "#fff",
	},
	textDarkEmphasize: {
		color: "#fff",
	},
	"subdueText-light": {
		transition: "all 0.3s ease-in-out",
		color: "#fff",
	},
	"subdueText-dark": {
		transition: "all 0.3s ease-in-out",
		color: "#fff",
	},
}));

const PopupCard = ({
	submission,
	featuredImage,
	_index,
	shouldAnimateLandingEntrance,
	setShouldAnimateLandingEntrance,
	emphasizeOverlay,
	textColor,
	indexHovered,
	setIndexHovered,
}) => {
	console.log("submission: ", submission);
	const styles = useStyles();
	const [animatedIn, setAnimatedIn] = useState(true);
	const handleCardClick = () => {
		console.log("Clicked", featuredImage);
	};
	console.log("textColor: ", textColor);
	return (
		<div
			className={clsx(
				styles.popupCardContainer,
				"popup-card-container-animated",
				animatedIn && styles.popupCardContainerIn
			)}
			onClick={handleCardClick}
			onMouseEnter={() => setIndexHovered(_index)}
			onMouseLeave={() => setIndexHovered(-1)}
		>
			<div
				className={clsx(
					styles.topContainer,
					"popup-card-top-container-animated"
				)}
			>
				<div
					className={clsx(
						styles.imageOverlayDiv,
						emphasizeOverlay && styles.imageOverlayDark
					)}
				>
					<Image
						src={featuredImage}
						alt="Featured Image"
						layout="fill"
						objectFit="cover"
						className={clsx(styles.image, "popup-card-image-animated")}
						id={`imageId-${_index}`}
						onLoad={() => {
							if (!shouldAnimateLandingEntrance) {
								setShouldAnimateLandingEntrance(true);
							}
						}}
					/>
					<div className={styles.titleTextContainer}>
						<span
							variant="h6"
							component="div"
							className={clsx(
								styles.titleText,
								textColor === "light" && styles.textLight,
								textColor === "dark" && styles.textDark,
								emphasizeOverlay && styles?.[`subdueText-${textColor}`]
							)}
						>
							{submission.title}
						</span>
					</div>
				</div>
			</div>
			<div
				className={clsx(
					styles.bottomContainer,
					"popup-card-bottom-container-animated"
				)}
			>
				<div className={styles.bodyText}>{submission.body}</div>
				<div
					className={clsx(
						styles.viewButton
						// isMobile && styles.mobileViewButton
					)}
				>
					View
				</div>
			</div>
		</div>
	);
};

export default PopupCard;
