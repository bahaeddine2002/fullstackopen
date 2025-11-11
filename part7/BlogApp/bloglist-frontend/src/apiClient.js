// src/apiClient.js
import axios from 'axios'

// This configures axios to send cookies with every request from the frontend
axios.defaults.withCredentials = true

export default axios
