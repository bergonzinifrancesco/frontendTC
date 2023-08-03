import axios from 'axios';
import { serverURL } from '$lib/server/api';
import { error } from '@sveltejs/kit';


export async function load() {
  try {
    const response = await axios.get(serverURL + '/api/structure/list_structures/');    
    const structures_ids = response.data;

    const structures = [];

    for(const structure_id of structures_ids) {
      const response = await axios.get(serverURL + `/api/structure/${structure_id}/info/`);
      
      console.log(structure_id, response.data);

      structures.push({id: structure_id, structure: response.data});      
    }

    return {structures: structures};
  }
  catch(err) {
    console.log(err.message);
    throw error(404, {message: err.message});
  }
}