import * as Types from "./Types";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	navbarHidden: false,
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
});

export default UIReducer;
