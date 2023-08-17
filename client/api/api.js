import axios from 'axios'

export const api = axios.create({
    baseURL: `${process.env.API_URL}`,
    headers: {
        secretKey: process.env.API_SECRET_KEY
    }
})
