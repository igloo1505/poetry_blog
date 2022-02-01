import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import clsx from "clsx";
import PopupCard from "./popupCard";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "none",
		opacity: 0,
		position: "absolute",
		top: "70vh",
		left: "0",
		height: "100px",
		width: "100vw",
		zIndex: 99999,
		backgroundColor: theme.palette.primary.main,
	},
	containerResult: {},
	containerNoResult: {},
	contentContainer: {},
	contentContainerNoResult: {},
	contentContainerResult: {},
}));

const LandingSearchResults = ({
	props: { shouldDisplay, resultArray },
	posts: {
		filteredAllPosts: { noResult, byTag, byBody },
	},
}) => {
	const styles = useStyles();
	const [indexHovered, setIndexHovered] = useState(-1);
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
					resultArray.map((post, index) => {
						return (
							<PopupCard
								key={`card-search-result-${index}`}
								submission={post}
								// emphasizeOverlay={Boolean(
								// 	emphasizeOverlay || index === indexHovered
								// )}
								emphasizeOverlay={index === indexHovered}
								isFeatured={false}
								// featuredImage={images[index + 1].image}
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
	props: props,
});

export default connect(mapStateToProps)(LandingSearchResults);
