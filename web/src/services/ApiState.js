import axios from 'axios'

const getAllState = async () => {
  const response = await axios.get('/state/all')
  console.log()
  return response.data

}

export default { getAllState }