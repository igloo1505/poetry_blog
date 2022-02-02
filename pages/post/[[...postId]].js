import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import gsap from "gsap";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
import Tag from "../../components/app/Tag";
import Image from "next/image";
import Cookies from "cookies";
import { autoLoginOnFirstRequest } from "../../util/autoLogin";
import Submission from "../../models/Submission";
import mongoose from "mongoose";

const byPostTitleDivId = "by-post-title-div-id-animated";
const authorDivId = "by-post-author-div-id-animated";
const bodySpanId = "by-post-body-span-class-animated";

const useStyles = makeStyles((theme) => ({
	byPostIdOuterContainer: {
		width: "calc(100% - 4rem)",
		height: "100%",
		minHeight: "calc(100vh - 64px)",
		margin: "64px 2rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		// opacity: 0
	},
	byPostIdTagContainer: {
		width: "100%",
		height: "auto",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		flexWrap: "wrap",
		marginTop: "1.5rem",
	},
	byPostIdTitleContainer: {
		margin: "0.5rem 0 0 0",
		fontSize: "2rem",
		fontWeight: "400",
		fontFamily: "'Roboto Condensed', sans-serif",
		opacity: 0,
	},
	byPostIdTitleContainerHovered: {
		margin: "0.5rem 0 0 0",
		fontSize: "2rem",
		fontWeight: "400",
		fontFamily: "'Roboto Condensed', sans-serif",
		opacity: 0,
	},
	byPostIdAuthorContainerBorderAnim: {
		width: "100%",
		height: "2px",
		transition: "all 0.5s ease",
		transformOrigin: "center",
		transform: "scaleX(0)",
		// backgroundColor: theme.palette.primary.main,
	},
	byPostIdAuthorContainerBorderAnimHovered: {
		backgroundColor: theme.palette.secondary.main,
		transform: "scaleX(1)",
	},
	byPostIdAuthorContainer: {
		margin: "0.5rem 0 1rem 0",
		padding: "0.5rem",
		transition: "all 0.3s ease-in-out",
		opacity: 0,
		border: `1px solid ${theme.palette.primary.main}`,
		color: theme.palette.primary.dark,
		// "&:hover": {
		// 	cursor: "pointer",
		// 	backgroundColor: theme.palette.primary.main,
		// 	color: "#fff",
		// },
	},
	byPostIdAuthorContainerHovered: {
		cursor: "pointer",
		backgroundColor: theme.palette.primary.main,
		color: "#fff",
		borderRadius: "0.5rem",
		// border: `1px solid ${theme.palette.secondary.main}`,
		boxShadow: "5px 5px 8px #bebebe, -5px -5px 8px #ffffff",
	},
	byPostIdBodyContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: "0.5rem",
		// opacity: 0,
	},
	byPostIdBodySpan: {
		display: "block",
		textAlign: "center",
		opacity: 0,
	},
}));

const byPostId = ({ specificPost }) => {
	console.log("specificPost: ", specificPost);
	const [authorHovered, setAuthorHovered] = useState(false);
	const styles = useStyles();
	const router = useRouter();

	useEffect(() => {
		animateEntrance();
	}, []);

	const redirectToAuthor = () => {
		let _authorId = specificPost?.author?._id;
		if (_authorId) {
			router.push(`/author/${_authorId}`);
		}
	};

	return (
		<div className={styles.byPostIdOuterContainer}>
			<div
				className={clsx(
					styles.byPostIdTitleContainer,
					authorHovered && styles.byPostIdTitleContainerHovered
				)}
				id={byPostTitleDivId}
				// onMouseEnter={() => setAuthorHovered(true)}
				// onMouseLeave={() => setAuthorHovered(false)}
			>
				{specificPost.title}
			</div>
			<div
				className={clsx(
					styles.byPostIdAuthorContainer,
					authorHovered && styles.byPostIdAuthorContainerHovered
				)}
				id={authorDivId}
				onClick={redirectToAuthor}
				onMouseEnter={() => setAuthorHovered(true)}
				onMouseLeave={() => setAuthorHovered(false)}
			>
				{specificPost.author.firstName}
				<div
					className={clsx(
						styles.byPostIdAuthorContainerBorderAnim,
						authorHovered && styles.byPostIdAuthorContainerBorderAnimHovered
					)}
				/>
			</div>
			<div className={styles.byPostIdBodyContainer}>
				{specificPost.body.split(/\r?\n/).map((t, i) => (
					<span
						key={`text-${i}`}
						className={clsx(styles.byPostIdBodySpan, bodySpanId)}
					>
						{t}
					</span>
				))}
			</div>
			<div className={styles.byPostIdTagContainer}>
				{specificPost.tags.map((t, i) => {
					return <Tag tag={t} key={`Tag-${i}`} />;
				})}
			</div>
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
	console.log("query: ", query);
	console.log("Did run in /post/:id");
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

const animateEntrance = () => {
	let tl = gsap.timeline();
	tl.fromTo(
		`#${byPostTitleDivId}`,
		{
			opacity: 0,
			y: "-50px",
		},
		{
			opacity: 1,
			duration: 0.3,
			y: "0px",
			ease: "power3.inOut",
		}
	);
	tl.fromTo(
		`#${authorDivId}`,
		{
			opacity: 0,
			y: "-50px",
		},
		{
			opacity: 1,
			y: "0px",
			duration: 0.3,
			ease: "power3.inOut",
		},
		"-=0.15"
	);
	tl.fromTo(
		`.${bodySpanId}`,
		{
			opacity: 0,
			y: "-50px",
		},
		{
			opacity: 1,
			y: "0px",
			stagger: 0.1,
			// ease: "power3.inOut",
			ease: "elastic.out(1, 0.7)",
		},
		"+=0.5"
	);
};
