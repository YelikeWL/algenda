const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Database Schema for token links
const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
})

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;