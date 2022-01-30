import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { handleRememberMe } from "../../../util/handleRememberMe";
import { handleAuth } from "../../../util/handleCookies";
import User from "../../../models/User";
import Submission from "../../../models/Submission";
import colors from "colors";

const handler = nc();

handler.post(async (req, res) => {
	console.log(colors.bgBlue("Did run in route with...", req.body));
	const cookies = new Cookies(req, res);
	try {
		let { submissionId, fields, userId } = req.body;
		let _userId = cookies.get("userId") || userId;

		const user = await User.findById(_userId);
		let _auth = await handleAuth(cookies, user);

		if (!user || !_auth.success) {
			return res.status(401).json({ msg: "Unauthorized.", success: false });
		}

		let updatedSubmission = await Submission.findByIdAndUpdate(
			submissionId,
			{ ...fields },
			{ new: true }
		);

		// if (_userId) {
		// 	bodyQuery.author = _userId;
		// 	tagQuery.author = _userId;
		// }

		return res.status(200).json({
			msg: "Posts retrieved successfully",
			success: true,
			updatedPost: updatedSubmission,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "There was an error editing that post..", success: true });
	}
});

export default connectDB(handler);
