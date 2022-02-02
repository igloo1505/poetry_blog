import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { getByTag } from "../../state/poemActions";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	tagContainer: {
		padding: "0.5rem",
		borderRadius: "20px",
		// backgroundColor: theme.palette.secondary.light,
		color: "#fff",
		color: theme.palette.primary.main,
		border: `1px solid ${theme.palette.primary.light}`,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		flexWrap: "nowrap",
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			cursor: "pointer",
		},
	},
	tagContainerHovered: {
		backgroundColor: theme.palette.primary.dark,
		color: "#fff",
	},
	tagAnimatedBorder: {
		width: "100%",
		height: "2px",
		transform: "scaleX(0)",
		transformOrigin: "center",
		backgroundColor: theme.palette.secondary.light,
		transition: "transform 0.3s ease-in-out",
	},
	tagAnimatedBorderHovered: {
		width: "100%",
		height: "2px",
		transformOrigin: "center",
		transform: "scaleX(1)",
		backgroundColor: theme.palette.secondary.light,
	},
	tagSectionContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%",
		gap: "0.5rem",
	},
}));

const MyPostsCardTagSection = ({
	props: { tagArray },
	user: {
		isAuthenticated,
		user: { _id: userId },
	},
	posts: {
		filteredOwnPosts: { page: _page },
	},

	getByTag,
}) => {
	const styles = useStyles();
	const [byUser, setByUser] = useState(false);
	useEffect(() => {
		if (isAuthenticated && userId) {
			setByUser(userId);
		}
		if (!isAuthenticated || !userId) {
			setByUser(false);
		}
	}, [userId, isAuthenticated]);

	const handleTagClick = async (tag) => {
		let { success } = await getByTag({
			tagText: tag,
			byUser: Boolean(byUser),
			page: _page || 1,
			...(byUser && { userId: userId }),
		});
		console.log("getByTag success: ", success);
	};
	return (
		<div className={styles.tagSectionContainer}>
			{tagArray &&
				tagArray.map((tag, index) => {
					return (
						<MyPostCardTag
							key={`my-post-card-tag-${index}`}
							tag={tag}
							styles={styles}
							handleTagClick={handleTagClick}
						/>
					);
				})}
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	posts: state.posts,
	props: props,
});

export default connect(mapStateToProps, { getByTag })(MyPostsCardTagSection);

const MyPostCardTag = ({ tag, styles, handleTagClick }) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div
			className={clsx(
				styles.tagContainer,
				isHovered && styles.tagContainerHovered
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => handleTagClick(tag)}
		>
			<div
				className={clsx(
					styles.tagTextContainer,
					isHovered && styles.tagTextContainerHovered
				)}
			>
				{tag}
			</div>
			<div
				className={clsx(
					styles.tagAnimatedBorder,
					isHovered && styles.tagAnimatedBorderHovered
				)}
			></div>
		</div>
	);
};
