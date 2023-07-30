import axios from 'axios';
import { serverURL } from '$lib/server/api';

export async function load({cookies}) {
    const accessToken = cookies.get('access');

    const isLogged = accessToken ?? false;
    let avatarPath;

    if(isLogged) {
        try {
            const response = await axios.get(serverURL + '/api/user/me/avatar', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            avatarPath = serverURL + response.data;
        }
        catch(e) {
            console.log("Errore nel caricamento dell'avatar.");
        }
    }
    return {
        isLogged: isLogged,
        avatarPath: avatarPath
    };
}