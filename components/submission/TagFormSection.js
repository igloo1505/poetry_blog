import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { gsap } from "gsap";
import * as Types from "../../state/Types";
import Tag from "./Tag";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	submissionFormTagContainer: {
		width: "100%",
		maxWidth: "100%",
		margin: "1rem 2rem",
		padding: "0.5rem",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		flexWrap: "wrap",
		gap: "0.75rem",
	},
	noTagsText: {
		opacity: 0,
		transition: "all 0.5s ease-in-out",
		position: "absolute",
		zIndex: -99999,
	},
	noTagsTextIn: {
		opacity: 1,
		position: "absolute",
		transition: "all 0.5s ease-in-out",
	},
}));

const TagFormSection = ({ tagArray }) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const [animateIn, setAnimateIn] = useState(false);
	useEffect(() => {
		if (tagArray && tagArray.length > 0) {
			console.log("Animate in");
			setAnimateIn(false);
		}
		if (!tagArray || tagArray.length === 0) {
			console.log("Animate out");
			setAnimateIn(true);
		}
	}, [tagArray]);

	const handleRemoveTag = ({ event, tag }) => {
		dispatch({
			type: Types.REMOVE_TAG,
			payload: tag,
		});
	};
	return (
		<div className={styles.submissionFormTagContainer}>
			{Boolean(tagArray && tagArray.length > 0) &&
				// 	tagArray?.map((tag, index) => {
				// 		return (
				// 			<Tag
				// 				tag={tag}
				// 				key={`submission-tag-${index}`}
				// 				showClose
				// 				onClose={handleRemoveTag}
				// 			/>
				// 		);
				// 	})
				// ) : (
				// 	<Typography
				// 		variant="body1"
				// 		color="textSecondary"
				// 		className={clsx(styles.noTagsText, animateIn && styles.noTagsTextIn)}
				// 	>
				// 		No tags added yet.
				// 	</Typography>
				// )}

				// {Boolean(tagArray && tagArray.length > 0) ? (
				tagArray?.map((tag, index) => {
					return (
						<Tag
							tag={tag}
							key={`submission-tag-${index}`}
							showClose
							onClose={handleRemoveTag}
						/>
					);
				})}
			<Typography
				variant="body1"
				color="textSecondary"
				className={clsx(styles.noTagsText, animateIn && styles.noTagsTextIn)}
			>
				No tags added yet.
			</Typography>
		</div>
	);
};

export default TagFormSection;
