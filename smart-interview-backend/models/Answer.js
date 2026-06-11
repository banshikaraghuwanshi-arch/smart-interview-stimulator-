const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Answer", answerSchema);