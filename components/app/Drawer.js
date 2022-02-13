import React, { useEffect, useState, Fragment } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../state/Types";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;
const breakpoint = 1920;

const useStyles = makeStyles((theme) => ({
	drawerPaper: {
		backgroundColor: theme.palette.primary.main,
	},
}));

const MyDrawer = () => {
	const styles = useStyles();
	return (
		<Fragment>
			<Drawer
				classes={{
					paper: styles.drawerPaper,
				}}
			/>
		</Fragment>
	);
};

const mapStateToProps = (state, props) => ({
	UI: state.UI,
	user: state.user,
	props: props,
});

export default connect(mapStateToProps)(MyDrawer);
