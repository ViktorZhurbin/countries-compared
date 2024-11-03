import mongoose from "mongoose";

const MODEL_NAME = "Country";

const countrySchema = new mongoose.Schema({
	code: { type: String, required: true },
	name: { type: String, required: true },
	aliases: { type: [String], required: true },
	rankings: { type: Map, of: Number },
	updatedAt: { type: String, required: true },
});

type CountryType = mongoose.InferSchemaType<typeof countrySchema>;

interface PreparedCountry extends Omit<CountryType, "rankings"> {
	average: number;
	rankings?: Record<string, number> | null;
}

const ExistingModel = mongoose.connection.models[
	MODEL_NAME
] as mongoose.Model<CountryType>;

const CountryModel = ExistingModel || mongoose.model(MODEL_NAME, countrySchema);

export { CountryModel };
export type { CountryType, PreparedCountry };
