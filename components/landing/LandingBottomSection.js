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
		filteredAllPosts: { noResult, byTag, byBody },
	},
}) => {
	const [shouldDisplay, setShouldDisplay] = useState(null);
	useEffect(() => {
		if (noResult) {
			return setShouldDisplay([]);
		}
		if (Boolean(byTag?.length > 0 || byBody?.length > 0)) {
			let newArr = [];
			if (byTag?.length > 0) {
				newArr.concat(byTag);
			}
			if (byBody?.length > 0) {
				let idArr = newArr.map((post) => post._id);
				newArr = [...newArr]
					.concat(byBody.filter((sub) => !idArr.includes(sub._id)))
					.slice(0, 10);
			}

			return setShouldDisplay(newArr);
		}
	}, [byTag, byBody, noResult]);

	useEffect(() => {}, [shouldDisplay]);

	const styles = useStyles();
	return (
		<div
			className={clsx(
				styles.container,
				noResult && styles.containerNoResult,
				Boolean(byTag?.length > 0 || byBody?.length > 0) &&
					styles.containerWithResult
			)}
		>
			<div
				className={clsx(
					styles.contentContainer,
					noResult && styles.contentContainerNoResult,
					Boolean(byTag?.length > 0 || byBody?.length > 0) &&
						styles.contentContainerWithResult
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
