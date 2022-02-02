import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../state/Types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import clsx from "clsx";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
	container: {},
}));

const Snackbar = ({ snackbar: { isOpen, message, variant } }) => {
	const dispatch = useDispatch();
	const styles = useStyles();

	const handleClose = (e) => {
		dispatch({
			type: Types.RESET_SNACKBAR,
		});
	};

	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert severity={variant}>{message}</Alert>
		</Snackbar>
	);
};

const mapStateToProps = (state, props) => ({
	snackbar: state.UI.snackbar,
	user: state.user,
	props: props,
});

export default connect(mapStateToProps)(Snackbar);
