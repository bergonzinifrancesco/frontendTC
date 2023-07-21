export function load({locals}) {
    return {isLogged: locals.access ?? false};
}