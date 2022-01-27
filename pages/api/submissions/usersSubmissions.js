import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { handleRememberMe } from "../../../util/handleRememberMe";
import User from "../../../models/User";
import Submission from "../../../models/Submission";
import colors from "colors";

const paginateOffset = 10;

const handler = nc();

handler.get(async (req, res) => {
	console.log(colors.bgBlue("Did run in route with...", req.body));
	const cookies = new Cookies(req, res);
	try {
		let { page } = req.body;
		if (!page) page = 0;
		let _userId = cookies.get("userId");
		console.log("userId: from cookies", _userId);
		const user = await User.findById(_userId);
		console.log("User!!!:", user);
		if (!user) {
			return res.status(401).json({ msg: "Unauthorized." });
		}
		let _submissions = await Submission.find({ author: _userId })
			.limit(paginateOffset)
			.skip(paginateOffset * page);

		return res
			.status(200)
			.json({ msg: "Users posts retrieved successfully", _submissions });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "There was an error retrieving this users posts.." });
	}
});

export default connectDB(handler);
