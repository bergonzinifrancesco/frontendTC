import axios from 'axios';

export const serverURL = 'http://localhost:8000';

export async function loadStructures() {
	const response = await axios.get(serverURL + '/api/structure/list_structures/');
	const structuresIds = response.data;

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
