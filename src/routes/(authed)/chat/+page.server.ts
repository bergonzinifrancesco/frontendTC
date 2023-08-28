import { serverURL } from '$lib/server/api.js';
import axios from 'axios';

export const ssr = false; // necessario per il websocket

export interface Message {
	room: number;
	username: string;
	message: string;
	time: Date;
}

export async function load({ locals }) {
	const rooms = (await axios.get(serverURL + '/api/chat/rooms/')).data;
	return { username: locals.username, rooms: rooms };
}

export const actions = {
	getMessages: async function ({ request }) {
		const data = await request.formData();
		const room = parseInt(data.get('room'));

		let messages = null;

		try {
			messages = (await axios.get(serverURL + `/api/chat/chatMessages/?room_id=${room}`)).data;
			for (const message of messages) {
				message.time = new Date(message.time);
			}

			console.log(messages);
		} catch (err) {
			console.log(err);
		}

		return { room: room, messages: messages };
	}
};
