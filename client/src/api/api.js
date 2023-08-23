import axios from 'axios'

export const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        secret_key: process.env.REACT_APP_API_SECRET_KEY
    }
})
