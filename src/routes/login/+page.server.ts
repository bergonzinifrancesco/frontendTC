import {redirect} from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { customPost } from '$lib/server/api';
import type { AxiosError } from 'axios';

export function load({cookies, url, locals}) {
    if(locals.username && locals.access) {
        throw redirect(307, url.searchParams.get('redirectTo') ?? '/');
    }
}

export const actions = {
    login: async function ({cookies, url, request, locals}) {
        
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');
        
        try {
            const response = await customPost("/token/pair", 
            {
                username: username,
                password: password
            }, locals.access);

            const {access, refresh} = response.data;

            cookies.set('username', response.data.username, {path: '/'});
            cookies.set('access', access, {path: '/'});
            cookies.set('refresh', refresh, {path: '/'});
        }
        catch (error : AxiosError) {
            if(error.response) {
                return fail(error.response.status, {incorrect: true});
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