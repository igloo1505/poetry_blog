import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import * as Types from "../../state/Types";
import Tag from "./Tag";

const useStyles = makeStyles((theme) => ({
	submissionFormTagContainer: {
		width: "100%",
		margin: "1rem 2rem",
		padding: "0.5rem",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		flexWrap: "wrap",
		gap: "0.75rem",
	},
}));

const TagFormSection = ({ tagArray }) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const handleRemoveTag = ({ event, tag }) => {
		console.log("_tag: ", tag);
		dispatch({
			type: Types.REMOVE_TAG,
			payload: tag,
		});
	};
	return (
		<div className={styles.submissionFormTagContainer}>
			{tagArray?.map((tag, index) => {
				return (
					<Tag
						tag={tag}
						key={`submission-tag-${index}`}
						showClose
						onClose={handleRemoveTag}
					/>
				);
			})}
		</div>
	);
};

export default TagFormSection;
