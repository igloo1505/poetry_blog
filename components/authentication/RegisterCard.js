import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Copyright from "./Copyright";
import { registerNewUser } from "../../state/userActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => {
	return {
		icon: {
			backgroundColor: theme.palette.secondary.main,
		},
	};
});

const RegisterCard = ({
	props: { shouldShowLogin, setShouldShowLogin },
	registerNewUser,
}) => {
	const styles = useStyles();

	const [formData, setformData] = useState({
		firstName: "",
		lastName: "",
		allowEmails: true,
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setformData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		console.log("Form Data", formData);
		registerNewUser(formData);
	};

	const toggleSignUp = () => {
		setShouldShowLogin(!shouldShowLogin);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1 }} className={styles.icon}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" noValidate sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								value={formData.firstName}
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								onChange={handleChange}
								label="Last Name"
								name="lastName"
								value={formData.lastName}
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={formData.email}
								onChange={handleChange}
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								value={formData.password}
								label="Password"
								type="password"
								id="password"
								onChange={handleChange}
								autoComplete="new-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										name="allowEmails"
										value={formData.allowEmails}
										onChange={(e) => {
											setformData({
												...formData,
												allowEmails: e.target.checked,
											});
										}}
									/>
								}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>
					<Button
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="#" variant="body2" onClick={toggleSignUp}>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 5 }} />
		</Container>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	props: props,
});

export default connect(mapStateToProps, { registerNewUser })(RegisterCard);
