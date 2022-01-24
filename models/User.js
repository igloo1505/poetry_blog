const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
import { v4 } from "uuid";

const UserSchema = mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		oneTimePassword: {
			type: String,
			required: false,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		profileImgUrl: {
			type: String,
		},
		allowEmails: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

UserSchema.plugin(require("mongoose-autopopulate"));

UserSchema.pre("save", async function (next, done) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} else {
		next(new Error("failed to encrypt password"));
	}
	// next();
});

UserSchema.methods.comparePassword = async function (
	password,
	isAutoLogin,
	next
) {
	let comparison;
	if (isAutoLogin) {
		comparison = await bcrypt.compare(password, this.oneTimePassword);
	}
	if (!isAutoLogin) {
		comparison = await bcrypt.compare(password, this.password);
	}
	if (!comparison) {
		return {
			isMatch: false,
			comparison: comparison,
		};
	} else {
		return {
			isMatch: true,
			comparison: comparison,
		};
	}
};

// TODO MAKE SURE THIS IS HANDLED ON INITIAL LOGIN TO AVOID SYNC ISSUES BETWEEN CLIENT OTP AND HASHED ONETIMEPASSWORD
// UserSchema.methods.handleOtp = async function (password, next) {
// 	let comparison = await bcrypt.compare(password, this.oneTimePassword);
// 	if (comparison) {
// 		let newOtp = [...v4()].filter((c) => /[a-zA-Z0-9]+/g.test(c));
// 		console.log("newOtp: ", newOtp);
// 		const salt = await bcrypt.genSalt(10);
// 		this.oneTimePassword = await bcrypt.hash(newOtp.join(), salt);
// 		return {
// 			isMatch: true,
// 			comparison: comparison,
// 			newClientOtp: newOtp,
// 		};
// 	} else {
// 		return {
// 			isMatch: false,
// 			comparison: comparison,
// 		};
// 	}
// };

module.exports = mongoose.models?.User || mongoose.model("User", UserSchema);
