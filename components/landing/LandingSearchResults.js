import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../state/Types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import clsx from "clsx";
import PopupCard from "./PopUpCardSearchResult";
import {
	animateSearchResult,
	animateAdditionalSearchResults,
	animateSearchReset,
} from "../../state/animations";

const paginateLimit = 10;

const useStyles = makeStyles((theme) => ({
	container: {
		// display: "none",
		// opacity: 0,
		// position: "absolute",
		// left: "0",
		// height: "100px",
		// width: "100vw",
		// // zIndex: 99999,
		// backgroundColor: theme.palette.primary.main,
		// top: "70vh",
		// height: "30vh",
		opacity: 0,
		position: "absolute",
		top: "70vh",
		left: "0",
		height: "100px",
		width: "100vw",
		zIndex: 99999,
		minHeight: "30vh",
		backgroundColor: theme.palette.primary.main,
		scaleY: 0,
	},
	containerResult: {
		height: "fit-content",
	},
	containerNoResult: {},
	contentContainer: {
		height: "100%  ",
		gap: "0rem",
		width: "100vw",
		display: "grid",
		gridTemplateColumns: "repeat(1, 1fr)",
		height: "100%",
		gridArea: "featured",
		overflow: "hidden",
		[theme.breakpoints.up(800)]: {
			gridTemplateColumns: "repeat(2, 1fr)",
		},
		[theme.breakpoints.up(1100)]: {
			gridTemplateColumns: "repeat(3, 1fr)",
		},
		// gridRowGap: "0.25rem",
	},
	widthTwo: {
		gridTemplateColumns: "repeat(2, 1fr)",
	},
	widthOne: {
		gridTemplateColumns: "repeat(1, 1fr)",
	},
	contentContainerNoResult: {},
	contentContainerResult: {},
}));

const LandingSearchResults = ({
	props: { shouldDisplay, resultArray },
	posts: {
		filteredAllPosts: { noResult, results, lastRequestedPage },
	},
	animations: { animateSearchResult: isAnimatingSearchResult },
}) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const [indexHovered, setIndexHovered] = useState(-1);
	const [lastResultLength, setLastResultLength] = useState(-1);
	console.log(
		"LandingSearchResults",
		shouldDisplay,
		results?.length > 0,
		results.length <= paginateLimit,
		!isAnimatingSearchResult
	);
	useEffect(() => {
		if (
			shouldDisplay &&
			results?.length > 0 &&
			results.length <= paginateLimit &&
			!isAnimatingSearchResult
		) {
			console.log("lastRequestedPage: ", lastRequestedPage);
			animateSearchResult();
		}
		if (results.length !== lastResultLength && lastResultLength >= 0) {
			animateAdditionalSearchResults({
				indexRange: {
					min: lastResultLength,
					max: results.length,
				},
			});
			// Handle other animation here and pass in the index of cards needing to be animated, or add class with the page they were retrieved on.
		}
		setLastResultLength(results.length);
	}, [noResult, results]);

	useEffect(
		(prevState) => {
			console.log("shouldDisplay: ", shouldDisplay);
			if (!shouldDisplay && !isAnimatingSearchResult) {
				animateSearchReset();
			}
		},
		[noResult, results]
	);

	// const handleScroll = () => {
	// 	console.log(
	// 		"Window",
	// 		window.scrollY,
	// 		window.innerHeight,
	// 		document.body.offsetHeight
	// 	);
	// 	if (typeof window !== "undefined") {
	// 		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
	// 			// you're at the bottom of the page
	//
	// 		}
	// 		if (
	// 			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
	// 			document.documentElement.offsetHeight
	// 		) {
	//
	// 			dispatch({
	// 				type: Types.GET_POSTS_LAZILY_LOADING,
	// 				payload: {
	// 					value: true,
	// 					key: "filteredAllPosts",
	// 				},
	// 			});
	// 		}
	// 	}
	// };

	// useEffect(() => {
	//
	// 	if (typeof window !== "undefined") {
	// 		window.addEventListener("scroll", handleScroll);
	// 	}
	// }, [indexHovered]);

	return (
		<div
			className={clsx(
				styles.container,
				noResult && styles.containerNoResult,
				shouldDisplay && styles.containerResult,
				"landing-search-results-container"
			)}
		>
			<div
				className={clsx(
					styles.contentContainer,
					noResult && styles.contentContainerNoResult,
					shouldDisplay && styles.contentContainerResult,
					"landing-search-results-content-container"
				)}
			>
				{resultArray &&
					resultArray.map((post, index, arr) => {
						return (
							<PopupCard
								key={`card-search-result-${index}`}
								submission={post}
								// emphasizeOverlay={Boolean(
								// 	emphasizeOverlay || index === indexHovered
								// )}
								emphasizeOverlay={index === indexHovered}
								shouldCheckVisible={index === arr.length - 1}
								isFeatured={false}
								textColor={"dark"}
								_index={index}
								indexHovered={indexHovered}
								setIndexHovered={setIndexHovered}
							/>
						);
					})}
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	posts: state.posts,
	animations: state.UI.animations,
	props: props,
});

export default connect(mapStateToProps)(LandingSearchResults);
