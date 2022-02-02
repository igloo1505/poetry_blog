import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import * as Types from "../../state/Types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { handleLogout } from "../../state/userActions";
import { action as toggleMenu } from "redux-burger-menu";
import { Slide as Menu } from "react-burger-menu";
import { decorator as reduxBurgerMenu } from "redux-burger-menu";

const useStyles = makeStyles((theme) => ({
	toolbarMain: {
		position: "absolute",
		width: "100vw",
		zIndex: 10,
		top: 0,
		transition: "all 0.3s ease-in-out",
		backgroundColor: theme.palette.primary.main,
	},
	toolbarHidden: {
		// transform: "translateY(-100%)",
	},
	toolbarRight: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		// gap: "1rem",
		height: "64px",
	},
	toolbarTitleText: {
		color: "#fff !important",
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
	appbarHeader: {
		backgroundColor: "transparent !important",
	},
}));

const MobileAppbar = ({
	user: {
		isAuthenticated,
		user: { _id },
	},
	UI: { navbarHidden },
	handleLogout,
}) => {
	const styles = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [isAuthed, setIsAuthed] = useState(false);
	const dispatch = useDispatch();
	return (
		<Box
			sx={{ flexGrow: 1 }}
			// onMouseEnter={showNavbar}
			// onMouseLeave={hideNavbar}
			className={clsx(styles.toolbarMain, navbarHidden && styles.toolbarHidden)}
			id="mobile-appbar-outer-container"
		>
			<AppBar position="static" className={styles.appbarHeader}>
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, fontFamily: "'Roboto Condensed', sans-serif" }}
						className={styles.toolbarTitleText}
					>
						Poetry Blog
					</Typography>
					<div className={styles.toolbarHamburger}>
						<Hamburger />
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	UI: state.UI,
	props: props,
});

export default connect(mapStateToProps)(MobileAppbar);

export const LinkList = ({ styles, handleLogout }) => {
	return (
		<div className={styles.toolbarRight}>
			<Link href="/">
				<a className={styles.aTag}>Home</a>
			</Link>
			<Link href={isAuthed ? "/newSubmission" : "/login"}>
				<a className={styles.aTag}>Submit</a>
			</Link>
			{isAuthed && (
				<Link href="/myPosts">
					<a className={styles.aTag}>My Posts</a>
				</Link>
			)}
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
	);
};

const _Hamburger = () => {
	return (
		<Menu>
			<a id="home" className="menu-item" href="/">
				Home
			</a>
			<a id="about" className="menu-item" href="/about">
				About
			</a>
			<a id="contact" className="menu-item" href="/contact">
				Contact
			</a>
			<a onClick={this.showSettings} className="menu-item--small" href="">
				Settings
			</a>
		</Menu>
	);
};

const Hamburger = reduxBurgerMenu(_Hamburger);
