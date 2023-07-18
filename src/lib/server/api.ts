import axios, { type AxiosResponse } from "axios";

const serverURL = 'http://localhost:8000/api';

export const customAxios = axios.create({
    baseURL: serverURL
});

export async function customPost(url : string, data : object, token : string) : Promise<AxiosResponse> {
    return customAxios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}