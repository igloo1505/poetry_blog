import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { isMobile } from "mobile-device-detect";
import Image from "next/image";
import { useRouter } from "next/router";
import { Link } from "next/link";
import { queryAdditionalGeneralSubmissions } from "../../state/poemActions";

const useStyles = makeStyles((theme) => ({
	popupCardContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		gridTemplateAreas: '"popupCardTop" "popupCardBottom"',
		opacity: 0,
		zIndex: 99999,
		height: "30vh",
		overflow: "hidden",
		// border: "1px solid red",
	},
	popupCardContainerIn: {
		// boxShadow: "0px -5px 8px #bebebe",
		transition: "box-shadow 0.3s ease-in-out",
		"&:hover": {
			boxShadow: "0px -3px 4px #bebebe !important",
		},
	},
	popupCardSubdue: {
		boxShadow: "0px -1px 8px #bebebe !important",
	},
	popupCardSubduedark: {
		boxShadow: "0px -1px 8px #bebebe !important",
	},
	popupCardSubduelight: {
		boxShadow: "0px -1px 8px #bebebe !important",
	},

	topContainer: {
		position: "relative",
		height: "70%",
		maxHeight: "70%",
		width: "100%",
		objectFit: "cover",
		gridArea: "popupCardTop",
	},
	bottomContainer: {
		// height: "30%",
		// maxHeight: "30%",
		backgroundColor: "#fff",
		padding: "1rem 0rem 0rem 0rem",
		gridArea: "popupCardBottom",
		width: "100%",
		position: "relative",
		flexGrow: 1,
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	topContainerNoImage: {
		position: "relative",
		top: 0,
		zIndex: 99,
		// height: "70%",
		height: "fit-content",
		maxHeight: "70%",
		width: "100%",
		objectFit: "cover",
		gridArea: "popupCardTop",
		// minHeight: "30%",
		backgroundColor: theme.palette.primary.main,
		border: "1px solid #e0e0e0",
	},
	bottomContainerNoImage: {
		height: "100%",
		// maxHeight: "30%",
		backgroundColor: "#fff",
		padding: "1rem 0rem 0rem 0rem",
		gridArea: "popupCardBottom",
		width: "100%",
		position: "relative",
		padding: "0.5rem 0.75rem",
	},
	text: {},
	viewButton: {
		position: "absolute",
		bottom: "0",
		// left: "50%",
		// transform: "translateX(-50%)",
		// backgroundColor: `${theme.palette.primary.main}cc`,
		backgroundColor: `#fff`,
		width: "100%",
		padding: "1rem",
		color: "#fff",
		boxShadow: "0px -2px 8px #bebebe",
		color: `${theme.palette.primary.light}ff`,
		backgroundColor: theme.palette.primary.main,
		// background: "linear-gradient(145deg, #6272cd, #5360ad)",
		// boxShadow: "9px 9px 17px #4e5ba3, -9px -9px 17px #6a7bdd",
		border: `1px solid ${theme.palette.primary.light}`,
		color: `#fff`,
		textAlign: "center",
		transition: "all 0.3s ease-in-out",
		"&:hover": {
			color: `#fff`,
			background: theme.palette.primary.dark,
			// boxShadow: "0px -1px 4px #bebebe",
			cursor: "pointer",
		},
	},
	mobileViewButton: {
		backgroundColor: "#fff",
		boxShadow: "0px -2px 8px #bebebe",
	},

	image: {
		zIndex: -1,
	},
	imageOverlayDiv: {
		width: "100%",
		height: "100%",
		minHeight: "30%",
		zIndex: 1,
		transition: "all 0.5s ease-in-out",
		padding: "0.5rem 0",
		"&:hover": {
			backgroundColor: "rgba(0,0,0,0.7)",
			cursor: "pointer",
		},
	},
	imageOverlayDark: {
		backgroundColor: "rgba(0,0,0,0.7)",
		// background:
		// 	"linear-gradient (135deg, rgba (0,0,0,1) 30%, rgba (0,0,0,0.2) 100%) ",
	},
	titleTextContainer: {
		// position: "absolute",
		position: "relative",
		// top: "8px",
		// left: "8px",
		// maxWidth: "50%",
		// width: "50%",
		width: "100%",
		height: "100%",
		textAlign: "left",
		padding: "0.5rem",
		// top: "0",
	},
	titleTextContainerInner: {
		padding: "0.5rem",
	},
	titleTextContainerBorderTop: {
		width: "100px",
		height: "2px",
		position: "absolute",
		backgroundColor: theme.palette.primary.dark,
		transition: "all 0.3s ease-in-out",
	},
	titleTextContainerBorderTopEmphasize: {
		height: "4px",
		width: "150px",
		backgroundColor: theme.palette.primary.main,
	},
	titleTextContainerBorderLeft: {
		transform: "rotate(90deg) translate(50%, 15px)",
		width: "30px",
		height: "2px",
		position: "absolute",
		transition: "all 0.3s ease-in-out",
		// backgroundColor: theme.palette.primary.main,
		backgroundColor: theme.palette.secondary.main,
	},
	titleTextContainerBorderLeftEmphasize: {
		transform: "rotate(90deg) translate(50%, 25px)",
		width: "50px",
		height: "4px",
		position: "absolute",
		backgroundColor: theme.palette.secondary.main,
	},
	titleText: {
		fontSize: "2rem",
		fontWeight: "400",
		fontFamily: "'Roboto Condensed', sans-serif",
		// margin: "1rem",
		lineHeight: 1,
		// textShadow: "3px 3px 4px #fff, -3px -3px 4px #000",
	},
	textLight: {
		color: "#fff",
		transition: "all 0.3s ease-in-out",
	},
	textDark: {
		color: "#000",
		transition: "all 0.3s ease-in-out",
	},
	textLightEmphasize: {
		color: "#fff",
	},
	textDarkEmphasize: {
		color: "#fff",
	},
	"subdueText-light": {
		transition: "all 0.3s ease-in-out",
		color: "#fff",
	},
	"subdueText-dark": {
		transition: "all 0.3s ease-in-out",
		color: "#fff",
	},
	bodyTextSpan: {
		display: "block",
		textAlign: "center",
	},
	bodyText: {
		flexGrow: 1,
		// height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: "0.35rem",
		overflow: "hidden",
		// position: "absolute",
		// left: "50%",
		// transform: "translateX(-50%)",
	},
	bodyTextContainer: {
		flexGrow: 1,
		// height: "100%",
	},
}));

const PopUpCardSearchResult = ({
	props: {
		submission,
		featuredImage,
		_index,
		shouldAnimateLandingEntrance,
		setShouldAnimateLandingEntrance,
		emphasizeOverlay,
		textColor,
		indexHovered,
		setIndexHovered,
		isFeatured,
		shouldCheckVisible,
	},
	posts: {
		mainSearchQuery,
		filteredAllPosts: {
			noResult,
			page: _page,
			isLoading,
			lastRequestedPage,
			results,
		},
	},
	queryAdditionalGeneralSubmissions,
}) => {
	let popUpCardSearchResultId = `popUpCardSearchResult-${_index}`;
	let cardAnimateClass = isFeatured ? "pop-up-card-featured" : "pop-up-card";
	const topContainerId = `top-container-${_index}`;
	const styles = useStyles();
	const router = useRouter();

	useEffect(() => {
		if (shouldCheckVisible) {
			document.addEventListener("scroll", async (e) => {
				let _scrollHeight = document.getElementById(
					"index-container-main"
				).scrollHeight;
				if (
					Boolean(
						_scrollHeight - (window.scrollY + window.innerHeight) <=
							window.innerHeight * 0.3
					) &&
					!isLoading &&
					Boolean(lastRequestedPage < _page || lastRequestedPage === null)
				) {
					console.log("Sending query from scroll");
					console.log("queryAdditionalGeneralSubmissions: ");
					let { success } = await queryAdditionalGeneralSubmissions({
						page: _page,
						searchQuery: mainSearchQuery,
						lastId: results[results.length - 1]._id,
						retrievedIds: results.map((result) => result._id),
					});
				}
			});
		}
	}, []);
	// console.log("shouldCheckVisible: ", shouldCheckVisible, _index);

	// const [bodyTextStyles, setBodyTextStyles] = useState({});
	const [additionalStyles, setAdditionalStyles] = useState({});
	useEffect(() => {
		if (typeof window !== "undefined") {
			let emHeight = document
				.getElementById(topContainerId)
				.getBoundingClientRect().height;

			setAdditionalStyles({
				...additionalStyles,
				bodyText: {
					top: `${emHeight + 8}px`,
				},
				// imageOverlay: {
				// 	height: `${emHeight}px`,
				// },
			});
		}
	}, []);

	const [animatedIn, setAnimatedIn] = useState(true);
	const handleCardClick = () => {
		//
	};
	const viewSingleSubmission = () => {
		router.push(`/post/${submission._id}`);
	};

	return (
		<div
			className={clsx(
				styles.popupCardContainer,
				"popup-card-container-animated-searchResult",
				cardAnimateClass,
				animatedIn && styles.popupCardContainerIn
			)}
			onClick={handleCardClick}
			onMouseEnter={() => {
				setIndexHovered(_index);
			}}
			onMouseLeave={() => setIndexHovered(-1)}
			id={popUpCardSearchResultId}
		>
			<div
				className={clsx(
					styles.topContainer,
					!featuredImage && styles.topContainerNoImage,
					"popup-card-top-container-animated"
				)}
				id={topContainerId}
				onClick={viewSingleSubmission}
			>
				<div
					className={clsx(
						styles.imageOverlayDiv,
						emphasizeOverlay && styles.imageOverlayDark
					)}
					style={additionalStyles.imageOverlay}
				>
					{featuredImage && (
						<Image
							src={featuredImage}
							alt="Featured Image"
							layout="fill"
							objectFit="cover"
							className={clsx(styles.image, "popup-card-image-animated")}
							id={`imageId-${_index}`}
							onLoad={() => {
								if (!shouldAnimateLandingEntrance) {
									setShouldAnimateLandingEntrance(true);
								}
							}}
						/>
					)}
					<div className={styles.titleTextContainer}>
						<div
							className={clsx(
								styles.titleTextContainerBorderTop,
								emphasizeOverlay && styles.titleTextContainerBorderTopEmphasize
							)}
						/>
						<div
							className={clsx(
								styles.titleTextContainerBorderLeft,
								emphasizeOverlay && styles.titleTextContainerBorderLeftEmphasize
							)}
						/>
						<div className={styles.titleTextContainerInner}>
							<span
								variant="h6"
								component="div"
								className={clsx(
									styles.titleText,
									textColor === "light" && styles.textLight,
									textColor === "dark" && styles.textDark,
									emphasizeOverlay && styles?.[`subdueText-${textColor}`]
								)}
							>
								{submission.title}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div
				className={clsx(
					styles.bottomContainer,
					!featuredImage && styles.bottomContainerNoImage,
					"popup-card-bottom-container-animated"
				)}
			>
				<div className={styles.bodyTextContainer}>
					<div className={styles.bodyText} style={additionalStyles.bodyText}>
						{submission.body.split(/\r?\n/).map((t, i) => (
							<span key={`text-${i}`} className={styles.bodyTextSpan}>
								{t}
							</span>
						))}
					</div>
				</div>
			</div>
			<div
				className={clsx(
					styles.viewButton
					// isMobile && styles.mobileViewButton
				)}
				onClick={viewSingleSubmission}
			>
				View
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	posts: state.posts,
	network: state.network,
	props: props,
});

export default connect(mapStateToProps, { queryAdditionalGeneralSubmissions })(
	PopUpCardSearchResult
);
