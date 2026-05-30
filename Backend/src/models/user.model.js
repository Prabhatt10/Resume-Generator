const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: [true, "User Name Already Exists"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Account Already Exists"]
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;