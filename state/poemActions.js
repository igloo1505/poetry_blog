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

export const queryAllSubmissions = (queryData) => async (dispatch) => {
	try {
		let res = await useAxios({
			method: "post",
			url: `/api/submissions/getSubmissionsByQuery`,
			data: queryData,
		});
		if (res.status === 200 && res.data.success) {
			if (res.data?.byBody?.length === 0 && res.data?.byTag?.length === 0) {
				dispatch({
					type: Types.QUERY_ALL_SUBMISSION_NO_RESULT,
					payload: res.data,
				});
				return { success: "no result" };
			}
			dispatch({ type: Types.QUERY_ALL_SUBMISSION_RESULTS, payload: res.data });
			return { success: true };
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
			return { success: true };
		}
		if (res.status === 401) {
			dispatch({ type: Types.UNAUTHORIZED, payload: res.data });
			return { success: false };
		}
		if (res.status !== 200 && res.status !== 401) {
			dispatch({ type: Types.SERVER_ERROR, payload: error });
			return { success: false };
		}
	} catch (error) {
		dispatch({ type: Types.SERVER_ERROR, payload: error });
		return { success: false };
	}
};

export const getByTag =
	({ tagText, byUser }) =>
	async (dispatch) => {
		let _byUser = byUser || false;
		try {
			let res = await useAxios({
				method: "post",
				url: `/api/submissions/getBySingleTag`,
				data: {
					tagQuery: tagText,
					byUser: _byUser,
				},
			});
			if (res.status === 200 && res.data.success) {
				console.log("dispatching: ");
				dispatch({
					type: Types.GET_BY_TAG_SUCCESS,
					payload: { ...res.data, byUser: _byUser },
				});
				return { success: true };
			}
			if (res.status === 401) {
				dispatch({ type: Types.UNAUTHORIZED, payload: res.data });
				return { success: false };
			}
			if (res.status !== 200 && res.status !== 401) {
				dispatch({ type: Types.SERVER_ERROR, payload: error });
				return { success: false };
			}
		} catch (error) {
			dispatch({ type: Types.SERVER_ERROR, payload: error });
			return { success: false };
		}
	};

export const removePost = (_data) => async (dispatch) => {
	try {
		let res = await useAxios({
			method: "post",
			url: `/api/submissions/removePost`,
			data: _data,
		});
		if (res.status === 200 && res.data.success) {
			console.log("dispatching: ");
			dispatch({
				type: Types.REMOVE_SUBMISSION_SUCCESS,
				payload: res.data,
			});
			return { success: true };
		}
		if (res.status === 401) {
			dispatch({ type: Types.UNAUTHORIZED, payload: res.data });
			return { success: false };
		}
		if (res.status !== 200 && res.status !== 401) {
			dispatch({ type: Types.SERVER_ERROR, payload: error });
			return { success: false };
		}
	} catch (error) {
		dispatch({ type: Types.SERVER_ERROR, payload: error });
		return { success: false };
	}
};
