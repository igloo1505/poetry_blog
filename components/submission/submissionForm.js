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
import { newSubmission } from "../../state/poemActions";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../state/Types";
import { BiPen } from "react-icons/bi";
import { gsap } from "gsap";
import TagFormSection from "./TagFormSection";

const formContainerId = "submissionFormContainer";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: "min(800px, 85vw)",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
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
	submitButton: {
		margin: "1.5rem 0 !important",
	},
}));

const submissionForm = ({
	newSubmission,
	forms: { submissionForm: formData },
	isEditing,
	editingSubmission,
}) => {
	console.log("editingSubmission in form: ", isEditing, editingSubmission);
	const styles = useStyles();
	const dispatch = useDispatch();
	useEffect(() => {
		animateFormEntrance();
	}, []);

	const setFormData = (newData) => {
		dispatch({
			type: Types.SET_SUBMISSION_FORM,
			payload: newData,
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
		console.log("Dispatching tag", e.target.length);
		if (e.key === "Enter" && e.target.value.length >= 3) {
			dispatch({
				type: Types.SET_NEW_TAG_SUBMISSION_FORM,
			});
		}
	};

	const handleSubmit = (e) => {
		newSubmission(formData);
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
			<Box component="form" noValidate sx={{ mt: 3 }}>
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
					<Grid item xs={12}>
						<TextField
							fullWidth
							id="currentTagInput"
							label="Tags"
							name="currentTag"
							value={formData.currentTag}
							onChange={handleChange}
							onKeyDown={observeTagInput}
						/>
					</Grid>
				</Grid>
				<Button
					fullWidth
					variant="contained"
					onClick={handleSubmit}
					className={styles.submitButton}
				>
					Submit
				</Button>
			</Box>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	forms: state.forms,
	props: props,
});

export default connect(mapStateToProps, { newSubmission })(submissionForm);

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
