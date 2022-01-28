import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../state/Types";
import { gsap } from "gsap";

const modalContainerId = "largeModalContainer";
const modalBackdropId = "largeModalBackdrop";

const useStyles = makeStyles((theme) => ({
	modalContainer: {
		minHeight: "300px",
		maxHeight: "90vh",
		minWidth: "min(300px, 50vw)",
		maxWidth: "90vw",
		// width: "90vw",
		position: "fixed",
		// top: "-50%",
		// left: "50%",
		// transform: "translate(-50%, calc(-50% - 64px))",
		border: `1px solid ${theme.palette.secondary.dark}`,
		zIndex: "9999",
		borderRadius: "10px",
		backgroundColor: "#fff",
		// backgroundColor: "#e0e0e0",
		// boxShadow: "6px 6px 12px #bebebe",
		boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
	},
	topModalContainer: {
		backgroundColor: theme.palette.secondary.main,
		borderBottom: theme.palette.secondary.light,
		borderTopLeftRadius: "10px",
		borderTopRightRadius: "10px",
		padding: "0.75rem",
		boxShadow: "3px 3px 8px #bebebe",
	},
	bottomMiddleContainer: {
		padding: "1rem",
		// marginTop: "1rem",
		zIndex: 99999,
	},
	titleText: {
		fontFamily: "'Roboto Condensed', sans-serif",
		fontSize: "1.25rem",
		color: "#fff",
	},
	bodyText: {
		fontFamily: "'Roboto Condensed', sans-serif",
		fontSize: "1rem",
	},
	backdrop: {
		// fontFamily: "'Roboto Condensed', sans-serif",
		// fontSize: "1rem",
		minHeight: "100vh",
		minWidth: "100vw",
		position: "absolute",
		top: "0",
		left: "0",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const ViewSubmissionLargeModal = ({
	UI: {
		largeModal: { open: modalOpen, title, body, author, timeout },
	},
}) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	let _timeout = timeout || 3000;
	// 	if (modalOpen) {
	// 		setTimeout(() => {
	// 			dispatch({
	// 				type: Types.RESET_LARGE_MODAL_DATA,
	// 			});
	// 		}, _timeout);
	// 	}
	// }, [modalOpen]);

	const handleBackdropClick = () => {
		dispatch({
			type: Types.RESET_LARGE_MODAL_DATA,
		});
	};

	useEffect(() => {
		if (modalOpen) {
			entranceAnimation();
		}
		if (!modalOpen) {
			exitAnimation();
		}
	}, [modalOpen, title]);

	return (
		<div
			className={styles.backdrop}
			id={modalBackdropId}
			onClick={handleBackdropClick}
			// style={modalOpen ? { display: "flex" } : { display: "none" }}
		>
			<div className={styles.modalContainer} id={modalContainerId}>
				<div className={styles.topModalContainer}>
					<span className={styles.titleText}>{title}</span>
				</div>
				<div className={styles.bottomMiddleContainer}>
					<span className={styles.bodyText}>{body}</span>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	UI: state.UI,
	props: props,
});

export default connect(mapStateToProps)(ViewSubmissionLargeModal);

const entranceAnimation = () => {
	console.log("Animating modal entrance");
	gsap.fromTo(
		`#${modalContainerId}`,
		{
			opacity: 1,
			y: "-200px",
			scaleY: 0,
			scaleX: 0,
			transformOrigin: "50% 50%",
		},
		{
			y: "0",
			opacity: 1,
			duration: 0.35,
			scaleY: 1,
			scaleX: 1,
			// ease: "elastic.out(1, 0.3)",
			ease: "power4.out",
		}
	);
};
const exitAnimation = () => {
	console.log("Animating modal entrance");
	let tl = gsap.timeline();
	tl.fromTo(
		`#${modalContainerId}`,
		{
			opacity: 1,
			y: "0",
			opacity: 1,
			scaleY: 1,
			scaleX: 1,
		},
		{
			y: "-500px",
			opacity: 0,
			duration: 1,
			scaleY: 0,
			scaleX: 0,
			ease: "elastic.out(1, 0.3)",
		}
	);
	// gsap.fromTo(
	// 	`#${modalContainerId}`,
	// 	{
	// 		opacity: 1,
	// 		y: "-500px",
	// 	},
	// 	{
	// 		y: "0",
	// 		opacity: 1,
	// 		duration: 1,
	// 		ease: "elastic.out(1, 0.3)",
	// 	}
	// );
};
