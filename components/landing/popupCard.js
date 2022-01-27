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

const popupCard = ({ poem }) => {
	const styles = useStyles();
	return (
		<div className={styles.outerContainer}>
			<div className={styles.topContainer}></div>
			<div className={styles.bottomContainer}></div>
		</div>
	);
};

export default popupCard;
