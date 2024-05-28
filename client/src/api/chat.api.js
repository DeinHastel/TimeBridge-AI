import axios from 'axios'

const ChatsApi = axios.create({
    baseURL: 'http://localhost:8000/chats/pagina/v1/chats/'
})

export const getChats = () => ChatsApi.get('/')
export const Insertarchats = (chats) =>  ChatsApi.post('/', chats)