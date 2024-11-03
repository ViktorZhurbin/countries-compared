import { MONGODB_URI } from '$env/static/private';
import { countriesOfInterest } from '$lib/constants/countriesOfInterest';
import { CountryModel, type PreparedCountry } from '$lib/schema/country';
import { getArrayAverage } from '$lib/utils/math';
import * as mongoose from 'mongoose';

export async function getCountries() {
	mongoose.connect(MONGODB_URI);
	// mongoose.set("debug", true);

	const countries = await CountryModel.find({
		aliases: { $in: countriesOfInterest }
	}).lean();

	return countries
		.map((country) => {
			const rankings = Object.values(country.rankings ?? {});
			const average = getArrayAverage(rankings.filter(Boolean));

			return {
				average,
				...JSON.parse(JSON.stringify(country))
			} as PreparedCountry;
		})
		.sort((a, b) => a.average - b.average);
}
