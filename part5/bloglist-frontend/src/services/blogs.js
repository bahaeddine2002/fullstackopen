import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newobj) => {
  const config = {
    headers : { Authorization: token },
  }

  const response = await axios.post(baseUrl, newobj, config )
  return response.data
}

const update = async (newObj,id) => {
  const response = await axios.put(`${baseUrl}/${id}`,newObj)
  return response.data
}

const del =  async (id) => {
   const config = {
    headers : { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`,config)
}

export default { 
  getAll, 
  create, 
  setToken, 
  update,
  del }