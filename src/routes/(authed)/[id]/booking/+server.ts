import axios from 'axios';
import { serverURL } from '$lib/server/api';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals, params }) {
	console.log('Post per eventi calendario');

	const data = request.formData();
	const event = (await data).get('event');

	if (!event) {
		return json({ error: 'Evento inesistente' });
	}

	axios
		.post(
			serverURL + '/api/booking/create_booking/',
			{
				campo_id: 1,
				inizio: event.start,
				fine: event.end,
				struttura: params.id
			},
			{
				headers: {
					Authorization: `Bearer ${locals.access}`
				}
			}
		)
		.then((success) => {
			console.log(success);
			return json({ success: success });
		})
		.catch((error) => {
			console.log(error);
			return json({ error: error });
		});

	return json({ message: 'Errore inatteso' });
}
