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
		let { searchQuery, userId } = req.body;
		let _userId = cookies.get("userId") || userId;
		console.log("userId: from cookies", _userId);
		const user = await User.findById(_userId);
		let _uu = await handleAuth(cookies, user);
		console.log("_uu: ", _uu);
		if (!user) {
			return res.status(401).json({ msg: "Unauthorized." });
		}

		// if (_userId) {
		// 	bodyQuery.author = _userId;
		// 	tagQuery.author = _userId;
		// }

		return res.status(200).json({
			msg: "Posts retrieved successfully",
			updatedPost: updatedPost,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "There was an error editing that post.." });
	}
});

export default connectDB(handler);
