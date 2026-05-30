const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        require: [true, "token is required to be added inn blacklist"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Blacklist", blacklistSchema);