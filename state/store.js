import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import formReducer from "./formReducer";
import postsReducer from "./postsReducer";
import networkReducer from "./networkReducer";
import UIReducer from "./UIReducer";

const initialState = {};

const withDevtools = () => {
	let withTools = process.env.NODE_ENV !== "production" || true;
	return withTools;
};

const store = configureStore({
	reducer: {
		user: userReducer,
		forms: formReducer,
		network: networkReducer,
		UI: UIReducer,
		posts: postsReducer,
	},
	devTools: () => withDevtools(),
	// devTools: true,
	preloadedState: initialState,
});
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
	window.store = store;
}

export default store;
