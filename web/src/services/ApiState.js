import axios from 'axios'

const getAllState = async () => {
  const response = await axios.get('/state/all')
  return response.data

}

export default { getAllState }
