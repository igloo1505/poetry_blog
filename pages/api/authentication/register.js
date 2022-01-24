// const mongoose = require("mongoose");
import uuid from "uuid";
import nc from "next-connect";
import { connectDB } from "../../../util/connectDB";
// import authMiddleware from "../../../util/authMiddleware";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
// import NextCors from "nextjs-cors";
import { handleRememberMe } from "../../../util/handleRememberMe";
import User from "../../../models/User";
import colors from "colors";

const handler = nc();

handler.post(async (req, res) => {
	console.log(colors.bgBlue("Did run in route with...", req.body));
	const cookies = new Cookies(req, res);
	try {
		let { firstName, lastName, allowEmails, email, password } = req.body;

		let _email = email.toLowerCase();
		const user = await User.findOne({ email: _email });
		console.log("User!!!:", user);
		if (user) {
			return res.status(401).json({ msg: "User already exists." });
		}
		const newUser = new User({
			email: _email,
			password,
			firstName,
			lastName,
			allowEmails,
		});
		let savedUser = await newUser.save();
		return res.status(200).json({
			msg: "User created successfully.",
			success: true,
			user: savedUser,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "There was an error logging in." });
	}
});

export default connectDB(handler);
