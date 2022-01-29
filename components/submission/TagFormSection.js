import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
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
	return (
		<div className={styles.submissionFormTagContainer}>
			{tagArray?.map((tag, index) => {
				return <Tag tag={tag} key={`submission-tag-${index}`} />;
			})}
		</div>
	);
};

export default TagFormSection;
