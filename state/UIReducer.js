import * as Types from "./Types";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	navbarHidden: false,
	animations: {
		animateSearchResult: false,
	},
	viewport: {
		width: 0,
		height: 0,
	},
	drawer: {
		isOpen: false,
	},
	snackbar: {
		isOpen: false,
		message: "",
		// error, warning, info, success
		variant: "success",
	},
	largeModal: {
		open: false,
		title: "",
		body: "",
		author: {
			firstName: "",
			lastName: "",
			_id: "",
		},
		timeout: 3000,
	},
};

const UIReducer = createReducer(initialState, (builder) => {
	builder.addCase(Types.SET_DRAWER_OPEN, (state, action) => {
		return {
			...state,
			drawer: {
				isOpen: true,
			},
		};
	});
	builder.addCase(Types.SET_DRAWER_CLOSED, (state, action) => {
		return {
			...state,
			drawer: {
				isOpen: false,
			},
		};
	});
	builder.addCase(Types.RESET_SNACKBAR, (state, action) => {
		return {
			...state,
			snackbar: initialState.snackbar,
		};
	});
	builder.addCase(Types.SET_SNACKBAR_DATA, (state, action) => {
		return {
			...state,
			snackbar: {
				...state.snackbar,
				...action.payload,
			},
		};
	});
	builder.addCase(Types.SET_NAVBAR_HIDDEN, (state, action) => {
		return {
			...state,
			navbarHidden: action.payload || false,
		};
	});
	builder.addCase(Types.RESET_NAVBAR_HIDDEN, (state, action) => {
		return {
			...state,
			navbarHidden: true,
		};
	});
	builder.addCase(Types.SET_LARGE_MODAL_DATA, (state, action) => {
		return {
			...state,
			largeModal: {
				open: true,
				timeout: 3000,
				...action.payload,
			},
		};
	});
	builder.addCase(Types.RESET_LARGE_MODAL_DATA, (state, action) => {
		return {
			...state,
			largeModal: initialState.largeModal,
		};
	});
	builder.addCase(Types.SET_VIEWPORT_DIMS, (state, action) => {
		return {
			...state,
			viewport: {
				...state.viewport,
				...action.payload,
			},
		};
	});
	builder.addCase(Types.SET_ANIMATE_SEARCH_RESULT, (state, action) => {
		return {
			...state,
			animations: {
				...state.animations,
				animateSearchResult: action.payload,
			},
		};
	});
});

export default UIReducer;
