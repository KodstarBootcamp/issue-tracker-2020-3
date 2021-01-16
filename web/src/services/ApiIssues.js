import axios from 'axios'
const baseUrl = '/issue'
let token = null

const setToken = newToken  => {
  token = `bearer ${newToken}`
}

const getAll = async ({ start,count,sort }) => {
  if(start===undefined||count===undefined){
    const getbaseUrl=`/issue/all?start=${0}&count=${10}&count=${'title'}`
    const response = await axios.get(getbaseUrl)
    return response.data
  }
  const getbaseUrl=`/issue/all?start=${start}&count=${count}&sort=${sort}`
  const response = await axios.get(getbaseUrl)
  return response.data
}

const getSearch = async ({ searchValue }) => {
  const baseUrl = '/issue/all?title='
  const response = await axios.get(baseUrl+searchValue)
  return response.data
}

const getAllIssueLength = async () => {
  const getbaseUrlLength ='/issue/count'
  const response = await axios.get(getbaseUrlLength)
  return response.data
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response =  await axios.post(baseUrl, newObject,config)
  return  response.data
}
const update = async updatedObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject,config)
  return response.data
}
const deleteOneIssue =  id  => {
  const config = {
    headers: { Authorization: token },
  }
  return  axios.delete(`${baseUrl}/${id}`,config)
}
export default { getAll, getSearch, create,update, deleteOneIssue,getAllIssueLength,setToken }
