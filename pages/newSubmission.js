import React from "react";
import SubmissionForm from "../components/submission/submissionForm";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { autoLoginOnFirstRequest } from "../util/autoLogin";
import Cookies from "cookies";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		minHeight: "calc(100vh - 64px)",
		padding: "1rem 0px",
		[theme.breakpoints.up(800)]: {
			// backgroundColor: green[500],
			justifyContent: "center",
		},
	},
}));

const NewSubmission = () => {
	const styles = useStyles();
	return (
		<div className={styles.container}>
			<SubmissionForm />
		</div>
	);
};

export default NewSubmission;

export const getServerSideProps = async ({ req, res }) => {
	console.log("req: ", req);
	let cookies = new Cookies(req, res);
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
		},
	};
};
