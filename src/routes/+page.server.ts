import { loadStructures, serverURL } from '$lib/server/api';
import { error, fail } from '@sveltejs/kit';
import axios from 'axios';

export async function load({ cookies }) {
	try {
		const data = await loadStructures();
		const username = cookies.get('username');
		const isLogged = username ? true : false;
		return { structures: data.structures, isLogged: isLogged };
	} catch (err) {
		console.log(err.message);
		throw error(404, { message: err.message });
	}
}

export const actions = {
	filter: async function ({ request, locals }) {
		const data = await request.formData();

		console.log(data);

		let superfici = data.get('superfici');
		if (superfici) {
			superfici = JSON.parse(superfici);
		}

		const costo = data.get('costo');

		const isRated = data.get('isRated');

		const ordine = data.get('ordine');

		let geocords = data.get('geocords');
		if (geocords) {
			geocords = JSON.parse(geocords);
		}

		const filter = new Object();
		if (superfici.length > 0) {
			filter.campo = superfici;
		}
		if (costo) {
			filter.costo = costo;
		}
		if (isRated) {
			filter.is_rated = isRated;
		}
		if (ordine) {
			filter.ordine = ordine;
			if (ordine == 'vicinanza' && geocords) {
				filter.coordinates = geocords;
			}
		}
		const response = await loadStructures(filter);

		return { structures: response.structures, filter: filter };
	},
	vote: async function ({ request, locals }) {
		let data = (await request.formData()).get('data');

		if (!data) {
			return fail(404, { message: 'Non ci sono dati nel form.' });
		}

		data = JSON.parse(data);
		console.log('data', data);
		try {
			await axios.put(
				serverURL + `/api/structure/${data.id}/recensione/`,
				{
					voto: data.rating
				},
				{ headers: { Authorization: `Bearer ${locals.access}` } }
			);
			console.log('Recensione registrata.');
			return { ratingSuccess: true, id: data.id, rating: data.rating };
		} catch (error) {
			console.log('Non sono riuscito a registrare la recensione.');
			return { ratingError: error.message };
		}
	}
};
