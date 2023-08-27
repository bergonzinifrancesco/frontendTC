export const ssr = false; // necessario per il websocket

export function load({ locals }) {
	return { username: locals.username };
}

export const actions = {
	getMessages: async function ({ request, locals }) {
		return;
	}
};
