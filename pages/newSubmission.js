import React from "react";
import SubmissionForm from "../components/submission/submissionForm";
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
