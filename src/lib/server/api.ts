import axios from 'axios';

export const serverURL = 'http://localhost:8000';

export async function loadStructures() {
	const response = await axios.get(serverURL + '/api/structure/list_structures/');
	const structures_ids = response.data;

	const structures = [];

	for (const structure_id of structures_ids) {
		const structureInfo = await getStructureInfo(structure_id);

		if (structureInfo) structures.push({ id: structure_id, structure: structureInfo });
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
