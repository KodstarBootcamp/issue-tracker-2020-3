import axios from 'axios'
const baseUrl = '/users'

const singUp = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { singUp }