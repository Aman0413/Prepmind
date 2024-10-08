import mongoose from "mongoose";

const mockInterviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  jsonMockResp: {
    type: String,
    required: true,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  jobDesc: {
    type: String,
    required: true,
  },
  jobExperience: {
    type: String,
    required: true,
  },
  difficultyLevel: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.mockinterview ||
  mongoose.model("mockinterview", mockInterviewSchema);
