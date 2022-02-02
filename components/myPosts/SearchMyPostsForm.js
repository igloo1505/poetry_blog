import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import * as Types from "../../state/Types";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Copyright from "../authentication/Copyright";
import { connect, useDispatch } from "react-redux";
import { queryOwnSubmissions } from "../../state/poemActions";
import { BsSearch } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
	formContainer: {},
	formRow: {},
	formInput: {},
	searchButton: {
		margin: "0.75rem 0",
		// marginLeft: "0.25rem",
		// marginRight: "0.25rem",
	},
	clearSearchButton: {
		margin: "0.75rem 0",
		backgroundColor: theme.palette.error.main,
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			backgroundColor: theme.palette.error.dark,
		},
		// marginLeft: "0.25rem",
		// marginRight: "0.25rem",
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
	formMain: {
		width: "100%",
	},
	formOuterContainer: {
		height: "fit-content",
		width: "100%",
		borderRadius: "10px",
	},
	formInnerContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		height: "fit-content",
		width: "100%",
		minWidth: "100%",
		padding: "0.75rem 1rem",
	},
	outerGridContainer: {},
}));

const SearchMyPostsForm = ({
	user: {
		isAuthenticated,
		user: { _id: userId },
	},
	forms: { searchOwnPostsForm: searchFormData },
	posts: { filteredAllPosts, filteredOwnPosts },
	queryOwnSubmissions,
}) => {
	const dispatch = useDispatch();
	const styles = useStyles();

	const setSearchFormData = (newData) => {
		dispatch({
			type: Types.SET_SEARCH_OWN_POSTS_SEARCH_INPUT,
			payload: newData,
		});
	};

	useEffect(() => {
		if (userId && isAuthenticated) {
			setSearchFormData({
				...searchFormData,
				page: filteredOwnPosts.page,
				userId,
			});
		}
	}, []);

	const handleSearchClick = () => {
		queryOwnSubmissions(searchFormData);
	};
	const handleClearSearchClick = (e) => {
		dispatch({
			type: Types.CLEAR_OWN_QUERY_RESULTS,
		});
	};

	return (
		<Grid container component="main" className={styles.outerGridContainer}>
			<CssBaseline />
			<Grid
				item
				component={Paper}
				elevation={6}
				square
				className={styles.formOuterContainer}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
					className={styles.formInnerContainer}
				>
					<Avatar sx={{ m: 1 }} className={styles.avatar}>
						<BsSearch />
					</Avatar>
					<Typography component="h1" variant="h5">
						Search
					</Typography>
					<Box
						component="form"
						noValidate
						sx={{ mt: 1 }}
						className={styles.formMain}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="searchUserPosts"
							label="Search Posts"
							name="searchQuery"
							autoFocus
							onChange={(e) => {
								setSearchFormData({
									...searchFormData,
									[e.target.name]: e.target.value,
								});
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									e.stopPropagation();
									handleSearchClick();
								}
								console.log("Submit here");
							}}
							value={searchFormData.searchQuery}
						/>
						<div className={styles.buttonContainer}>
							<Button
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={handleSearchClick}
								className={styles.searchButton}
							>
								Search
							</Button>
							{Boolean(
								filteredOwnPosts.results > 0 || filteredOwnPosts.noResult
							) && (
								<Button
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									onClick={handleClearSearchClick}
									className={styles.clearSearchButton}
								>
									Clear
								</Button>
							)}
						</div>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	posts: state.posts,
	forms: state.forms,
	props: props,
});

export default connect(mapStateToProps, { queryOwnSubmissions })(
	SearchMyPostsForm
);
