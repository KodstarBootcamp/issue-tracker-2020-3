import axios from 'axios'
const baseUrl = '/issue'
let token = null

const setToken = newToken  => {
  token = `bearer ${newToken}`
  console.log('Token',token)
}

const getAll = async ({ start,count }) => {
  if(start===undefined||count===undefined){
    const getbaseUrl=`/issue/all?start=${0}&count=${10}`
    const response = await axios.get(getbaseUrl)

    return response.data
  }
  const getbaseUrl=`/issue/all?start=${start}&count=${count}`
  const response = await axios.get(getbaseUrl)

  return response.data
}

const getAllIssueLength = async () => {
  const getbaseUrlLength ='/issue/all'
  const response = await axios.get(getbaseUrlLength)
  return response.data
}
const create = async newObject => {
  const response =  await axios.post(baseUrl, newObject)
  return  response.data
}
const update = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}
const deleteOneIssue =  id  => {
  return  axios.delete(`${baseUrl}/${id}`)
}
export default { getAll, create,update, deleteOneIssue,getAllIssueLength,setToken }
