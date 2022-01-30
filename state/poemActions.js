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

export const queryOwnSubmissions = (queryData) => async (dispatch) => {
	console.log("queryData: ", queryData);
	try {
		let res = await useAxios({
			method: "post",
			url: `/api/submissions/getSubmissionsByQuery`,
			data: queryData,
		});
		if (res.status === 200 && res.data.success) {
			if (res.data?.byBody?.length === 0 && res.data?.byTag?.length === 0) {
				return dispatch({
					type: Types.QUERY_OWN_SUBMISSION_NO_RESULT,
					payload: res.data,
				});
			}
			dispatch({ type: Types.QUERY_OWN_SUBMISSION_RESULT, payload: res.data });
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

export const setCurrentEditing = (editingPoem) => (dispatch) => {
	dispatch({
		type: Types.SET_CURRENTLY_EDITING_POST,
		payload: editingPoem,
	});
};

export const updatePost = (postData) => async (dispatch) => {
	try {
		let res = await useAxios({
			method: "post",
			url: `/api/submissions/editSubmission`,
			data: postData,
		});
		if (res.status === 200 && res.data.success) {
			dispatch({ type: Types.UPDATE_POST_SUCCESS, payload: res.data });
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
