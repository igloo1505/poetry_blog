import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
// import HeroSection from "../components/landing/HeroSection";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import * as Types from "../state/Types";
import { autoLoginOnFirstRequest } from "../util/autoLogin";
import Cookies from "cookies";
import mongoose from "mongoose";
import Submission from "../models/Submission";
// import LandingBottomSection from "../components/landing/LandingBottomSection";
import { connect } from "react-redux";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { queryAllSubmissions } from "../state/poemActions";

const LandingBottomSection = dynamic(() =>
	import("../components/landing/LandingBottomSection")
);
const HeroSection = dynamic(() => import("../components/landing/HeroSection"), {
	ssr: false,
});

const useStyles = makeStyles((theme) => ({
	container: {
		padding: "0rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
		overflow: "hidden",
		height: "100vh",
		maxHeight: "100vh",
		width: "100vw",
		position: "absolute",
		[theme.breakpoints.up(768)]: {
			padding: "0 2rem",
		},
	},
	overflowVisible: {
		overflow: "visible !important",
		maxHeight: "unset",
	},
	main: {
		minHeight: "100vh",
		padding: "4rem 0",
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	footer: {
		display: "flex",
		flex: 1,
		padding: "2rem 0",
		borderTop: "1px solid #eaeaea",
		justifyContent: "center",
		alignItems: "center",
		width: "100vw",
	},
	footer: {
		"& a": {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexGrow: 1,
		},
	},

	// @media (max-width: 600px) {
	// 	.grid {
	// 		width: 100%;
	// 		flex-direction: column;
	// 	}
	// }
}));

const Home = ({
	latestSubmissions,
	posts: {
		hasSearchResults,
		featuredPosts,
		filteredAllPosts: { noResult, queryResults, page: _page },
	},
	queryAllSubmissions,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		if (router?.query?.currentQuery && router?.query?.currentQuery[0]) {
			console.log("Params in useEffect hoook", router);
			console.log("router.query.currentQuery: ", router.query.currentQuery[0]);
			console.log("sending query all submissions request: ");
			let { success } = queryAllSubmissions({
				searchQuery: router.query.currentQuery[0],
				page: _page || 1,
			});
		}
	}, [router.query]);

	const resetRouteShallowLikeMyEx = () => {
		router.push("/", undefined, { shallow: true });
	};

	// const styles = useStyles();
	useEffect(() => {
		if (latestSubmissions?.length > 0 && !hasSearchResults) {
			dispatch({
				type: Types.SET_FEATURED_POSTS,
				payload: latestSubmissions.slice(0, 3),
			});
		}
	}, [hasSearchResults, noResult, queryResults]);
	return (
		<div
			className={clsx(
				styles.container,
				hasSearchResults && styles.overflowVisible
			)}
			id="index-container-main"
		>
			<Head>
				<title>Poetry Blog</title>
				<meta name="description" content="A quick weekend blog." />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preload" as="stylesheet" href="../styles/Home.module.css" />
			</Head>
			<HeroSection
				poemCardArray={featuredPosts}
				resetRouteShallowLikeMyEx={resetRouteShallowLikeMyEx}
			/>
			<LandingBottomSection poemCardArray={featuredPosts} />
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	posts: state.posts,
	props: props,
});

export default connect(mapStateToProps, { queryAllSubmissions })(Home);

export const getStaticProps = async (ctx) => {
	// let _user = await autoLoginOnFirstRequest(ctx.req, ctx.res);
	const _queryResults = false;
	let latestSubmissions = await mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(async () => {
			console.log("Query param: ", ctx.query);
			let r = await Submission.find()
				.sort({ createdAt: -1 })
				.limit(10)
				.populate({
					path: "author",
					select: "firstName lastName email _id",
				});
			return r;
		});
	return {
		props: {
			// hasUser: _user,
			latestSubmissions: JSON.parse(JSON.stringify(latestSubmissions)),
			queryResults: _queryResults,
			revalidate: 10,
		},
	};
};

export async function getStaticPaths(ctx) {
	console.log("ctx: ", ctx);
	return {
		paths: [
			{ params: { currentQuery: ["William Shakespeare"] } },
			{ params: { currentQuery: null } },
		],
		fallback: true,
	};
}
