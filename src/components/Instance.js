import axios from 'axios'

const Instance = axios.create({
    baseURL: "https://66ab8609636a4840d7cb0b22.mockapi.io/comments",
})

export default Instance