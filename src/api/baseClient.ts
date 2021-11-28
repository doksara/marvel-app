import axios from 'axios'

const HTTP = axios.create({
  baseURL: import.meta.env.VITE_MARVEL_API_BASE_URL,
  params: {
    apikey: import.meta.env.VITE_MARVEL_API_KEY
  }
})

export default HTTP
