import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import gsap from "gsap";
import { useRouter } from "next/router";
import LandingNoSearchResult from "./LandingNoSearchResult";
import LandingSearchResults from "./LandingSearchResults";

const useStyles = makeStyles((theme) => ({
	container: {},
	containerNoResult: {},
	containerWithResult: {},
	contentContainer: {
		paddingBottom: "1rem",
	},
}));
const LandingBottomSection = ({
	posts: {
		filteredAllPosts: { noResult, results },
	},
}) => {
	const styles = useStyles();
	return (
		<div
			className={clsx(
				styles.container,
				noResult && styles.containerNoResult,
				results && styles.containerWithResult
			)}
		>
			<div
				className={clsx(
					styles.contentContainer,
					noResult && styles.contentContainerNoResult,
					results && styles.contentContainerWithResult
				)}
			>
				{noResult && <LandingNoSearchResult />}
				{Boolean(results && results?.length > 0) && (
					<LandingSearchResults
						resultArray={results}
						shouldDisplay={Boolean(results && results?.length > 0)}
					/>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	posts: state.posts,
	props: props,
});

export default connect(mapStateToProps)(LandingBottomSection);
