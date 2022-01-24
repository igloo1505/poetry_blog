import {
	createReducer,
	createAction,
	current,
	applyMiddleware,
	configureStore,
	createSlice,
} from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import networkReducer from "./networkReducer";

const initialState = {};

const withDevtools = () => {
	let withTools = process.env.NODE_ENV !== "production" || true;
	return withTools;
};

const store = configureStore({
	reducer: {
		user: userReducer,
		network: networkReducer,
	},
	devTools: () => withDevtools(),
	// devTools: true,
	preloadedState: initialState,
});
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
	window.store = store;
}

export default store;
