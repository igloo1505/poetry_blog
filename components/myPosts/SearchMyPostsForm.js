import React from "react";
import Cookies from "cookies";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	formContainer: {},
	formRow: {},
	formInput: {},
}));

const SearchMyPostsForm = () => {
	const styles = useStyles();
	return (
		<div className={styles.formContainer}>
			<div>Search 'my posts' here</div>
		</div>
	);
};

export default SearchMyPostsForm;
