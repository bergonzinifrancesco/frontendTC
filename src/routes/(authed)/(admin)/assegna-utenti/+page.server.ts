import { loadStructures, serverURL } from '$lib/server/api';
import axios from 'axios';

export async function load({ locals }) {
	let users = null;
	let structures = null;

	try {
		users = (
			await axios.get(serverURL + '/api/admin/list_users_by_username_and_id/', {
				headers: { Authorization: `Bearer ${locals.access}` }
			})
		).data;

		structures = await loadStructures();
	} catch (err) {
		console.log(err);
	}
	return { users: users, structures: structures };
}

export const actions = {
	default: async function ({ request, locals }) {
		const data = await request.formData();
		const user = JSON.parse(data.get('user'));
		const structure = JSON.parse(data.get('structure'));

		try {
			await axios.post(
				serverURL + '/api/admin/assign_users_to_structures/',
				[{ user: user[1], structure: structure[1] }],
				{
					headers: {
						Authorization: `Bearer ${locals.access}`
					}
				}
			);
			return { success: { user: user[0], structure: structure[0], structure_id: structure[1] } };
		} catch (err) {
			console.log(err);
			return { error: err.message };
		}
	}
};
