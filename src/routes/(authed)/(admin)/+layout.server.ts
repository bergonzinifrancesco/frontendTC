import axios from 'axios';
import { serverURL } from '$lib/server/api';
import { redirect } from '@sveltejs/kit';

export async function load({locals}) {
    try {
        await axios.get(serverURL + '/api/user/am_superuser/',
        {
            headers: {
                Authorization: `Bearer ${locals.access}`
            }
        })
    }
    catch(error) {
        throw redirect(307, '/');
    }
}