import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import * as Types from "../../state/Types";
import { isMobile } from "mobile-device-detect";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { handleLogout } from "../../state/userActions";
import { animateSearchReset } from "../../state/animations";

const hoverLimit = 100;

const useStyles = makeStyles((theme) => ({
	toolbarMain: {
		position: "absolute",
		width: "100vw",
		zIndex: 10,
		top: 0,
		transition: "all 0.3s ease-in-out",
		// backgroundColor: `${theme.palette.primary.main} !important`,
		backgroundColor: theme.palette.primary.main,
	},
	toolbarHidden: {
		transform: "translateY(-100%)",
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
	appbarHeader: {
		backgroundColor: "transparent",
	},
	aTag: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: "0.5rem",
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			cursor: "pointer",
		},
	},
	emHovered: {
		color: theme.palette.primary.main,
		backgroundColor: "rgba(255, 255, 255, 1)",
	},
	borderBottomDiv: {
		width: "100%",
		height: "2px",
		transition: "all 0.5s ease",
		transform: "scaleX(0)",
		backgroundColor: theme.palette.primary.main,
		transformOrigin: "center",
	},
	borderBottomDivHovered: {
		backgroundColor: theme.palette.secondary.main,
		transform: "scaleX(1)",
	},
}));

const Appbar = ({
	user: {
		isAuthenticated,
		user: { _id },
	},
	UI: { navbarHidden },
	handleLogout,
}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [isAuthed, setIsAuthed] = useState(false);
	const [emHovered, setEmHovered] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();

	const showNavbar = () => {
		dispatch({
			type: Types.SET_NAVBAR_HIDDEN,
			payload: false,
		});
	};
	const hideNavbar = () => {
		console.log("navbarHidden: ", navbarHidden);
		if (!navbarHidden && !isMobile) {
			dispatch({
				type: Types.RESET_NAVBAR_HIDDEN,
			});
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (!isMobile) {
				document.addEventListener("mousemove", (e) => {
					if (e.y < hoverLimit) {
						showNavbar();
					}
					if (e.y >= hoverLimit) {
						hideNavbar();
					}
				});
				document.addEventListener("touch", (e) => {
					if (e.y < hoverLimit) {
						showNavbar();
					}
					if (e.y >= hoverLimit) {
						hideNavbar();
					}
				});
			}
			if (isMobile) {
				document.addEventListener("touch", (e) => {
					if (e.y < hoverLimit) {
						showNavbar();
					}
					if (e.y >= hoverLimit) {
						hideNavbar();
					}
				});
				showNavbar();
			}
		}
	}, [isMobile]);

	useEffect(() => {
		if (isAuthenticated && _id) {
			setIsAuthed(true);
		}
		if (!isAuthenticated || !_id) {
			setIsAuthed(false);
		}
	}, [isAuthenticated, _id]);

	const handleHomeClick = (e) => {
		e.preventDefault();
		dispatch({
			type: Types.CLEAR_ALL_QUERY_RESULTS,
		});
		router.push(`/`, undefined, { shallow: true });
		animateSearchReset();
		// router.push("/");
	};

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
		<Box
			sx={{ flexGrow: 1 }}
			className={clsx(styles.toolbarMain, navbarHidden && styles.toolbarHidden)}
			id="standard-appbar-outer-container"
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
					<div className={styles.toolbarRight}>
						<a
							className={clsx(
								styles.aTag,
								emHovered === "home" && styles.emHovered
							)}
							onClick={handleHomeClick}
							onMouseEnter={() => setEmHovered("home")}
							onMouseLeave={() => setEmHovered(null)}
						>
							Home
							<div
								className={clsx(
									styles.borderBottomDiv,
									emHovered === "home" && styles.borderBottomDivHovered
								)}
							/>
						</a>
						<Link href={isAuthed ? "/newSubmission" : "/login"}>
							<a
								className={clsx(
									styles.aTag,
									emHovered === "submit" && styles.emHovered
								)}
								onMouseEnter={() => setEmHovered("submit")}
								onMouseLeave={() => setEmHovered(null)}
							>
								Submit
								<div
									className={clsx(
										styles.borderBottomDiv,
										emHovered === "submit" && styles.borderBottomDivHovered
									)}
								/>
							</a>
						</Link>
						{isAuthed && (
							<Link href="/myPosts">
								<a
									className={clsx(
										styles.aTag,
										emHovered === "myPosts" && styles.emHovered
									)}
									onMouseEnter={() => setEmHovered("myPosts")}
									onMouseLeave={() => setEmHovered(null)}
								>
									My Posts
									<div
										className={clsx(
											styles.borderBottomDiv,
											emHovered === "myPosts" && styles.borderBottomDivHovered
										)}
									/>
								</a>
							</Link>
						)}
						{isAuthed ? (
							<Link href="/">
								<a
									className={clsx(
										styles.aTag,
										emHovered === "logout" && styles.emHovered
									)}
									onMouseEnter={() => setEmHovered("logout")}
									onMouseLeave={() => setEmHovered(null)}
									onClick={handleLogout}
								>
									Logout
									<div
										className={clsx(
											styles.borderBottomDiv,
											emHovered === "logout" && styles.borderBottomDivHovered
										)}
									/>
								</a>
							</Link>
						) : (
							<Link href="/login">
								<a
									className={clsx(
										styles.aTag,
										emHovered === "login" && styles.emHovered
									)}
									onMouseEnter={() => setEmHovered("login")}
									onMouseLeave={() => setEmHovered(null)}
								>
									Login
									<div
										className={clsx(
											styles.borderBottomDiv,
											emHovered === "login" && styles.borderBottomDivHovered
										)}
									/>
								</a>
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
	UI: state.UI,
	props: props,
});

export default connect(mapStateToProps, { handleLogout })(Appbar);
