import {
	createEventsFromBookings,
	getBookingsForStructure,
	getStructureInfo,
	serverURL
} from '$lib/server/api';
import axios from 'axios';

export async function load({ params, cookies, locals }) {
	const structureId = Number(params.id);

	let structureInfo = null;
	let bookings = [];
	let fields = [];
	let myInfo = null;

	try {
		structureInfo = await getStructureInfo(structureId);
	} catch (err) {
		console.log(err);
	}
	try {
		bookings = await getBookingsForStructure(structureId);
	} catch (err) {
		console.log(err);
	}
	try {
		fields = (await axios.get(serverURL + `/api/structure/${structureId}/info_campi/`)).data;
		fields.sort((a, b) => {
			const numCampoA = a.num_campo;
			const numCampoB = b.num_campo;
			if (numCampoA > numCampoB) return 1;
			else if (numCampoA < numCampoB) return -1;
			return 0;
		});
	} catch (err) {
		console.log(err);
	}
	try {
		myInfo = (
			await axios.get(serverURL + '/api/user/me/info_base/', {
				headers: {
					Authorization: `Bearer ${locals.access}`
				}
			})
		).data;
	} catch (err) {
		console.log(err);
	}

	const data = {
		id: params.id,
		myInfo: myInfo,
		structure: structureInfo,
		fields: fields,
		bookings: createEventsFromBookings(bookings, myInfo),
		username: cookies.get('username')
	};

	return data;
}

export const actions = {
	uploadChanges: async function ({ request, locals, params }) {
		const data = await request.formData();
		console.log('data', data);
		let events = data.get('newEvents');
		let field = JSON.parse(data.get('actualField'));

		console.log('field', field);

		if (!events) {
			return { uploadChangesError: 'Non ci sono eventi nuovi da inserire.' };
		}
		events = JSON.parse(events);

		for (const event of events) {
			axios
				.post(
					serverURL + '/api/booking/create_booking/',
					{
						campo_id: field.num_campo,
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
					console.log('Successo post evento', success);
					return { uploadChangesSuccess: true };
				})
				.catch((error) => {
					console.log('Errore invio prenotazione');
					return { uploadChangesError: error.message };
				});
		}
		return { uploadChangesError: 'Errore inatteso' };
	}
};
