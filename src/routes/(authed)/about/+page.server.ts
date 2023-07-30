import axios from 'axios';
import { serverURL } from '$lib/server/api';
import { fail } from '@sveltejs/kit';

export async function load({locals}) {
    let avatarPath = null;
    let positions = null;

    try {
        const avatar = await axios.get(serverURL  + '/api/user/me/avatar/',{
            headers: {
                Authorization: `Bearer ${locals.access}`
            }
        });
        avatarPath = serverURL + avatar.data;
    }
    catch(error) {
        console.log("Avatar non presente.");
    }

    try {
        const response = await axios.get(serverURL + '/api/user/me/posizioni/', {
            headers: {
                Authorization: `Bearer ${locals.access}`
            }
        });

        let tmp = response.data;

        positions = [
            tmp.preferita,
        ];

        try {
            positions.push(tmp.alternativa);
            positions.push(tmp.alternativa2);
        }
        catch(error) {
            console.log("Non tutte le posizioni sono specificate.");
        }
    }
    catch(error) {
        console.log("Posizioni non presenti.");
    }

    return {
        avatar: avatarPath,
        positions: positions
    };
}

export const actions = {
    uploadAvatar: async function({request, locals}) {
        const data = await request.formData();

        const fileSize = data.get('fileSize');
        const avatarFile = data.get('file');

        const {size, type} = avatarFile;

        if(!type.match(/image\/*/)) {
            return fail(400, {avatarError: "Il file non è un'immagine"});
        }
        else if((size/1000) > fileSize) {
            return fail(400, {avatarError: "Il file è troppo grande."});
        }
        
        try {
            await axios.put(
                serverURL + "/api/user/me/avatar/",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${locals.access}`
                    },
                    maxBodyLength: Infinity,
                    maxContentLength: Infinity
                }
            );
            return {avatarSuccess:true};
        }
        catch(error) {
            console.log("Errore nel caricamento dell'avatar.");
            return {avatarError: "Errore inaspettato."};
        }
    },
    uploadPositions: async function({request, locals}) {

        const data = await request.formData();
        console.log("data", data);

        const tmp : string[] = data.get('positions').split(',');

        if(tmp.length > 3) {
            return {positionError: "Non puoi selezionare più di 3 posizioni."}
        }

        const positions : Object = {
            preferita : tmp[0],
        };
    
        positions.alternativa = tmp[1] ? tmp[1] : "QLS";
        positions.alternativa2 = tmp[2] ? tmp[2] : "QLS";

        console.log("positions", positions);

        try {
            await axios.put(
                serverURL + "/api/user/me/posizioni/",
                positions,
                {
                    headers: {
                        Authorization: `Bearer ${locals.access}`
                    }
                }
            );
            return {positionSuccess: true};
        }
        catch(error) {
            return {positionError: error.message};
        }
    }
}