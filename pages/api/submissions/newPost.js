import uuid from "uuid";
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
		let { body, title, tags } = req.body;
		let _tags = tags || [];
		let _userId = cookies.get("userId");
		console.log("userId: from cookies", _userId);
		const user = await User.findById(_userId);
		console.log("User!!!:", user);
		if (!user) {
			return res.status(401).json({ msg: "Unauthorized." });
		}
		let newSubmission = new Submission({
			author: user._id,
			title,
			body,
			tags: _tags,
		});
		let savedSubmission = await newSubmission.save();
		let _user = await User.findByIdAndUpdate(
			_userId,
			{
				$push: { posts: newSubmission._id },
			},
			{ new: true }
		).populate("posts");
		console.log("savedSubmission:", savedSubmission);
		return res
			.status(200)
			.json({ msg: "Post created successfully.", newSubmission });
		// return res.status(200).json({
		// 	msg: "User created successfully.",
		// 	success: true,
		// 	user: savedUser,
		// });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "There was an creating that post." });
	}
});

export default connectDB(handler);
