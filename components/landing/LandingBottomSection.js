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
	const [shouldDisplay, setShouldDisplay] = useState(null);
	useEffect(() => {
		if (noResult) {
			return setShouldDisplay([]);
		}
		if (results?.length > 0) {
			return setShouldDisplay(results);
		}
	}, [results, noResult]);

	useEffect(() => {}, [shouldDisplay]);

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
				{Boolean(shouldDisplay && shouldDisplay?.length > 0) && (
					<LandingSearchResults
						resultArray={shouldDisplay}
						shouldDisplay={Boolean(shouldDisplay && shouldDisplay?.length > 0)}
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
