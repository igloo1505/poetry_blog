import * as Types from "./Types";
import store from "./store";
import { animateSearchResult } from "./animations";
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

const filterById = ({ array, id }) => {
	return array.filter((item) => item._id !== id);
};

const initialState = {
	myPosts: [],
	featuredPosts: [],
	hasSearchResults: false,
	mainSearchQuery: "",
	filteredAllPosts: {
		noResult: false,
		endResults: false,
		page: 1,
		lastRequestedPage: null,
		isLoading: false,
		results: [],
	},
	filteredOwnPosts: {
		noResult: false,
		endResults: false,
		lastRequestedPage: null,
		page: 1,
		isLoading: false,
		results: [],
	},
	currentlyEditing: {},
};

const formReducer = createReducer(initialState, (builder) => {
	builder.addCase(Types.SET_MAIN_SEARCH_QUERY, (state, action) => {
		return {
			...state,
			mainSearchQuery: action.payload,
		};
	});
	builder.addCase(Types.CLEAR_MAIN_SEARCH_QUERY, (state, action) => {
		return {
			...state,
			mainSearchQuery: "",
		};
	});
	builder.addCase(Types.NEW_SUBMISSION_SUCCESS, (state, action) => {
		return {
			...state,
			myPosts: [...state.myPosts, action.payload],
		};
	});
	builder.addCase(Types.SET_FEATURED_POSTS, (state, action) => {
		return {
			...state,
			featuredPosts: action.payload,
		};
	});

	builder.addCase(Types.SET_LAZY_LOADING_LIST_STATE, (state, action) => {
		return {
			...state,
			hasSearchResults: true,
			filteredAllPosts: {
				...state.filteredAllPosts,
				isLoading: action.payload,
				lastRequestedPage: state.filteredAllPosts.page,
			},
		};
	});
	builder.addCase(Types.QUERY_ALL_SUBMISSION_RESULTS, (state, action) => {
		setTimeout(() => {
			animateSearchResult();
		}, 300);
		return {
			...state,
			hasSearchResults: true,
			filteredAllPosts: {
				noResult: false,
				page: state.filteredAllPosts.page + 1,
				lastRequestedPage: state.filteredAllPosts.page,
				...action.payload,
			},
		};
	});

	builder.addCase(Types.GET_BY_TAG_SUCCESS, (state, action) => {
		let _ns = {
			filteredOwnPosts: {
				...initialState.filteredOwnPosts,
				page: state.filteredOwnPosts.page + 1,
			},
			filteredAllPosts: {
				...initialState.filteredAllPosts,
				page: state.filteredAllPosts.page + 1,
			},
		};
		if (action.payload?.byUser) {
			_ns.filteredOwnPosts.results = action.payload.results;
		}
		if (!action.payload?.byUser) {
			_ns.filteredAllPosts.results = action.payload.results;
		}
		return {
			...state,
			hasSearchResults: true,
			..._ns,
		};
	});
	builder.addCase(Types.QUERY_OWN_SUBMISSION_NO_RESULT, (state, action) => {
		return {
			...state,
			hasSearchResults: true,
			filteredOwnPosts: {
				noResult: true,
				results: [],
			},
		};
	});
	builder.addCase(Types.QUERY_ALL_SUBMISSION_NO_RESULT, (state, action) => {
		// animateSearchNoResult();
		return {
			...state,
			hasSearchResults: true,
			filteredAllPosts: {
				noResult: true,
				results: [],
			},
		};
	});

	builder.addCase(Types.CLEAR_ALL_QUERY_RESULTS, (state, action) => {
		// setTimeout(() => {
		// 	animateSearchReset();
		// }, 300);
		return {
			...state,
			hasSearchResults: false,
			filteredAllPosts: initialState.filteredAllPosts,
		};
	});

	builder.addCase(Types.QUERY_OWN_SUBMISSION_RESULT, (state, action) => {
		return {
			...state,
			hasSearchResults: true,
			filteredOwnPosts: {
				noResult: false,
				page: state.filteredOwnPosts.page + 1,
				...action.payload,
			},
		};
	});

	builder.addCase(Types.CLEAR_OWN_QUERY_RESULTS, (state, action) => {
		return {
			...state,
			hasSearchResults: false,
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
	builder.addCase(Types.REMOVE_SUBMISSION_SUCCESS, (state, action) => {
		return {
			...state,
			myPosts: filterById({
				array: state.myPosts,
				id: action.payload.removedId,
			}),
			filteredOwnPosts: {
				...state.filteredOwnPosts,
				results: filterById({
					array: state.filteredOwnPosts.results,
					id: action.payload.removedId,
				}),
			},
			filteredAllPosts: {
				...state.filteredAllPosts,
				results: filterById({
					array: state.filteredAllPosts.results,
					id: action.payload.removedId,
				}),
			},
		};
	});
	builder.addCase(
		Types.QUERY_ADDITIONAL_SUBMISSION_NO_RESULT,
		(state, action) => {
			return {
				...state,
				hasSearchResults: true,
				filteredAllPosts: {
					endResults: true,
					...state.filteredAllPosts,
				},
			};
		}
	);
	builder.addCase(
		Types.QUERY_ADDITIONAL_SUBMISSIONS_RESULT,
		(state, action) => {
			return {
				...state,
				filteredAllPosts: {
					noResult: false,
					// set to be true if not returning max allowed results
					endResults: false,
					isLoading: false,
					page: state.filteredAllPosts.page + 1,
					results: [
						...state.filteredAllPosts.results,
						...action.payload.results.filter((_r) => {
							return ![...state.filteredAllPosts.results]
								.map((r) => r._id)
								.includes(_r._id);
						}),
					],
				},
			};
		}
	);
});

export default formReducer;
