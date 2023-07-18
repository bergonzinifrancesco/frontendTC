import { error } from '@sveltejs/kit';
import axios from 'axios';

const serverURL = 'http://localhost:8000/api';

export const customAxios = axios.create({
	baseURL: serverURL
});