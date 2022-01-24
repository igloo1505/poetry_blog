import * as Types from "./Types";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	user: {},
};

const userReducer = createReducer(initialState, (builder) => {
	builder.addCase(Types.LOGIN_SUCCESS, (state, action) => {
		console.log("userData: ", action.payload);
		return {
			...state,
			isAuthenticated: true,
			user: action.payload,
		};
	});
	builder.addCase(Types.REGISTRATION_SUCCESS, (state, action) => {
		return {
			...state,
			isAuthenticated: true,
			user: action.payload.user,
		};
	});
	builder.addCase(Types.LOGOUT, (state, action) => {
		console.log("userData: ", action.payload);
		return {
			...state,
			isAuthenticated: false,
			user: {},
		};
	});
});

export default userReducer;
