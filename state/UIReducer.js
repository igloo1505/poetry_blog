import * as Types from "./Types";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	navbarHidden: false,
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
});

export default UIReducer;
