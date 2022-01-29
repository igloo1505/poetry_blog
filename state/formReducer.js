import * as Types from "./Types";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	submissionForm: {
		title: "",
		body: "",
		currentTag: "",
		tags: [],
	},
};

const formReducer = createReducer(initialState, (builder) => {
	builder.addCase(Types.SET_SUBMISSION_FORM, (state, action) => {
		return {
			...state,
			submissionForm: action.payload,
		};
	});
	builder.addCase(Types.SET_NEW_TAG_SUBMISSION_FORM, (state, action) => {
		return {
			...state,
			tags: [...state.tags, state.currentTag],
			currentTag: "",
		};
	});
	builder.addCase(Types.NEW_SUBMISSION_SUCCESS, (state, action) => {
		// TODO: ADD TOAST OR SOMETHING SIMILAR HERE
		return {
			...state,
			submissionForm: initialState.submissionForm,
		};
	});

	builder.addCase(Types.RESET_SUBMISSION_FORM, (state, action) => {
		console.log("userData: ", action.payload);
		return {
			...state,
			submissionForm: initialState.submissionForm,
		};
	});
});

export default formReducer;
