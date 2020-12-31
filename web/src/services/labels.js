import axios from 'axios'
const baseUrl = '/label/all'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const deleteOneLabel =  id => {
  return  axios.delete(`${baseUrl}/${id}`)
}
const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return  response.data
}
const update = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}


export default { getAll, create, update, deleteOneLabel }
