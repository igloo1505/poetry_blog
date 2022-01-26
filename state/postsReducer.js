import * as Types from "./Types";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	myPosts: [],
};

const formReducer = createReducer(initialState, (builder) => {
	builder.addCase(Types.NEW_SUBMISSION_SUCCESS, (state, action) => {
		return {
			...state,
			myPosts: [...state.myPosts, action.payload],
		};
	});
});

export default formReducer;
