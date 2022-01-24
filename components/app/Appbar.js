import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { connect } from "react-redux";
import { handleLogout } from "../../state/userActions";

const useStyles = makeStyles((theme) => ({
	toolbarRight: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		// gap: "1rem",
		height: "64px",
	},
	aTag: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: "0.5rem",
		"&:hover": {
			backgroundColor: "rgba(255, 255, 255, 1)",
			color: theme.palette.primary.main,
			transition: "all 0.2s ease-in-out",
		},
	},
}));

const Appbar = ({
	user: {
		isAuthenticated,
		user: { _id },
	},
	handleLogout,
}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [isAuthed, setIsAuthed] = useState(false);

	useEffect(() => {
		if (isAuthenticated && _id) {
			setIsAuthed(true);
		}
		if (!isAuthenticated || !_id) {
			setIsAuthed(false);
		}
	}, [isAuthenticated, _id]);

	const styles = useStyles();
	const handleChange = (event) => {
		setAuth(event.target.checked);
	};
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, fontFamily: "'Roboto Condensed', sans-serif" }}
					>
						Poetry Blog
					</Typography>
					<div className={styles.toolbarRight}>
						<Link href="/">
							<a className={styles.aTag}>Home</a>
						</Link>
						<Link href={isAuthed ? "/newSubmission" : "/login"}>
							<a className={styles.aTag}>Submit</a>
						</Link>
						{isAuthed ? (
							<Link href="/">
								<a className={styles.aTag} onClick={handleLogout}>
									Logout
								</a>
							</Link>
						) : (
							<Link href="/login">
								<a className={styles.aTag}>Login</a>
							</Link>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	props: props,
});

export default connect(mapStateToProps, { handleLogout })(Appbar);
