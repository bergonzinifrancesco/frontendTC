import { getBookingsForStructure, getStructureInfo } from '$lib/server/api';

export async function load({ params, cookies, locals }) {
	const structureId = Number(params.id);

	let structureInfo = null;
	let bookings = [];

	try {
		structureInfo = await getStructureInfo(structureId);
		bookings = await getBookingsForStructure(structureId);
	} catch (err) {
		console.log(err);
	}
	return {
		id: params.id,
		structure: structureInfo,
		bookings: createEventsFromBookings(bookings, locals.username),
		username: cookies.get('username')
	};
}

function createEventsFromBookings(bookings, username) {
	const events = [];

	for (const b of bookings) {
		events.push({
			id: events.length,
			title: username,
			titleHTML: `<b>${username}</b>`,
			start: new Date(b.inizio),
			end: new Date(b.fine),
			editable: false
		});
	}
	return events;
}
