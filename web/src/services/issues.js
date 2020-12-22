import axios from 'axios'
const baseUrl = '/issue'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
    console.log("services newOBject",newObject)
  const response =  await axios.post(baseUrl, newObject)

  return  response.data;
}



export default {getAll, create}