import {
	createEventsFromBookings,
	getBookingsForStructure,
	getStructureInfo,
	serverURL
} from '$lib/server/api.js';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export async function load({ locals, params }) {
	const ids = locals.structures;
	if (!ids.find((id) => id == params.id)) {
		throw redirect(307, '/');
	}

	const id = Number(params.id);
	const structure = await getStructureInfo(id);
	const bookings = await getBookingsForStructure(id);

	console.log(locals.username);
	const events = createEventsFromBookings(bookings, { id: id, username: locals.username }, true);
	return { structure: structure, bookings: bookings, events: events };
}

export const actions = {
	default: async function ({ request, params, locals }) {
		const data = await request.formData();
		const events = JSON.parse(data.get('events')).filter(
			(event) => new Date(event.start) > new Date()
		);

		if (!events.length) {
			console.log('Non ci sono eventi modificati.');
			return;
		}

		const bookings = [];

		for (const event of events) {
			const bookingData = event.title ? JSON.parse(event.title) : null;

			if (!bookingData) continue;

			const booking = {
				inizio: event.start,
				fine: event.end,
				campo_id: bookingData.campo,
				prenotante_id: bookingData.prenotante
			};
			bookings.push(booking);
		}

		console.log('bookings', bookings);

		try {
			await axios.post(serverURL + `/api/booking/modifica_calendario/${params.id}/`, bookings, {
				headers: {
					Authorization: `Bearer ${locals.access}`
				}
			});
			return { success: true };
		} catch (err) {
			return { error: err.message };
		}
	}
};
