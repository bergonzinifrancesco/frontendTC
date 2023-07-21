import { json } from '@sveltejs/kit';

export async function DELETE({cookies, locals}) {

    cookies.delete('username', {path: '/'});
    cookies.delete('access', {path: '/'});
    cookies.delete('refresh', {path: '/'});

    locals.username = null;
    locals.access = null;
    locals.refresh = null;

    return json(false);
};