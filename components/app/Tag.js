import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
// import * as Types from "../../state/Types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.palette.primary.main,
		borderRadius: "20px",
		padding: "0.5rem 1rem",
		color: "#fff",
		boxShadow: `8px 8px 16px ${theme.palette.grey[400]}, -8px -8px 16px ${theme.palette.grey[300]}`,
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			cursor: "pointer",
			boxShadow: `5px 5px 10px ${theme.palette.grey[400]}, -5px -5px 10px ${theme.palette.grey[300]}`,
			backgroundColor: theme.palette.secondary.main,
		},
	},
	borderBottom: {
		height: "2px",
		width: "100%",
		backgroundColor: theme.palette.secondary.main,
		transition: "all 0.5s ease",
		"&:hover": {
			// backgroundColor: theme.palette.primary.main,
		},
	},
	borderBottomHovered: {
		backgroundColor: theme.palette.primary.main,
	},
}));

const Tag = ({ tag }) => {
	const styles = useStyles();
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div
			className={styles.container}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{tag}
			<div
				className={clsx(
					styles.borderBottom,
					isHovered && styles.borderBottomHovered
				)}
			/>
		</div>
	);
};

export default Tag;
