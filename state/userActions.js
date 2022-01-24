import * as Types from "./Types";
import useAxios from "./useAxios";

export const login = (userData) => async (dispatch) => {
	try {
		let res = await useAxios({
			method: "post",
			url: `/api/authentication/login`,
			data: {
				email: userData.email,
				password: userData.password,
				rememberMe: userData?.rememberMe,
			},
		});
		console.log("res.status: ", res);
		if (res.status === 200) {
			dispatch({ type: Types.LOGIN_SUCCESS, payload: res.data });
		}
		if (res.status === 401) {
			dispatch({ type: Types.USER_NOT_FOUND, payload: res.data });
		}
		if (res.status !== 200 && res.status !== 401) {
			dispatch({ type: Types.SERVER_ERROR, payload: error });
		}
	} catch (error) {
		dispatch({ type: Types.SERVER_ERROR, payload: error });
	}
};
