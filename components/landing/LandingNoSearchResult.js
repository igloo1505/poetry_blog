import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import clsx from "clsx";
import PopupCard from "./popupCard";
import { Typography } from "@material-ui/core";
import { animateSearchNoResult } from "../../state/animations";

const useStyles = makeStyles((theme) => ({
	container: {
		// display: "none",
		opacity: 0,
		position: "absolute",
		top: "70vh",
		left: "0",
		height: "100px",
		width: "100vw",
		zIndex: 99999,
		height: "30vh",
		backgroundColor: theme.palette.primary.main,
	},
	containerResult: {},
	containerNoResult: {},
	contentContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
	},
	noResultText: {
		fontFamily: "'Roboto Condensed', sans-serif",
		fontSize: "2rem",
		color: "#fff",
		width: "fit-content",
		padding: "1rem",
	},
	contentContainerNoResult: {},
	contentContainerResult: {},
}));

const LandingBottomSectionNoResult = ({
	props: { shouldDisplay, resultArray },
	posts: {
		filteredAllPosts: { noResult, results },
	},
}) => {
	const styles = useStyles();
	useEffect(() => {
		if (noResult && !results?.length > 0) {
			animateSearchNoResult();
		}
	}, [noResult, results]);

	return (
		<div
			className={clsx(
				styles.container,
				noResult && styles.containerNoResult,
				shouldDisplay && styles.containerResult,
				"landing-search-no-results-container"
			)}
		>
			<div
				className={clsx(
					styles.contentContainer,
					noResult && styles.contentContainerNoResult,
					shouldDisplay && styles.contentContainerResult,
					"landing-search-no-results-content-container"
				)}
			>
				<Typography component="h1" variant="h5" className={styles.noResultText}>
					No Results Found
				</Typography>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	posts: state.posts,
	props: props,
});

export default connect(mapStateToProps)(LandingBottomSectionNoResult);
