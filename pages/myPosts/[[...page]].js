import React from "react";
import Cookies from "cookies";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import Submission from "../../models/Submission";
import mongoose from "mongoose";
import PopupCard from "../../components/landing/popupCard";
import MyPostCard from "../../components/myPosts/myPostCard";
import SearchMyPostsForm from "../../components/myPosts/SearchMyPostsForm";

const paginateOffset = 10;

const useStyles = makeStyles((theme) => ({
	outerContainer: {
		display: "flex",
		flexDirection: "row",
		// alignItems: "center",
		justifyContent: "space-around",
		width: "min(100vw, 900px)",
		height: "fit-content",
		marginTop: "64px",
		padding: "2rem 1.5rem",
		marginLeft: "50%",
		transform: "translateX(-50%)",
		// border: "1px solid red",
		// gap: "0.75rem",
	},
	containerLeft: {
		width: "50%",
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
		width: "50%",
	},
}));

const myPosts = ({ userSubmissions }) => {
	console.log("userSubmissions in component: ", userSubmissions);
	const styles = useStyles();
	return (
		<div className={styles.outerContainer}>
			<div className={styles.containerLeft}>
				<SearchMyPostsForm />
			</div>
			<div className={styles.containerRight}>
				{userSubmissions.map((submission, index) => (
					<MyPostCard
						submission={submission}
						key={`user-submission-${index}`}
					/>
				))}
			</div>
		</div>
	);
};

export default myPosts;

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
