const mongoose = require("mongoose");

const { ObjectId } = require('mongodb');
const quezSchema = mongoose.Schema({
    creator: {type:ObjectId, ref: "user" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [
        {
            title: { type: String, required: true },
            answerOptions: { type: [String], required: true },
            correctOptions: { type: [Number], required: true }
        }
    ]
});


const quezModal = mongoose.model("queze", quezSchema);
module.exports = { quezModal }


//const leaderboardModal = mongoose.model("leaderboard", leaderboardSchema);
// const leaderboardSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     score: { type: Number, required: true }
// });


