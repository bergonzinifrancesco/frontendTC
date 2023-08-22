import axios from 'axios';
import { serverURL } from '$lib/server/api';
import { fail } from '@sveltejs/kit';

export async function load({ locals }) {
	let avatarPath = '';
	let basicInfo: string[] = [];
	const positions: string[] = [];
	const characteristics: string[] = [];

	let advancedInfo = {
		peso: 0,
		altezza: 0,
		nazionalità: '',
		bio: '',
		numero_telefono: '',
		data_nascita: new Date(1900, 1, 1)
	};

	try {
		const avatar = await axios.get(serverURL + '/api/user/me/avatar/', {
			headers: {
				Authorization: `Bearer ${locals.access}`
			}
		});
		avatarPath = serverURL + avatar.data;
	} catch (error) {
		console.log('Avatar non presente.');
	}

	try {
		const response = await axios.get(serverURL + '/api/user/me/info_base/', {
			headers: {
				Authorization: `Bearer ${locals.access}`
			}
		});
		basicInfo = response.data;
	} catch (error) {
		console.log('Info base non presenti.');
	}

	try {
		const response = await axios.get(serverURL + '/api/user/me/posizioni/', {
			headers: {
				Authorization: `Bearer ${locals.access}`
			}
		});

		const tmp = response.data;

		try {
			positions.push(tmp.preferita);
			positions.push(tmp.alternativa);
			positions.push(tmp.alternativa2);
		} catch (error) {
			console.log('Non tutte le posizioni sono specificate.');
		}
	} catch (error) {
		console.log('Posizioni non presenti.');
	}

	try {
		const response = await axios.get(serverURL + '/api/user/me/caratteristiche/', {
			headers: {
				Authorization: `Bearer ${locals.access}`
			}
		});

		const tmp = response.data;

		try {
			characteristics.push(tmp.principale);
			characteristics.push(tmp.secondaria);
			characteristics.push(tmp.terziaria);
		} catch (error) {
			console.log('Non tutte le caratteristiche sono specificate.');
		}
	} catch (error) {
		console.log('Caratteristiche non presenti.');
	}

	try {
		const response = await axios.get(serverURL + '/api/user/me/info_avanzate/', {
			headers: {
				Authorization: `Bearer ${locals.access}`
			}
		});

		advancedInfo = response.data;
	} catch (err) {
		console.log('Non ci sono info avanzate per questo utente.');
	}

	return {
		avatar: avatarPath,
		positions: positions,
		basicInfo: basicInfo,
		characteristics: characteristics,
		advancedInfo: advancedInfo
	};
}

export const actions = {
	uploadAvatar: async function ({ request, locals }) {
		const data = await request.formData();

		const fileSize = data.get('fileSize');
		const avatarFile = data.get('file');

		const { size, type } = avatarFile;

		if (!type.match(/image\/*/)) {
			return fail(400, { avatarError: "Il file non è un'immagine" });
		} else if (size / 1000 > fileSize) {
			return fail(400, { avatarError: 'Il file è troppo grande.' });
		}

		try {
			await axios.put(serverURL + '/api/user/me/avatar/', data, {
				headers: {
					Authorization: `Bearer ${locals.access}`
				},
				maxBodyLength: Infinity,
				maxContentLength: Infinity
			});
			return { avatarSuccess: true };
		} catch (error) {
			console.log("Errore nel caricamento dell'avatar.");
			return { avatarError: 'Errore inaspettato.' };
		}
	},
	uploadPositions: async function ({ request, locals }) {
		const data = await request.formData();

		const tmp: string[] = data.get('positions').split(',');

		if (tmp.length < 1) {
			return { positionError: 'Seleziona almeno 1 posizione.' };
		}
		if (tmp.length > 3) {
			return { positionError: 'Puoi selezionare max. 3 posizioni.' };
		}

		const positions = {
			preferita: tmp[0]
		};

		if (tmp[1]) {
			positions.alternativa = tmp[1];
		}
		if (tmp[2]) {
			positions.alternativa2 = tmp[2];
		}

		try {
			await axios.put(serverURL + '/api/user/me/posizioni/', positions, {
				headers: {
					Authorization: `Bearer ${locals.access}`
				}
			});
			return { positionSuccess: true };
		} catch (error) {
			return { positionError: error.message };
		}
	},
	uploadCharacteristics: async function ({ request, locals }) {
		const data = await request.formData();

		console.log('characteristics', data.get('characteristics'));

		let tmp: string[] = data.get('characteristics').split(',');

		// rimozione delle stringhe vuote
		tmp = tmp.filter((value, index, arr) => {
			return value;
		});

		if (tmp.length < 1) {
			return { characteristicError: 'Seleziona almeno 1 caratteristica.' };
		}
		if (tmp.length > 3) {
			return { characteristicError: 'Puoi selezionare max. 3 caratteristiche.' };
		}

		const characteristics = {
			principale: tmp[0]
		};

		if (tmp[1]) {
			characteristics.secondaria = tmp[1];
		}
		if (tmp[2]) {
			characteristics.terziaria = tmp[2];
		}

		try {
			await axios.put(serverURL + '/api/user/me/caratteristiche/', characteristics, {
				headers: {
					Authorization: `Bearer ${locals.access}`
				}
			});
			return { characteristicSuccess: true };
		} catch (error) {
			return { characteristicError: error.message };
		}
	},
	changePassword: async function ({ request, locals }) {
		const data = await request.formData();

		const password = data.get('password');
		const confirmPassword = data.get('confirmPassword');

		console.log(password, confirmPassword);

		if (password !== confirmPassword) {
			return { changePasswordError: 'Le due password non sono uguali.' };
		}

		try {
			await axios.post(
				serverURL + '/api/user/change_password/',
				{ password: password },
				{
					headers: {
						Authorization: `Bearer ${locals.access}`
					}
				}
			);
			return { changePasswordSuccess: true };
		} catch (error) {
			if (error.response && error.response.status == 409) {
				return { changePasswordError: 'La password è uguale alla precedente' };
			} else {
				console.log(error.message);
			}
		}
	},

	changeBasicInfo: async function ({ request, locals }) {
		const data = await request.formData();

		try {
			await axios.put(
				serverURL + '/api/user/me/info_base/',
				{
					first_name: data.get('firstName'),
					last_name: data.get('lastName'),
					email: data.get('email')
				},
				{
					headers: {
						Authorization: `Bearer ${locals.access}`
					}
				}
			);
			return { changeBasicInfoSuccess: true };
		} catch (error) {
			console.log(error);
			return { changeBasicInfoError: 'Impossibile cambiare le info base.' };
		}
	},

	changeAdvancedInfo: async function ({ request, locals }) {
		try {
			const data = await request.formData();
			const peso = parseFloat(data.get('peso'));
			const altezza = parseInt(data.get('altezza'));
			const dataNascita = data.get('dataNascita');
			const numeroTelefono = data.get('numeroTelefono');
			const nazionalità = data.get('nazionalità').toUpperCase();
			const bio = data.get('bio');

			const payload = {
				peso: peso,
				altezza: altezza,
				data_nascita: dataNascita,
				bio: bio,
				nazionalità: nazionalità,
				numero_telefono: numeroTelefono
			};

			await axios.put(serverURL + '/api/user/me/info_avanzate/', payload, {
				headers: {
					Authorization: `Bearer ${locals.access}`
				}
			});
			return { changeAdvancedInfoSuccess: true };
		} catch (err) {
			console.log(err.message);
			return { changeAdvancedInfoError: 'Errore nella modifica delle informazioni.' };
		}
	}
};
