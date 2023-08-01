import axios from 'axios';
import { serverURL } from '$lib/server/api';
import { redirect } from '@sveltejs/kit';

export async function load({locals, cookies}) {
    try {
        const response = await axios.get(
            serverURL + '/api/structure/get_structures/',
                {
                    headers: {
                        Authorization: `Bearer ${locals.access}`
                    }
                }
        );
        cookies.set('structures', JSON.stringify(response.data), {path: '/'});
    }
    catch(error) {
        throw redirect(307, '/');
    }
}