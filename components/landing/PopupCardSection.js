import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: "1rem",
	},
}));

const PopupCardSection = ({ poemCardArray }) => {
	console.log("poemCardArray: ", poemCardArray);
	const styles = useStyles();
	return <div className={styles.container}></div>;
};

export default PopupCardSection;
