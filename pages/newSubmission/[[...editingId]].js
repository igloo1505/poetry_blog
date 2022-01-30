import React from "react";
import SubmissionForm from "../../components/submission/submissionForm";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { autoLoginOnFirstRequest } from "../../util/autoLogin";
import Cookies from "cookies";
import Submission from "../../models/Submission";
import mongoose from "mongoose";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		minHeight: "calc(100vh - 64px)",
		padding: "1rem 0px",
		justifyContent: "flex-start",
		marginTop: "64px",
		[theme.breakpoints.up(800)]: {
			// backgroundColor: green[500],xj
			justifyContent: "center",
		},
	},
}));

const NewSubmission = ({ isEditing, editingSubmission, hasUser }) => {
	console.log(
		"isEditing, editingSubmission, hasUser: ",
		isEditing,
		editingSubmission,
		hasUser
	);
	const styles = useStyles();
	// TODO add check here and handle appropriately if unauthenticated
	return (
		<div className={styles.container}>
			<SubmissionForm
				isEditing={isEditing}
				editingSubmission={editingSubmission}
			/>
		</div>
	);
};

export default NewSubmission;

export const getServerSideProps = async ({ req, res, query }) => {
	let cookies = new Cookies(req, res);
	let isEditing = false;
	let editingSubmission = false;
	if (query.editingId) {
		editingSubmission = await mongoose
			.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(async () => {
				let submission = await Submission.findById(query.editingId);
				if (submission) {
					isEditing = true;
				}
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
			isEditing: isEditing,
			editingSubmission: JSON.parse(JSON.stringify(editingSubmission)),
		},
	};
};
