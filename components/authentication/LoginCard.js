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
import LockOutlined from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Copyright from "./Copyright";
import { login } from "../../state/userActions";

const useStyles = makeStyles((theme) => {
	return {
		icon: {
			backgroundColor: theme.palette.secondary.main,
		},
	};
});

const LoginCard = ({
	props: { shouldShowLogin, setShouldShowLogin },
	login,
	user,
}) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});
	const handleSubmit = (e) => {
		// Submit stuff here
		console.log("Form Data", formData);
		login(formData);
	};
	const styles = useStyles();

	const toggleSignUp = () => {
		setShouldShowLogin(!shouldShowLogin);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
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
				<Avatar
					sx={{ m: 1, bgcolor: "secondary.main" }}
					className={styles.icon}
				>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						onChange={handleChange}
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					<FormControlLabel
						control={
							<Checkbox
								value="remember"
								name="rememberMe"
								color="primary"
								onChange={(e) => {
									setFormData({
										...formData,
										[e.target.name]: e.target.checked,
									});
								}}
							/>
						}
						label="Remember me"
					/>
					<Button
						// type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2" onClick={toggleSignUp}>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	props: props,
});

export default connect(mapStateToProps, { login })(LoginCard);
