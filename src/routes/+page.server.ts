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
