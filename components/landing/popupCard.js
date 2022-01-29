import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	outerContainer: {},
	topContainer: {},
	BottomContainer: {},
	text: {},
}));

const PopupCard = ({ submission }) => {
	console.log("submission: ", submission);
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

export default PopupCard;