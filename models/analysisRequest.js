const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const analysisRequestSchema = new Schema(
  {
    numTweets: { type: Number, required: false },
    username: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const analysisRequest = mongoose.model(
  "analysisRequest",
  analysisRequestSchema
);
module.exports = analysisRequest;
