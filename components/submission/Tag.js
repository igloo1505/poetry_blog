import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	tag: {
		width: "fit-content",
		padding: "0.5rem",
		border: "1px solid blue",
		borderRadius: "20px",
		backgroundColor: theme.palette.primary.dark,
		color: "#fff",
		boxShadow: "8px 8px 18px #bebebe, -8px -8px 18px #ffffff",
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			boxShadow: "5px 5px 8px #bebebe, -5px -5px 8px #ffffff",
			cursor: "pointer",
		},
	},
}));

const Tag = ({ tag }) => {
	const [doesMatchQuery, setDoesMatchQuery] = useState(false);
	const styles = useStyles();
	const handleTagClick = () => {
		console.log("Filter by tag here");
		// TODO getBySingleTag route on click and filter accordingly
	};

	return (
		<div
			className={clsx(styles.tag, doesMatchQuery && styles.matchingTag)}
			onClick={handleTagClick}
		>
			{tag}
		</div>
	);
};

export default Tag;
