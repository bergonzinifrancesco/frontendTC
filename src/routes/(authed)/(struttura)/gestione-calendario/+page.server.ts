import { getStructureInfo } from '$lib/server/api';

export async function load({ locals }) {
	const ids = locals.structures;
	const structures = new Map();
	for (const id of ids) {
		const structure = await getStructureInfo(id);
		structures.set(id, structure);
	}
	return { ids: ids, structures: structures };
}
