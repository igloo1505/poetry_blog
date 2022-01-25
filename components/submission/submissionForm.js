import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { registerNewUser } from "../../state/userActions";
import { newSubmission } from "../../state/poemActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: "min(800px, 85vw)",
	},
}));

const submissionForm = ({ newSubmission }) => {
	const styles = useStyles();
	const [formData, setFormData] = useState({
		title: "",
		body: "",
	});
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		console.log("Form Data", formData);
		newSubmission(formData);
	};
	return (
		<div className={styles.card}>
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
				</Grid>
				<Button
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Box>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	props: props,
});

export default connect(mapStateToProps, { newSubmission })(submissionForm);
