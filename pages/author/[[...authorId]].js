import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { isMobile } from "mobile-device-detect";
import Image from "next/image";
import Cookies from "cookies";
import { autoLoginOnFirstRequest } from "../../util/autoLogin";
import User from "../../models/User";
import mongoose from "mongoose";

const useStyles = makeStyles((theme) => ({
	byAuthorOuterContainer: {
		width: "calc(100% - 4rem)",
		height: "100%",
		minHeight: "calc(100vh - 64px)",
		margin: "64px 2rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	byAuthorTitleContainer: {
		margin: "0.5rem 0 0 0",
		fontSize: "2rem",
		fontWeight: "400",
		fontFamily: "'Roboto Condensed', sans-serif",
	},
	byAuthorSubtitleContainer: {
		margin: "0.5rem 0 1rem 0",
		"&:hover": {
			cursor: "pointer",
		},
	},
	byAuthorRecentPostsSection: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: "0.5rem",
	},
}));

const byPostId = ({ specificUser }) => {
	console.log("specificUser: ", specificUser);
	const styles = useStyles();
	return (
		<div className={styles.byAuthorOuterContainer}>
			<div className={styles.byAuthorTitleContainer}>{specificUser.title}</div>
			<div
				className={styles.byAuthorSubtitleContainer}
				// onClick={redirectToPost}
			>
				{specificUser.firstName} {specificUser.lastName}
			</div>
			<div className={styles.byAuthorRecentPostsSection}></div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	post: state.posts,
	user: state.user,
	props: props,
});

export default connect(mapStateToProps)(byPostId);

export const getServerSideProps = async ({ req, res, query }) => {
	let cookies = new Cookies(req, res);
	let specificUser = false;
	if (query.authorId) {
		specificUser = await mongoose
			.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(async () => {
				let _user = await User.findById(query.authorId);
				return _user;
			});
	}
	let hasUser = false;
	let token = cookies.get("token");
	let userId = cookies.get("userId");
	let rememberMe = cookies.get("rememberMe");
	if (!userId || !token) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	if (userId && token) {
		if (rememberMe) {
			hasUser = await autoLoginOnFirstRequest(req, res);
		}
	}
	return {
		props: {
			hasUser: hasUser,
			specificUser: JSON.parse(JSON.stringify(specificUser)),
		},
	};
};
