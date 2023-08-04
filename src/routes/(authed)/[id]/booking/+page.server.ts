import { getStructureInfo } from '$lib/server/api.js';

export async function load({params}) {

  let structureInfo = null;
  try {
    structureInfo = await getStructureInfo(Number(params.id));
  }
  catch(err) {
    console.log(err);
  }
  return {id: params.id, structure: structureInfo};
}