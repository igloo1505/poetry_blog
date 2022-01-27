import React from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";

const useStyles = makeStyles((theme) => ({
	mainInput: {
		position: "absolute",
		fontSize: "3rem !important",
		left: "50%",
		top: "50%",
		transform: "translate(-50%, -50%)",
		zIndex: 9999,
		borderRadius: "50px",
		padding: "0.75rem 1rem",
		border: "none",
		fontFamily: "'Roboto Condensed', sans-serif",
		transition: "all 0.3s ease-in-out",
		border: "4px solid #fff",
		"&:focus-visible": {
			outline: "none",
			// border: "1px solid #000",
			border: `4px solid ${theme.palette.primary.main}`,
			boxShadow: "20px 20px 19px #7b7b7a, -20px -20px 19px #a3a3a2",
		},
	},
	innerContainer: {},
	outerContainer: {
		// position: "absolute",
		// fontSize: "3rem !important",
		zIndex: 9999,
	},
}));

const mainSearchInputId = "main-search-input-id";

const MainSearchInput = () => {
	const styles = useStyles();
	return (
		<div className={styles.outerContainer} id={mainSearchInputId}>
			<div className={styles.innerContainer}>
				<input
					type="text"
					// placeholder="Search for a poem..."
					placeholder="Search..."
					className={styles.mainInput}
				/>
			</div>
		</div>
	);
};

export default MainSearchInput;
