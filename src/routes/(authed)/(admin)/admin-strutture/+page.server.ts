import { loadStructures, serverURL } from '$lib/server/api.js';
import axios from 'axios';

export async function load({ locals }) {
	const structures = await loadStructures();

	const admins = (
		await axios.get(serverURL + '/api/admin/get_admins_of_structures/', {
			headers: { Authorization: `Bearer ${locals.access}` }
		})
	).data;

	return { structures: structures, admins: new Map(Object.entries(admins)) };
}
