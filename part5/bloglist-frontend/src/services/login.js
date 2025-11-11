import axios from 'axios'
const baseUrl = '/api/login'

const login = async (user) =>{
  const token = await axios.post(baseUrl, user)
  return token.data
}

export default {login}