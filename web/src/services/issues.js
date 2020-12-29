import axios from 'axios'
const baseUrl = '/issue'
const getAll = async () => {
  const getbaseUrl='/issue/all'
  const response = await axios.get(getbaseUrl)
  return response.data
}
const create = async newObject => {
  const response =  await axios.post(baseUrl, newObject)
  return  response.data
}
const update = async updatedObject => {
  console.log('Services update',updatedObject)
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}
const deleteOneIssue =  id  => {
  return  axios.delete(`${baseUrl}/${id}`)
}
export default { getAll, create,update, deleteOneIssue }
