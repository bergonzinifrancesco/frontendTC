import { fail } from '@sveltejs/kit';
import axios from 'axios';
import { serverURL } from '$lib/server/api';
import * as jose from 'jose';

export async function handle({event, resolve}) {

    const username = event.cookies.get('username');
    const access = event.cookies.get('access');
    const refresh = event.cookies.get('refresh');

    console.log("Sono nell'hook.");

    try {
        const payload = jose.decodeJwt(access);
        if(payload.exp*1000 <= Date.now())
            throw new Error('token scaduto.');
        event.locals.access = access;
        event.locals.refresh = refresh;
        event.locals.username = username;
        console.log("Token validi.");
    }
    catch(error) {
        console.log("refresh del token da hook...");
        if(refresh) {
            await axios.post(serverURL + '/api/token/refresh',refresh)
            .then(function (response) {
                event.cookies.set('access', response.data.access, {path: '/'});
                event.cookies.set('refresh', response.data.refresh, {path: '/'});
                event.locals.access = response.data.access;
                event.locals.refresh = response.data.refresh;
                console.log("refresh ok, si aggiornano i token.");
            })
            .catch(() => {
                event.cookies.delete('access', {path: '/'});
                event.cookies.delete('refresh', {path: '/'});
                event.cookies.delete('username', {path: '/'});
                event.locals.access = null;
                event.locals.refresh = null;
                event.locals.username = null;
                console.log("refresh fallito, si cancellano i cookie.");
            });
        }
        else {
            console.log("Il token di refresh non esiste.");
        }
    }

    const structures = event.cookies.get('structures');
        
    event.locals.structures = structures ? JSON.parse(structures) : null;

    const response = await resolve(event);
    return response;
}