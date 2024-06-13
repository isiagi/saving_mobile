import BASEAPI from "../utils/api/authBase";

async function editMultiData(path, data) {
  return await BASEAPI.patch(`${path}`, data);
}

export default editMultiData;
