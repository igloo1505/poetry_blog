import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import { queryAllSubmissions } from "../../state/poemActions";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import * as Types from "../../state/Types";
import { animateSearchReset } from "../../state/animations";
import { useRouter } from "next/router";

const clearButtonId = "landingSearchClearButton";

const useStyles = makeStyles((theme) => ({
	mainInput: {
		position: "relative",
		fontSize: "3rem !important",
		zIndex: 9999,
		borderRadius: "50px",
		padding: "0.75rem 1rem",
		border: "none",
		fontFamily: "'Roboto Condensed', sans-serif",
		transition: "all 0.3s ease-in-out",
		border: "8px solid #fff",
		"&:focus-visible": {
			outline: "none",
			border: `8px solid ${theme.palette.primary.main}`,
			boxShadow: "5px 5px 15px #7b7b7a, -5px -5px 15px #a3a3a2",
		},
	},
	innerContainer: {},
	outerContainer: {
		zIndex: 9999,
		transform: "translateY(-100px)",
		opacity: 0,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	clearButtonContainer: {
		padding: "0.5rem 1rem",
		width: "fit-content",
		margin: "1rem",
		borderRadius: "10px",
		backgroundColor: theme.palette.primary.main,
		transition: "all 0.3s ease-in-out",
		boxShadow: "10px 10px 16px #777674, -10px -10px 16px #a1a09e",
		visibility: "hidden",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		// opacity: 0,
		transform: "scale(0)",
		"&:hover": {
			cursor: "pointer",
			// boxShadow: "5px 5px 8px #bebebe, -5px -5px 8px #ffffff",
			boxShadow: "5px 5px 10px #777674, -5px -5px 10px #a1a09e",
			backgroundColor: theme.palette.primary.dark,
		},
	},
	clearButtonContainerHovered: {
		cursor: "pointer",
		boxShadow: "5px 5px 10px #777674, -5px -5px 10px #a1a09e",
		backgroundColor: theme.palette.primary.dark,
	},
	clearButtonText: {
		fontSize: "1.5rem",
		color: "#fff",
	},
	clearButtonUnderline: {
		width: "100%",
		height: "2px",
		backgroundColor: theme.palette.secondary.main,
		transform: "scaleX(0)",
		transformOrigin: "center",
		transition: "all 0.3s ease-in-out",
	},
	clearButtonUnderlineHovered: {
		transform: "scaleX(1)",
	},
}));

const mainSearchInputId = "main-search-input-id";

const MainSearchInput = ({
	props: { setEmphasizeOverlay, resetRouteShallowLikeMyEx },
	posts: {
		filteredAllPosts: { page: _page },
		mainSearchQuery,
	},
	queryAllSubmissions,
}) => {
	const styles = useStyles();
	const router = useRouter();
	const dispatch = useDispatch();
	const [clearButtonHovered, setClearButtonHovered] = useState(false);
	const setSearchQuery = (newVal) => {
		dispatch({
			type: Types.SET_MAIN_SEARCH_QUERY,
			payload: newVal,
		});
	};
	// const [searchQuery, setSearchQuery] = useState({
	// 	query: "",
	// });

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("sending query all submissions request: ");
		let { success } = queryAllSubmissions({
			searchQuery: mainSearchQuery,
			page: _page || 1,
		});
		console.log("success: ", success);
	};

	const clearSearchResults = (e) => {
		e.preventDefault();
		animateSearchReset();
		setSearchQuery("");
		resetRouteShallowLikeMyEx();
	};

	return (
		<div className={styles.outerContainer} id={mainSearchInputId}>
			<div className={styles.innerContainer}>
				<input
					type="text"
					placeholder="Search for a poem..."
					className={styles.mainInput}
					onFocus={() => setEmphasizeOverlay(true)}
					onBlur={() => setEmphasizeOverlay(false)}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						router.push(`/${e.target.value}`, undefined, { shallow: true });
					}}
					value={mainSearchQuery}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSubmit(e);
						}
					}}
				/>
			</div>
			<div
				className={clsx(
					styles.clearButtonContainer,
					clearButtonHovered && styles.clearButtonContainerHovered
				)}
				onMouseEnter={() => setClearButtonHovered(true)}
				onMouseLeave={() => setClearButtonHovered(false)}
				id={clearButtonId}
				onClick={clearSearchResults}
			>
				<a className={styles.clearButtonATag}>
					<Typography
						component="h1"
						variant="h5"
						className={styles.clearButtonText}
					>
						Clear
					</Typography>
					<div
						className={clsx(
							styles.clearButtonUnderline,
							clearButtonHovered && styles.clearButtonUnderlineHovered
						)}
					/>
				</a>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	posts: state.posts,
	props: props,
});

export default connect(mapStateToProps, { queryAllSubmissions })(
	MainSearchInput
);
