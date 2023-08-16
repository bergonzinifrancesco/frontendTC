import { getStructureInfo } from '$lib/server/api';

export async function load({ locals }) {
	const ids = locals.structures;
	const structures = new Map();
	for (const id of ids) {
		const data = await getStructureInfo(id);
		structures.set(id, data);
	}
	return { ids: ids, structures: structures };
}
