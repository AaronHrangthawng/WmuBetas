import mongoose from "mongoose";

const principleSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const Principle = mongoose.model("Principle", principleSchema);
export default Principle;
