import axios from 'axios';
import { serverURL } from '$lib/server/api';

export async function load({cookies, locals}) {
    const accessToken = cookies.get('access');

    const isLogged = accessToken ?? false;
    let avatarPath;
    let isSuperUser = false;

    if(isLogged) {
        try {
            const response = await axios.get(serverURL + '/api/user/me/avatar/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            avatarPath = serverURL + response.data;
        }
        catch(e) {
            console.log("Errore nel caricamento dell'avatar.");
        }

        try {
            await axios.get(serverURL + '/api/user/am_superuser/',
            {
                headers: {
                    Authorization: `Bearer ${locals.access}`
                }
            });

            isSuperUser = true;
        }
        catch(error) {
            console.log("L'utente non è superuser.");
        }
    }


    return {
        isLogged: isLogged,
        avatarPath: avatarPath,
        isSuperUser: isSuperUser
    };
}