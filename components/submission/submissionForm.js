import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { registerNewUser } from "../../state/userActions";
import { newSubmission, updatePost } from "../../state/poemActions";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import * as Types from "../../state/Types";
import { BiPen } from "react-icons/bi";
import { gsap } from "gsap";
import TagFormSection from "./TagFormSection";

const formContainerId = "submissionFormContainer";

const useStyles = makeStyles((theme) => ({
	card: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		maxWidth: "min(800px, 85vw)",
		width: "85vw",
		[theme.breakpoints.up(980)]: {
			width: "70vw",
		},
		[theme.breakpoints.up(1280)]: {
			width: "80vw",
		},
	},
	formContainerMain: {
		width: "100%",
	},
	cardInner: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		backgroundColor: theme.palette.secondary.main,
	},
	tagInputMain: {},
	tagInputContainer: {
		padding: "0 0 0 1rem !important",
	},
	submitButton: {
		margin: "1.5rem 0 !important",
	},
	editButton: {
		margin: "1.5rem 0 !important",
		backgroundColor: `${theme.palette.warning.main} !important`,
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			backgroundColor: `${theme.palette.warning.dark} !important`,
		},
	},
	cancelButton: {
		margin: "0 0 1.5rem 0 !important",
	},
}));

const submissionForm = ({
	newSubmission,
	updatePost,
	forms: { submissionForm: formData },
	user: {
		isAuthenticated,
		user: { _id: userId },
	},
	isEditing,
	editingSubmission,
}) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	useEffect(() => {
		animateFormEntrance();
	}, []);

	const setFormData = (newData) => {
		dispatch({
			type: Types.SET_SUBMISSION_FORM,
			payload: {
				...newData,
				isEditing: isEditing,
				editingSubmissionId: editingSubmission._id,
			},
		});
	};
	const resetForm = () => {
		dispatch({
			type: Types.RESET_SUBMISSION_FORM,
		});
	};

	useEffect(() => {
		if (isEditing) {
			setFormData(editingSubmission);
		}
		if (!isEditing) {
			resetForm();
		}
	}, [isEditing, editingSubmission]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const observeTagInput = (e) => {
		if (e.key === "Enter" && e.target.value.length >= 3) {
			dispatch({
				type: Types.SET_NEW_TAG_SUBMISSION_FORM,
			});
		}
	};

	const handleEdit = async (e) => {
		// newSubmission(formData);
		let editSubmission = {
			fields: {
				title: formData.title,
				body: formData.body,
				tags: formData.tags,
			},
			submissionId: editingSubmission._id,
			userId: userId,
		};
		let { success } = await updatePost(editSubmission);

		if (success) {
			router.push("/myPosts");
		}
	};
	const handleSubmit = (e) => {
		newSubmission(formData);
	};
	const handleCancelEdit = (e) => {
		if (typeof window !== "undefined") {
			window.history.pushState({}, document.title, "/" + "newSubmission");
		}
		resetForm();
	};

	return (
		<div className={styles.card} id={formContainerId}>
			<div className={styles.cardInner}>
				<Avatar
					sx={{ m: 1, bgcolor: "secondary.main" }}
					className={styles.icon}
				>
					<BiPen />
				</Avatar>
				<Typography component="h1" variant="h5">
					New Post
				</Typography>
			</div>
			<Box
				component="form"
				noValidate
				sx={{ mt: 3 }}
				className={styles.formContainerMain}
			>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12}>
						<TextField
							required
							fullWidth
							id="title"
							onChange={handleChange}
							label="Title"
							name="title"
							value={formData.title}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="body"
							label="Body"
							name="body"
							multiline
							minRows={5}
							value={formData.body}
							onChange={handleChange}
						/>
					</Grid>
					<TagFormSection tagArray={formData.tags} />
					<Grid item xs={12} className={styles.tagInputContainer}>
						<TextField
							fullWidth
							id="currentTagInput"
							label="Tags"
							name="currentTag"
							value={formData.currentTag}
							onChange={handleChange}
							onKeyDown={observeTagInput}
							className={styles.tagInputMain}
						/>
					</Grid>
				</Grid>
				<Button
					fullWidth
					variant="contained"
					onClick={formData.isEditing ? handleEdit : handleSubmit}
					className={
						formData.isEditing ? styles.editButton : styles.submitButton
					}
				>
					{formData.isEditing ? "Edit" : "Submit"}
				</Button>
				{formData.isEditing && (
					<Button
						fullWidth
						variant="contained"
						onClick={handleCancelEdit}
						className={styles.cancelButton}
					>
						Cancel
					</Button>
				)}
			</Box>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	forms: state.forms,
	props: props,
});

export default connect(mapStateToProps, { newSubmission, updatePost })(
	submissionForm
);

const animateFormEntrance = () => {
	gsap.fromTo(
		`#${formContainerId}`,
		{
			opacity: 0,
			y: -100,
			ease: "power3.inOut",
		},
		{ opacity: 1, y: 0 }
	);
};
