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
	byPostIdOuterContainer: {},
	byPostIdInnerContainer: {},
}));

const byPostId = ({ specificUser }) => {
	console.log("specificUser: ", specificUser);
	const styles = useStyles();
	return (
		<div className={styles.byPostIdOuterContainer}>
			<div className={styles.byPostIdInnerContainer}></div>
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
