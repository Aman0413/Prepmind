import mongoose from "mongoose";

const userAnswerSchema = new mongoose.Schema({
  mockId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
  },
  correctAns: {
    type: String,
  },
  userAns: {
    type: String,
  },
  feedback: {
    type: String,
  },
  rating: {
    type: Number,
  },
  user: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.useranswer ||
  mongoose.model("useranswer", userAnswerSchema);
