import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "cookies";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Copyright from "../authentication/Copyright";
import { connect, useDispatch } from "react-redux";
import { BsSearch } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
	formContainer: {},
	formRow: {},
	formInput: {},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
	formOuterContainer: {
		// display: "flex",
		// flexDirection: "column",
		// alignItems: "center",
		// justifyContent: "flex-start",
		// height: "100vh",
		// width: "100%",
		// minWidth: "100%",
		// padding: "0.75rem 1rem",
		height: "fit-content",
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

const SearchMyPostsForm = () => {
	const styles = useStyles();
	const [searchFormData, setSearchFormData] = useState({
		query: "",
	});
	const handleSearchClick = (e) => {
		console.log("Search Form data", searchFormData);
	};
	return (
		<Grid
			container
			component="main"
			id="randomGridId"
			className={styles.outerGridContainer}
		>
			<CssBaseline />
			<Grid
				item
				// xs={12}
				// sm={8}
				// md={5}
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
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="searchUserPosts"
							label="Search Posts"
							name="searchQuery"
							autoFocus
						/>
						<Button
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleSearchClick}
						>
							Search
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default SearchMyPostsForm;
