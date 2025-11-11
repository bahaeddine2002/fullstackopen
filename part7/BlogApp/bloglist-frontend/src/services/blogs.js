import axios from '../apiClient'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const createComment = async (newObject, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  return response.data
}

const update = async (newObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const del = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

const like = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}/like`)
  return response.data
}
const getTrending = async (page = 1) => {
  const response = await axios.get(`${baseUrl}/trending?page=${page}`)
  return response.data
}

export default {
  getAll,
  create,
  update,
  del,
  createComment,
  like,
  getTrending,
  getById,
}
