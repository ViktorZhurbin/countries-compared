import { getCountries } from '$lib/server/database/getCountries';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	return {
		countries: await getCountries()
	};
};
