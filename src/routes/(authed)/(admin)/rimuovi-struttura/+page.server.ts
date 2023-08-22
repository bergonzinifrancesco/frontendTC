import { loadStructures, serverURL } from '$lib/server/api.js';
import axios from 'axios';

export async function load({ locals }) {
	const structures = await loadStructures();
	return { structures: structures };
}

export const actions = {
	removeStructure: async function ({ request, locals }) {
		const data = await request.formData();
		const structure = JSON.parse(data.get('structure'));

		try {
			const response = await axios.delete(
				serverURL + `/api/admin/remove_structure/?id_struttura=${structure.id}`,
				{
					headers: {
						Authorization: `Bearer ${locals.access}`
					}
				}
			);
			return { success: { message: response.data, reset: {} } };
		} catch (err) {
			return { error: { code: err.status, message: err.data } };
		}
	}
};
