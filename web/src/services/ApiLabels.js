import axios from 'axios'
const baseUrl = '/label'
let token = null

const setToken = newToken  => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const baseUrl = '/label/all'
  const response = await axios.get(baseUrl)
  return response.data
}

const deleteOneLabel =  id => {
  const config = {
    headers: { Authorization: token },
  }
  return  axios.delete(`${baseUrl}/${id}`,config)
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject,config)
  return  response.data
}
const update = async updatedObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject,config)
  return response.data
}

export default { getAll, create, update, deleteOneLabel,setToken }
