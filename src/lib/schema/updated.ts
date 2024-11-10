import mongoose from "mongoose";

const MODEL_NAME = "Update";

const updateSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  lastUpdated: { type: String, required: true },
});

type UpdateType = mongoose.InferSchemaType<typeof updateSchema>;

const ExistingModel = mongoose.connection.models[
  MODEL_NAME
] as mongoose.Model<UpdateType>;

const UpdateModel = ExistingModel || mongoose.model(MODEL_NAME, updateSchema);

export { UpdateModel };
export type { UpdateType };
