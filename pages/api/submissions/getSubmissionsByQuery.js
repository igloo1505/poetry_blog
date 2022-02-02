import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { handleRememberMe } from "../../../util/handleRememberMe";
import User from "../../../models/User";
import Submission from "../../../models/Submission";
import colors from "colors";

let paginateLimit = 10;

// TODO: QUERY BY TITLE AS WELL AS BY BODY AND BY TAG AND CONCAT ON BACKEND.
// RESPOND WITH APPROPRIATE NUMBER OF POSTS DIRECTLY, AND ADD KEY TO INDICATE QUERY METHOD.

const handler = nc();

handler.post(async (req, res) => {
	console.log(colors.bgBlue("Did run in route with...", req.body));
	const cookies = new Cookies(req, res);
	try {
		let { searchQuery, userId, byUser, page, lastId, retrievedIds } = req.body;
		if (!retrievedIds) retrievedIds = [];
		let _regex = new RegExp(searchQuery, "i");
		if (!page) page = 1;
		if (!byUser) byUser = false;
		let _userId = cookies.get("userId") || userId;
		console.log("userId: from cookies", _userId);
		const user = await User.findById(_userId);
		if (!user && byUser) {
			return res.status(401).json({ msg: "Unauthorized.", success: false });
		}

		let _query;
		if (byUser) {
			if (!lastId) {
				_query = {
					$and: [
						{ $or: [{ title: _regex }, { body: _regex }, { tags: _regex }] },
						{ author: _userId },
						{ _id: { $nin: retrievedIds } },
					],
				};
			}
			if (lastId) {
				_query = {
					$and: [
						{ $or: [{ title: _regex }, { body: _regex }, { tags: _regex }] },
						{ author: _userId },
						{ _id: { $gt: lastId } },
						{ _id: { $nin: retrievedIds } },
					],
				};
			}
		}
		if (!byUser) {
			if (lastId) {
				_query = {
					$and: [
						{ $or: [{ title: _regex }, { body: _regex }, { tags: _regex }] },
						{ _id: { $gt: lastId } },
						{ _id: { $nin: retrievedIds } },
					],
				};
			}
			if (!lastId) {
				_query = {
					$and: [
						{ $or: [{ title: _regex }, { body: _regex }, { tags: _regex }] },
						{ _id: { $nin: retrievedIds } },
					],
				};
			}
		}

		let allResults = await Submission.find(_query)
			.sort({ createdAt: -1 })
			// .skip(paginateLimit * (page - 1))
			.limit(paginateLimit);

		return res.status(200).json({
			msg: "Posts retrieved successfully",
			success: true,
			results: allResults,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "There was an error querying those posts.." });
	}
});

export default connectDB(handler);
