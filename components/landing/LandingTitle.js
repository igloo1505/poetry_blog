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
		margin: "1rem",
		padding: "0",
		fontSize: "3rem",
		opacity: 0,
		[theme.breakpoints.up(1280)]: {
			fontSize: "5rem",
			margin: "2rem",
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
