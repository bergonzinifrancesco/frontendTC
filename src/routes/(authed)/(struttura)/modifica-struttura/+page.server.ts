import { getStructureInfo, serverURL } from '$lib/server/api';
import axios from 'axios';

export async function load({ cookies, locals }) {
	const ids = locals.structures;
	const structures = [];
	for (const id of ids) {
		const structure = await getStructureInfo(id);
		structure.id = id;
		structures.push(structure);
	}
	return { structures: structures };
}

export const actions = {
	modifyInfo: async function ({ request, locals }) {
		const data = await request.formData();
		const id = data.get('id');
		const nome = data.get('nome');
		const fondazione = data.get('fondazione');
		const dimensione = data.get('dimensione');
		const spogliatoi = JSON.stringify(data.get('spogliatoi') ? true : false);

		try {
			await axios.patch(
				serverURL + `/api/structure/${id}/modify_info/`,
				{
					nome: nome,
					fondazione: fondazione,
					dimensione: dimensione,
					spogliatoi: spogliatoi
				},
				{
					headers: {
						Authorization: `Bearer ${locals.access}`
					}
				}
			);

			return { modifyInfoSuccess: true, id: id };
		} catch (err) {
			console.log(err);
			console.log('Qualcosa è andato storto.');
			return { modifyInfoError: true, id: id };
		}
	}
};
