import * as jose from 'jose';

export function handle({event, resolve}) {
    const jwt = event.cookies.get('jwt');

    event.locals.user = jwt ? jose.decodeJwt(jwt) : null;

    return resolve(event);
}