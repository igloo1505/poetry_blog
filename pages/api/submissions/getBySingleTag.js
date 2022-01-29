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
		// Include byUser as Boolean to indicate if filtering by user as well
		let { tagQuery, userId, byUser } = req.body;

		let _userId = cookies.get("userId") || userId;
		console.log("userId: from cookies", _userId);
		const user = await User.findById(_userId);

		let tagQuery = {
			tags: {
				$regex: searchQuery,
				$options: "i",
			},
		};
		let _byTag = await Submission.find(tagQuery).limit(10);
		if (user && byUser) {
			tagQuery.author = user._id;
		}

		return res.status(200).json({
			msg: "Posts retrieved successfully",
			byTag: _byTag,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "There was an error querying those posts.." });
	}
});

export default connectDB(handler);
