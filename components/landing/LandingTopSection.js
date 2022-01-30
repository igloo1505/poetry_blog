import React from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import MainSearchInput from "./MainSearchInput";
import LandingTitle from "./LandingTitle";

const useStyles = makeStyles((theme) => ({
	topContainer: {
		position: "relative",
		height: "100%",
		gridArea: "search",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const LandingTopSection = ({ setEmphasizeOverlay }) => {
	const styles = useStyles();
	return (
		<div className={styles.topContainer}>
			<LandingTitle />
			<MainSearchInput setEmphasizeOverlay={setEmphasizeOverlay} />
		</div>
	);
};

export default LandingTopSection;
