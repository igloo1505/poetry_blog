import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import clsx from "clsx";
import { AiFillCloseCircle } from "react-icons/ai";

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
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "nowrap",
		gap: "0.25rem",
		cursor: "default",
		"&:hover": {
			boxShadow: "5px 5px 8px #bebebe, -5px -5px 8px #ffffff",
		},
	},
	containerLeft: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: "3px",
		cursor: "default",
	},
	clickable: {
		"&:hover": {
			cursor: "pointer",
		},
	},
}));

const Tag = ({ tag, showClose, onClose, clickable, _onClick }) => {
	const [doesMatchQuery, setDoesMatchQuery] = useState(false);
	const styles = useStyles();
	// const handleTagClick = () => {
	// 	console.log("Filter by tag here");
	// 	// TODO getBySingleTag route on click and filter accordingly
	// };

	return (
		<div
			className={clsx(
				styles.tag,
				doesMatchQuery && styles.matchingTag,
				clickable && styles.clickable
			)}
			onClick={clickable ? _onClick : null}
		>
			{showClose && (
				<div
					className={clsx(styles.containerLeft, showClose && styles.clickable)}
					onClick={(e) =>
						onClose({
							event: e,
							tag: tag,
						})
					}
				>
					<AiFillCloseCircle />
				</div>
			)}
			<div className={styles.containerLeft}>{tag}</div>
		</div>
	);
};

export default Tag;
