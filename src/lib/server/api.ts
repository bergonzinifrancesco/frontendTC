import axios from 'axios';

export const serverURL = 'http://localhost:8000';

export async function loadStructures(filter = {}) {
	const structuresIds = await getListOfStructuresById(filter);

	const structures = [];

	for (const structureId of structuresIds) {
		const structureInfo = await getStructureInfo(structureId);
		const structureAverageRating = await getAverageRating(structureId);
		if (structureInfo)
			structures.push({
				id: structureId,
				structure: structureInfo,
				rating: structureAverageRating
			});
	}

	return { structures: structures };
}

export async function getListOfStructuresById(filter = {}) {
	return (await axios.post(serverURL + '/api/structure/list_structures/', filter)).data;
}

export async function getStructureInfo(id: number) {
	try {
		const response = await axios.get(serverURL + `/api/structure/${id}/info/`);
		return response.data;
	} catch (err) {
		console.log('Inside getStructureInfo');
		console.log(err);
	}
	return null;
}

export async function getBookingsForStructure(structureId: number) {
	try {
		const response = await axios.get(
			serverURL + `/api/booking/get_bookings/?structure_id=${structureId}`
		);
		return response.data;
	} catch (err) {
		console.log('Inside getBookingsForStructure');
		console.log(err);
	}
	return [];
}

export async function getAverageRating(structureId: number) {
	try {
		const response = await axios.get(serverURL + `/api/structure/${structureId}/voto_medio/`);
		return response.data;
	} catch (err) {
		console.log('Inside getAverageRating');
		console.log(err);
	}
	return 0;
}

export function createEventsFromBookings(bookings, myInfo, isAdmin = false) {
	const events = [];

	if (!myInfo || !bookings) {
		return null;
	}

	for (const b of bookings) {
		const isMine = b.prenotante == myInfo.id;
		const event = {
			id: events.length,
			title: isMine ? myInfo.username : 'Altro utente',
			titleHTML: isMine ? `<b>${myInfo.username}</b>` : '<i>Altro utente<i>',
			backgroundColor: isMine ? 'blue' : 'red',
			start: new Date(b.inizio),
			end: new Date(b.fine),
			editable: false,
			campo: b.campo
		};
		if (isAdmin) {
			event.title = JSON.stringify(b);
			event.titleHTML = `<b>Utente con id: ${b.prenotante}</b><br/>Campo n.${b.campo}`;
			event.editable = new Date() < new Date(event.start) ? true : false;
		}
		events.push(event);
	}
	return events;
}
