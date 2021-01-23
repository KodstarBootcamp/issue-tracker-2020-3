import axios from 'axios'


let token = null

const setToken = newToken  => {
  token = `bearer ${newToken}`
}

const getAllState = async () => {
  const response = await axios.get('/state/all')
  return response.data
}

const deleteOneState =  id => {
  const config = {
    headers: { Authorization:  token },
  }
  const baseUrlState= '/state'
  return  axios.delete(`${baseUrlState}/${id}`,config)
}
const createState = async newObject => {
  const config = {
    headers: { Authorization:token },
  }
  const baseUrlState= '/state'
  const response =  await axios.post(baseUrlState, newObject,config)
  return  response.data
}
const update = async updatedObject => {
  const config = {
    headers: { Authorization:  token },
  }
  const baseUrlState= '/state'
  const response = await axios.put(`${baseUrlState}/${updatedObject.id}`, updatedObject,config)
  return response.data
}
export default { setToken,getAllState,createState,deleteOneState,update }
