import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { isMobile } from "mobile-device-detect";
import Image from "next/image";
import Cookies from "cookies";
import { autoLoginOnFirstRequest } from "../../util/autoLogin";
import Submission from "../../models/Submission";
import mongoose from "mongoose";

const useStyles = makeStyles((theme) => ({
	byPostIdOuterContainer: {},
	byPostIdTitleContainer: {},
	byPostIdAuthorContainer: {},
	byPostIdBodyContainer: {},
}));

const byPostId = ({ specificPost }) => {
	console.log("specificPost: ", specificPost);
	const styles = useStyles();
	return (
		<div className={styles.byPostIdOuterContainer}>
			<div className={styles.byPostIdTitleContainer}>{specificPost.title}</div>
			<div className={styles.byPostIdAuthorContainer}>
				{specificPost.author.firstName}
			</div>
			<div className={styles.byPostIdBodyContainer}>{specificPost.body}</div>
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
	let specificPost = false;
	if (query.postId) {
		specificPost = await mongoose
			.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(async () => {
				let submission = await Submission.findById(query.postId).populate({
					path: "author",
					select: "firstName lastName _id email",
				});
				return submission;
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
			specificPost: JSON.parse(JSON.stringify(specificPost)),
		},
	};
};
