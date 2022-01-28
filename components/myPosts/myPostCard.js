import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import * as Types from "../../state/Types";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	outerContainer: {
		minHeight: "100px",
		width: "100%",
		minWidth: "min(300px, 50vw)",
		border: "1px solid #e0e0e0",
		borderRadius: "10px",
		// padding: "0.75rem",
	},
	topContainer: {
		backgroundColor: theme.palette.primary.dark,
		borderTopLeftRadius: "10px",
		borderTopRightRadius: "10px",
		padding: "0.5rem",
		color: "#fff",
		borderBottom: `1px solid ${theme.palette.primary.light}`,
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			boxShadow: "6px 6px 12px #bebebe",
			cursor: "pointer",
		},
	},
	bottomContainer: { padding: "0.5rem 0.5rem 0 0.5rem" },
	buttonContainer: {
		padding: "0.5rem",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	containedButton: {
		backgroundColor: theme.palette.primary.light,
		color: "#fff",
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			backgroundColor: theme.palette.primary.dark,
		},
	},
	outlinedButton: {
		border: `1px solid ${theme.palette.primary.light}`,
		"&:hover": {
			backgroundColor: theme.palette.primary.dark,
		},
	},
	editButton: {
		backgroundColor: theme.palette.warning.main,
		"&:hover": {
			backgroundColor: theme.palette.warning.dark,
		},
	},
	text: {},
}));

const myPostCard = ({
	props: { submission },
	user: {
		isAuthenticated,
		user: { _id: userId },
	},
}) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const [isOwnCard, setIsOwnCard] = useState(false);

	useEffect(() => {
		console.log("Submission", submission);
		let authorId = submission?.author?._id;
		console.log("userId: ", userId);
		console.log("authorId: ", authorId);
		if (authorId === userId) {
			setIsOwnCard(true);
		}
		if (authorId !== userId) {
			setIsOwnCard(false);
		}
	}, []);

	const handleCardClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		dispatch({
			type: Types.SET_LARGE_MODAL_DATA,
			payload: submission,
		});
	};

	return (
		<div className={styles.outerContainer}>
			<div className={styles.topContainer} onClick={handleCardClick}>
				<span
					variant="h6"
					component="div"
					sx={{ flexGrow: 1, fontFamily: "'Roboto Condensed', sans-serif" }}
				>
					{submission.title}
				</span>
			</div>
			<div className={styles.bottomContainer}>{submission.body}</div>
			{isOwnCard && (
				<div className={styles.buttonContainer}>
					<Button
						variant="contained"
						className={clsx(styles.containedButton, styles.editButton)}
					>
						Edit
					</Button>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	props: props,
});

export default connect(mapStateToProps)(myPostCard);
