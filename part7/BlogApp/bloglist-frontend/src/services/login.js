import axios from '../apiClient'
const baseUrl = '/api/login'

const login = async (user) => {
  const token = await axios.post(baseUrl, user)
  return token.data
}

const logout = async () => {
  await axios.post(`${baseUrl}/logout`)
}

export default { login, logout }
