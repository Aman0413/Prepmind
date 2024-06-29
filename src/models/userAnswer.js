import mongoose from "mongoose";

const userAnswerSchema = new mongoose.Schema({
  mockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MockInterview",
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
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.useranswer ||
  mongoose.model("useranswer", userAnswerSchema);
