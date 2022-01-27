import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	outerContainer: {
		minHeight: "150px",
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
	BottomContainer: {},
	text: {},
}));

const myPostCard = ({ submission }) => {
	const styles = useStyles();

	return (
		<div className={styles.outerContainer}>
			<div className={styles.topContainer}>
				<span
					variant="h6"
					component="div"
					sx={{ flexGrow: 1, fontFamily: "'Roboto Condensed', sans-serif" }}
				>
					{submission.title}
				</span>
			</div>
			<div className={styles.bottomContainer}></div>
		</div>
	);
};

export default myPostCard;
