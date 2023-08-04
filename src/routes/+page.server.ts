import axios from 'axios';
import { serverURL, loadStructures } from '$lib/server/api';
import { error } from '@sveltejs/kit';


export async function load() {
  try {
    return await loadStructures();
  }
  catch(err) {
    console.log(err.message);
    throw error(404, {message: err.message});
  }
}