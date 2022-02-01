import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { handleRememberMe } from "../../../util/handleRememberMe";
import User from "../../../models/User";
import Submission from "../../../models/Submission";
import colors from "colors";

// TODO: QUERY BY TITLE AS WELL AS BY BODY AND BY TAG AND CONCAT ON BACKEND.
// RESPOND WITH APPROPRIATE NUMBER OF POSTS DIRECTLY, AND ADD KEY TO INDICATE QUERY METHOD.

const handler = nc();

handler.post(async (req, res) => {
	console.log(colors.bgBlue("Did run in route with...", req.body));
	const cookies = new Cookies(req, res);
	try {
		let { searchQuery, userId, byUser } = req.body;
		if (!byUser) byUser = false;
		let _userId = cookies.get("userId") || userId;
		console.log("userId: from cookies", _userId);
		const user = await User.findById(_userId);
		if (!user && byUser) {
			return res.status(401).json({ msg: "Unauthorized.", success: false });
		}
		let bodyQuery = {
			body: {
				$regex: searchQuery,
				$options: "i",
			},
		};
		let tagQuery = {
			tags: {
				$regex: searchQuery,
				$options: "i",
			},
		};
		if (_userId) {
			bodyQuery.author = _userId;
			tagQuery.author = _userId;
		}

		let _byBody = await Submission.find(bodyQuery).limit(10);
		let _byTag = await Submission.find(tagQuery).limit(10);

		return res.status(200).json({
			msg: "Posts retrieved successfully",
			success: true,
			byBody: _byBody,
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
