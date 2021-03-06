const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
import { v4 } from "uuid";
import User from "./User";

const SubmissionSchema = mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			// autopopulate: true,
		},
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		tags: {
			type: [String],
			required: true,
			default: [],
		},
		featuredImageUrl: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

SubmissionSchema.plugin(require("mongoose-autopopulate"));

module.exports =
	mongoose.models?.Submission || mongoose.model("Submission", SubmissionSchema);
