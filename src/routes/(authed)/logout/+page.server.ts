import { redirect } from '@sveltejs/kit';

export const actions = {
    logout: function ({cookies, locals}) {

        cookies.delete('username', {path: '/'});
        cookies.delete('access', {path: '/'});
        cookies.delete('refresh', {path: '/'});

        locals.username = null;
        locals.access = null;
        locals.refresh = null;

        throw redirect(307, '/');
    }
}