import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import Cookies from "cookies";
import Submission from "../../models/Submission";
import mongoose from "mongoose";
import MyPostCard from "../../components/myPosts/myPostCard";
import SearchMyPostsForm from "../../components/myPosts/SearchMyPostsForm";
import { gsap } from "gsap";

const myPostCardClassName = "my-post-card-animated-class";

const paginateOffset = 10;

const useStyles = makeStyles((theme) => ({
	outerContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "min(100vw, 900px)",
		height: "fit-content",
		marginTop: "64px",
		padding: "2rem 1.5rem",
		gap: "1rem",
		width: "100%",
		// transform: "translateX(-50%)",
		// marginLeft: "50%",
		[theme.breakpoints.up(800)]: {
			gap: "1.5rem",
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "flex-start",
		},
		[theme.breakpoints.up(980)]: {
			gap: "1.5rem",
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "flex-start",
		},
		[theme.breakpoints.up(1280)]: {
			gap: "2.5rem",
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "flex-start",
		},
		// border: "1px solid red",
		// gap: "0.75rem",
	},
	containerLeft: {
		width: "100%",
		maxWidth: "600px",
		[theme.breakpoints.up(800)]: {
			width: "50%",
		},
	},
	containerRight: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "min(300px, 50vw)",
		height: "100%",
		// marginTop: "64px",
		gap: "0.75rem",
		width: "100%",
		margin: "0 2rem",
		[theme.breakpoints.up(800)]: {
			width: "50%",
		},
	},
	noResultsText: {},
	noResultsContainer: {},
}));

const myPosts = ({
	props: { userSubmissions },
	posts: { filteredOwnPosts },
}) => {
	console.log("userSubmissions in component: ", userSubmissions);
	const [currentDisplayedArray, setCurrentDisplayedArray] = useState([]);
	useEffect(() => {
		if (filteredOwnPosts.byBody || filteredOwnPosts.byTag) {
			let newArr = [];
			if (filteredOwnPosts?.byBody?.length > 0) {
				// setCurrentDisplayedArray(filteredOwnPosts);
				newArr = [...newArr, ...filteredOwnPosts.byBody];
			}
			if (filteredOwnPosts?.byTag?.length > 0) {
				// setCurrentDisplayedArray(filteredOwnPosts);
				newArr = [...newArr, ...filteredOwnPosts.byTag];
			}
			setCurrentDisplayedArray(newArr);
		}
		if (
			Boolean(
				!filteredOwnPosts ||
					Boolean(
						filteredOwnPosts?.byBody?.length === 0 &&
							filteredOwnPosts?.byTag?.length === 0
					)
			) &&
			userSubmissions?.length > 0
		) {
			setCurrentDisplayedArray(userSubmissions);
		}
	}, [userSubmissions, filteredOwnPosts]);

	useEffect(() => {
		animateEntrance();
	}, [currentDisplayedArray]);

	const styles = useStyles();
	return (
		<div className={styles.outerContainer}>
			<div className={styles.containerLeft}>
				<SearchMyPostsForm />
			</div>
			<div className={styles.containerRight}>
				{filteredOwnPosts.noResult ? (
					<NoResult styles={styles} />
				) : (
					currentDisplayedArray.map((submission, index) => (
						<MyPostCard
							submission={submission}
							key={`user-submission-${index}`}
						/>
					))
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

export default connect(mapStateToProps)(myPosts);

export const getServerSideProps = async (ctx) => {
	// TODO add paginate to route params, but for now:
	let page = 0;
	// let _user = await autoLoginOnFirstRequest(ctx.req, ctx.res);
	let cookies = new Cookies(ctx.req, ctx.res);
	let userId = cookies.get("userId");
	let userSubmissions = false;
	if (userId) {
		userSubmissions = await mongoose
			.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(async () => {
				let _submissions = await Submission.find({ author: userId })
					.limit(paginateOffset)
					.skip(paginateOffset * page)
					.populate({
						path: "author",
						select: "firstName lastName _id",
					});
				return _submissions;
			});
	}
	return {
		props: {
			// hasUser: _user,
			userSubmissions: JSON.parse(JSON.stringify(userSubmissions)),
		},
	};
};

const NoResult = ({ styles }) => {
	return (
		<div className={styles.noResultsContainer}>
			<Typography variant="h5" component="h2" className={styles.noResultsText}>
				No results found
			</Typography>
		</div>
	);
};

const animateEntrance = () => {
	gsap.fromTo(
		`.${myPostCardClassName}`,
		{
			opacity: 0,
			y: "-50px",
			scaleY: 0,
			transformOrigin: "50% 0%",
		},
		{
			opacity: 1,
			y: "0px",
			scaleY: 1,
			duration: 0.2,
			stagger: 0.1,
			// ease: "power3.inOut",
			ease: "back.out(1.7)",
		}
	);
};
