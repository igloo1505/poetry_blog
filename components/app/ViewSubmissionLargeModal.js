import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../state/Types";
import { gsap } from "gsap";
import clsx from "clsx";

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
		// boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",\
		transform: "translateY(-100vh)",
		transition: "all 0.3s ease-in-out",
	},
	modalContainerOpen: {
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
		transform: "translateY(0px)",
		transition: "all 0.3s ease-in-out",
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
		// backgroundColor: "red",
		zIndex: "-1",
		// display: "none",
		// opacity: "0",
		zIndex: 99999,
	},
	backdropOpen: {
		zIndex: 99999,
		display: "flex",
	},
	hide: {
		display: "none",
	},
}));

const ViewSubmissionLargeModal = ({
	UI: {
		largeModal: { open: modalOpen, title, body, author, timeout },
	},
}) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		if (!modalOpen) {
			setTimeout(() => {
				setIsOpen(modalOpen);
			}, 800);
		}
		if (modalOpen) {
			setIsOpen(modalOpen);
		}
	}, [modalOpen]);

	const handleBackdropClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		dispatch({
			type: Types.RESET_LARGE_MODAL_DATA,
		});
	};

	return (
		<div
			className={clsx(
				styles.backdrop,
				modalOpen && styles.backdropOpen,
				!isOpen && styles.hide
			)}
			id={modalBackdropId}
			onClick={handleBackdropClick}
			// style={modalOpen ? { display: "flex" } : { display: "none" }}
		>
			<div
				className={clsx(
					styles.modalContainer,
					modalOpen && styles.modalContainerOpen
				)}
				id={modalContainerId}
			>
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

// const entranceAnimation = ({ setIsOpen }) => {
// 	console.log("Animating modal entrance");
// 	gsap.fromTo(
// 		`#${modalContainerId}`,
// 		{
// 			opacity: 1,
// 			y: "-500px",
// 			display: "flex",
// 			flexDirection: "column",
// 			scaleY: 0,
// 			scaleX: 0,
// 			transformOrigin: "50% 50%",
// 		},
// 		{
// 			y: "0",
// 			opacity: 1,
// 			duration: 0.35,
// 			scaleY: 1,
// 			scaleX: 1,
// 			// ease: "elastic.out(1, 0.3)",
// 			ease: "power4.out",
// 			// onComplete: () => {
// 			// 	setIsOpen(true);
// 			// },
// 		}
// 	);
// };
// const exitAnimation = ({ setIsOpen }) => {
// 	console.log("Animating modal entrance");
// 	let tl = gsap.timeline();
// 	tl.fromTo(
// 		`#${modalContainerId}`,
// 		{
// 			opacity: 1,
// 			y: "0",
// 			opacity: 1,
// 			scaleY: 1,
// 			scaleX: 1,
// 		},
// 		{
// 			y: "-500px",
// 			opacity: 0,
// 			duration: 1,
// 			scaleY: 0,
// 			scaleX: 0,
// 			ease: "elastic.out(1, 0.3)",
// 			// onComplete: () => {
// 			// 	setIsOpen(false);
// 			// },
// 		}
// 	);
// 	tl.to(`#${modalContainerId}`, {
// 		display: "none",
// 	});
// };
