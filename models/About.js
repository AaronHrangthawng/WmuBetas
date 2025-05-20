import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  history: [String],
  identity: [String],
  nationalHistory: [String],
  foundingFathers: [String],
  mission: [String],
  fraternityFacts: [String],

  nationalHistoryImage: String,
  fraternityFactsImage: String,
  historyImage: String,
  identityImage: String,
  foundingFathersImage: String,
  missionImage: String,
});

export default mongoose.models.About || mongoose.model("About", aboutSchema);
