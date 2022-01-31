import React from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	titleContainer: {},
	titleText: {
		fontFamily: "'Roboto Condensed', sans-serif",
		// color: theme.palette.primary.main,
		color: "#fff",
		textAlign: "center",
		margin: "0 0 1.5rem 0",
		padding: "0",
		fontSize: "3rem",
		opacity: 0,
		lineHeight: 1,
		[theme.breakpoints.up(1280)]: {
			fontSize: "5rem",
			// margin: "2rem",
			margin: "0 0 2rem 0",
		},
		// opacity: 0,
	},
}));

const LandingTitle = () => {
	const styles = useStyles();
	return (
		<div className={styles.titleContainer}>
			<Typography
				variant="h1"
				className={styles.titleText}
				id="landing-page-title-text"
			>
				Find what speaks to you
			</Typography>
		</div>
	);
};

export default LandingTitle;
