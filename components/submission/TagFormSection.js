import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import Tag from "./Tag";

const TagFormSection = ({ tagArray }) => {
	return (
		<div>
			<div>Tag goes here</div>
			{tagArray.map((tag, index) => {
				return <Tag tag={tag} key={`submission-tag-${index}`} />;
			})}
		</div>
	);
};

export default TagFormSection;
