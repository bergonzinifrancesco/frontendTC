import {redirect} from '@sveltejs/kit';

export function load({cookies, url, locals}) {
    if(!locals.access) {
        throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }
}