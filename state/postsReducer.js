import * as Types from "./Types";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const replaceEverywhere = (updatedPost, state) => {
	Object.keys(state).forEach((key) => {
		if (state[key]?.length > 0) {
			state[key] = state[key].map((post) => {
				if (post?.id === updatedPost?.id) {
					return updatedPost;
				}
				return post;
			});
		}
		if (Object.keys(state[key])) {
			state[key] = Object.keys(state[key]).map((_post) => {
				if (_post?.id === updatedPost?.id) {
					return updatedPost;
				}
				return _post;
			});
		}
	});
};

const initialState = {
	myPosts: [],
	filteredAllPosts: {
		noResult: false,
		byTag: [],
		byBody: [],
	},
	filteredOwnPosts: {
		noResult: false,
		byTag: [],
		byBody: [],
	},
	currentlyEditing: {},
};

const formReducer = createReducer(initialState, (builder) => {
	builder.addCase(Types.NEW_SUBMISSION_SUCCESS, (state, action) => {
		return {
			...state,
			myPosts: [...state.myPosts, action.payload],
		};
	});

	builder.addCase(Types.QUERY_ALL_SUBMISSION_RESULTS, (state, action) => {
		return {
			...state,
			filteredAllPosts: action.payload,
		};
	});
	builder.addCase(Types.QUERY_OWN_SUBMISSION_NO_RESULT, (state, action) => {
		return {
			...state,
			filteredOwnPosts: {
				noResult: true,
				byTag: [],
				byBody: [],
			},
		};
	});
	builder.addCase(Types.QUERY_ALL_SUBMISSION_NO_RESULT, (state, action) => {
		return {
			...state,
			filteredAllPosts: {
				noResult: true,
				byTag: [],
				byBody: [],
			},
		};
	});

	builder.addCase(Types.CLEAR_ALL_QUERY_RESULTS, (state, action) => {
		return {
			...state,
			filteredAllPosts: initialState.filteredAllPosts,
		};
	});

	builder.addCase(Types.QUERY_OWN_SUBMISSION_RESULT, (state, action) => {
		return {
			...state,
			filteredOwnPosts: action.payload,
		};
	});

	builder.addCase(Types.CLEAR_OWN_QUERY_RESULTS, (state, action) => {
		return {
			...state,
			filteredOwnPosts: initialState.filteredOwnPosts,
		};
	});

	builder.addCase(Types.SET_CURRENTLY_EDITING_POST, (state, action) => {
		return {
			...state,
			currentlyEditing: action.payload,
		};
	});
	builder.addCase(Types.CLEAR_CURRENTLY_EDITING_POST, (state, action) => {
		return {
			...state,
			currentlyEditing: initialState.currentlyEditing,
		};
	});

	builder.addCase(
		Types.SUBMIT_CURRENTLY_EDITING_POST_SUCCESS,
		(state, action) => {
			let updatedState = replaceEverywhere(action.payload, state);
			// TODO check this shit like 10 different ways. I'm not sure if it's the best way to do this.
			console.log("updatedState: ", updatedState);
			return {
				...state,
				currentlyEditing: initialState.currentlyEditing,
			};
		}
	);
});

export default formReducer;
