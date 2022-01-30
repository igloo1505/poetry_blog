import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
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
		// position: "absolute",
		// bottom: 0,
		// transform: "translateY(-100%)",
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
	},
	text: {},
	image: {
		width: "100%",
		height: "100%",
		// transform: "scaleY(0)",
		// opacity: 0,

		// opacity: 0,
	},
}));

const PopupCard = ({ submission, featuredImage, _index }) => {
	console.log("submission: ", submission);
	const styles = useStyles();
	const [animatedIn, setAnimatedIn] = useState(true);
	const handleCardClick = () => {
		console.log("Clicked", featuredImage);
	};
	return (
		<div
			className={clsx(
				styles.popupCardContainer,
				"popup-card-container-animated",
				animatedIn && styles.popupCardContainerIn
			)}
			onClick={handleCardClick}
		>
			<div
				className={clsx(
					styles.topContainer,
					"popup-card-top-container-animated"
				)}
			>
				<Image
					src={featuredImage}
					alt="Featured Image"
					layout="fill"
					objectFit="cover"
					className={clsx(styles.image, "popup-card-image-animated")}
					id={`imageId-${_index}`}
				/>
				<span
					variant="h6"
					component="div"
					sx={{ flexGrow: 1, fontFamily: "'Roboto Condensed', sans-serif" }}
				>
					{submission.title}
				</span>
			</div>
			<div
				className={clsx(
					styles.bottomContainer,
					"popup-card-bottom-container-animated"
				)}
			>
				{submission.body}
			</div>
		</div>
	);
};

export default PopupCard;
