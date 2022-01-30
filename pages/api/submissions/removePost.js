import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { handleRememberMe } from "../../../util/handleRememberMe";
import User from "../../../models/User";
import Submission from "../../../models/Submission";
import colors from "colors";

const handler = nc();

handler.post(async (req, res) => {
	console.log(colors.bgBlue("Did run in route with...", req.body));
	const cookies = new Cookies(req, res);
	try {
		let { submissionId, userId } = req.body;
		let _userId = cookies.get("userId") || userId;
		console.log("userId: from cookies", _userId);
		const user = await User.findById(_userId);
		if (!user) {
			return res.status(401).json({ msg: "Unauthorized.", success: false });
		}

		const removedSubmission = await Submission.findByIdAndDelete(submissionId);
		console.log("removedSubmission: ", removedSubmission);

		return res.status(200).json({
			msg: "Posts removed successfully",
			success: true,
			removedId: removedSubmission._id,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "There was an error removing that post.." });
	}
});

export default connectDB(handler);
