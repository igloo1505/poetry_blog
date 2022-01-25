import * as Types from "./Types";
import useAxios from "./useAxios";

export const newSubmission = (submissionData) => async (dispatch) => {
	try {
		let res = await useAxios({
			method: "post",
			url: `/api/submissions/newPost`,
			data: submissionData,
		});
		if (res.status === 200) {
			dispatch({ type: Types.NEW_SUBMISSION_SUCCESS, payload: res.data });
		}
		if (res.status === 401) {
			dispatch({ type: Types.UNAUTHORIZED, payload: res.data });
		}
		if (res.status !== 200 && res.status !== 401) {
			dispatch({ type: Types.SERVER_ERROR, payload: error });
		}
	} catch (error) {
		dispatch({ type: Types.SERVER_ERROR, payload: error });
	}
};
