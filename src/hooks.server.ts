import { redirect } from '@sveltejs/kit';
import { serverURL } from '$lib/api.ts';
import axios from 'axios';
import * as jose from 'jose';

export async function handle({event, resolve}) {

    const username = event.cookies.get('username');
    const access = event.cookies.get('access');
    const refresh = event.cookies.get('refresh');

    try {
        if(access) {
            jose.decodeJwt(access);
            event.locals.access = access;
            event.locals.refresh = refresh;
            event.locals.username = username;
        }
    }
    catch(error) {
        console.log("refresh del token da hook...");
        axios.post(serverURL + '/token/refresh',{refresh: refresh})
        .then( function (response) {
            event.locals.access = response.data.access;
            event.locals.refresh = response.data.refresh;
        })
        .catch( function () {
            event.locals.access = null;
            event.locals.refresh = null;
            event.locals.username = null;
        });
    }

    const response = await resolve(event);
    return response;
}