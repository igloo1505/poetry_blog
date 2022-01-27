import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { handleRememberMe } from "../../../util/handleRememberMe";
import User from "../../../models/User";
import Submission from "../../../models/Submission";
import colors from "colors";

const handler = nc();

handler.get(async (req, res) => {
	console.log(colors.bgBlue("Did run in route with...", req.body));
	const cookies = new Cookies(req, res);
	try {
		// let { body, title, tags } = req.body;
		let _userId = cookies.get("userId");
		console.log("userId: from cookies", _userId);
		const user = await User.findById(_userId);
		console.log("User!!!:", user);
		if (!user) {
			return res.status(401).json({ msg: "Unauthorized." });
		}
		let _submissions = await Submission.find({ date: -1 }).limit(10);

		return res
			.status(200)
			.json({ msg: "Posts retrieved successfully", _submissions });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "There was an error retrieving all posts.." });
	}
});

export default connectDB(handler);
