import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../state/Types";

const useStyles = makeStyles((theme) => ({
	modalContainer: {
		minHeight: "300px",
		maxHeight: "90vh",
		minWidth: "min(300px, 50vw)",
		maxWidth: "90vw",
		// width: "90vw",
		position: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, calc(-50% - 64px))",
		border: `1px solid ${theme.palette.secondary.dark}`,
		zIndex: "9999",
		borderRadius: "10px",
		backgroundColor: "#fff",
		// backgroundColor: "#e0e0e0",
		// boxShadow: "6px 6px 12px #bebebe",
		boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
	},
	modalContainerInner: {},
	topModalContainer: {
		backgroundColor: theme.palette.secondary.main,
		borderBottom: theme.palette.secondary.light,
		borderTopLeftRadius: "10px",
		borderTopRightRadius: "10px",
		padding: "0.75rem",
		boxShadow: "3px 3px 8px #bebebe",
	},
	bottomMiddleContainer: {
		padding: "1rem",
		// marginTop: "1rem",
	},
	titleText: {
		fontFamily: "'Roboto Condensed', sans-serif",
		fontSize: "1.25rem",
		color: "#fff",
	},
	bodyText: {
		fontFamily: "'Roboto Condensed', sans-serif",
		fontSize: "1rem",
	},
}));

const ViewSubmissionLargeModal = ({
	UI: {
		largeModal: { open: modalOpen, title, body, author, timeout },
	},
}) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	useEffect(() => {
		let _timeout = timeout || 3000;
		setTimeout(() => {
			dispatch({
				type: Types.RESET_LARGE_MODAL_DATA,
			});
		}, _timeout);
	}, []);
	return (
		<div className={styles.modalContainer}>
			<div className={styles.topModalContainer}>
				<span className={styles.titleText}>{title}</span>
			</div>
			<div className={styles.bottomMiddleContainer}>
				<span className={styles.bodyText}>{body}</span>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	UI: state.UI,
	props: props,
});

export default connect(mapStateToProps)(ViewSubmissionLargeModal);
