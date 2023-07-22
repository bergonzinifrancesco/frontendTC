import {redirect} from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import axios from 'axios';
import { serverURL } from '$lib/server/api';

export function load({url, locals}) {
    if(locals.username && locals.access) {
        throw redirect(307, url.searchParams.get('redirectTo') ?? '/');
    }
}

export const actions = {
    signup: async function ({cookies, url, request, locals}) {
        
        const data = await request.formData();

        const formData = Object.create(null);
        for(const datum of data) {
            formData[datum[0]] = datum[1];
        }

        try {
            const response = await axios.post(serverURL + "/auth/register", 
            formData, locals.access);

            const {access, refresh} = response.data;

            cookies.set('username', formData.username, {path: '/'});
            cookies.set('access', access, {path: '/'});
            cookies.set('refresh', refresh, {path: '/'});
        }
        catch (error : AxiosError) {
            if(error.response) {
                console.log(error.response.data);
                return fail(error.response.status, error.response.data);
            }
            else if(error.request) {
                return fail(500, {message: error.message});
            }
            else {
                return fail(400, {message: error.message});
            }
        }
        throw redirect(307, url.searchParams.get('redirectTo') ?? '/');
    }
}